#!/usr/bin/env python
"""
Minimal script to fine-tune distilgpt2 on a plain text training file where examples are formatted
as conversational pairs (User: ... \n Assistant: ...). This uses Hugging Face Transformers + Datasets.

Usage (example):
python fine_tune_gpt2.py --train_file train_data_gpt2.txt --output_dir ./distil_gpt2_finetuned --epochs 3 --per_device_train_batch_size 4

Notes:
- Requires a GPU for reasonable speed.
- Install dependencies from requirements.txt.
"""
import argparse
import os
import inspect
from typing import List


def parse_args():
    parser = argparse.ArgumentParser(description="Fine-tune distilgpt2 on a conversational text file")
    parser.add_argument("--train_file", type=str, required=True, help="Path to the plain-text training file")
    parser.add_argument("--output_dir", type=str, default="./distilgpt2-finetuned", help="Where to save the fine-tuned model")
    parser.add_argument("--model_name", type=str, default="distilgpt2", help="Base model to fine-tune")
    parser.add_argument("--epochs", type=int, default=3)
    parser.add_argument("--per_device_train_batch_size", type=int, default=4)
    parser.add_argument("--learning_rate", type=float, default=5e-5)
    parser.add_argument("--block_size", type=int, default=256, help="Max token length (truncation)")
    parser.add_argument("--seed", type=int, default=42)
    # Monitoring & evaluation controls
    parser.add_argument("--eval_ratio", type=float, default=0.05, help="Portion of data used for validation (0-1)")
    parser.add_argument("--logging_steps", type=int, default=50, help="Log training progress every N steps")
    parser.add_argument("--eval_steps", type=int, default=50, help="Run evaluation every N steps")
    parser.add_argument("--save_steps", type=int, default=500, help="Save checkpoints every N steps")
    # Sample generations during training
    parser.add_argument("--print_generations_every", type=int, default=200, help="Generate and print samples every N steps")
    parser.add_argument("--num_sample_prompts", type=int, default=3, help="Number of prompts to sample from the training file for generation")
    parser.add_argument("--max_new_tokens", type=int, default=60, help="Max new tokens to generate for sample outputs")
    # Resuming support
    parser.add_argument(
        "--resume_from_checkpoint",
        type=str,
        default=None,
        help=(
            "Path to a checkpoint directory to resume from. If not provided, the script will auto-detect the latest "
            "checkpoint under output_dir. If no checkpoint is found but a final model exists in output_dir, it will resume "
            "from those weights (without optimizer/scheduler state)."
        ),
    )
    # Colab / GPU-friendly knobs
    parser.add_argument("--fp16", action="store_true", help="Use fp16 mixed precision training when CUDA is available")
    parser.add_argument("--bf16", action="store_true", help="Use bf16 mixed precision (Ampere+ GPUs)")
    parser.add_argument("--gradient_accumulation_steps", type=int, default=1, help="Accumulate gradients over N steps")
    parser.add_argument("--dataloader_num_workers", type=int, default=2, help="PyTorch DataLoader workers")
    return parser.parse_args()


def main():
    args = parse_args()

    # Import heavy ML libraries inside main so static analysis doesn't flag unresolved references
    try:
        from datasets import load_dataset
        from transformers import (
            AutoTokenizer,
            AutoModelForCausalLM,
            DataCollatorForLanguageModeling,
            Trainer,
            TrainingArguments,
            TrainerCallback,
        )
        from transformers.trainer_utils import get_last_checkpoint
        import numpy as np
        import torch
        import transformers as hf
    except ImportError as e:
        print("Missing dependency:", e)
        print("Please run: pip install -r requirements.txt")
        raise

    # Device / GPU info (useful on Colab)
    if torch.cuda.is_available():
        try:
            num = torch.cuda.device_count()
            names = ", ".join(torch.cuda.get_device_name(i) for i in range(num))
            print(f"CUDA is available. GPU(s): {names}")
        except Exception:
            print("CUDA is available.")
        try:
            import platform
            print("Torch:", torch.__version__, " | Transformers:", getattr(hf, "__version__", "unknown"), " | Python:", platform.python_version())
        except Exception:
            pass
    else:
        print("CUDA not available. Training will run on CPU.")

    print(f"Loading dataset from {args.train_file}...")
    dataset = load_dataset("text", data_files={"train": args.train_file})
    # Create a small validation split for monitoring
    dataset = dataset["train"].train_test_split(test_size=args.eval_ratio, seed=args.seed)  # keys: 'train', 'test'

    # Determine resume checkpoint if any
    resume_ckpt = args.resume_from_checkpoint
    auto_last_ckpt = None
    try:
        auto_last_ckpt = get_last_checkpoint(args.output_dir) if os.path.isdir(args.output_dir) else None
    except Exception as e:
        print(f"Note: could not check for last checkpoint in {args.output_dir}: {e}")
    if resume_ckpt is None and auto_last_ckpt is not None:
        resume_ckpt = auto_last_ckpt
        print(f"Auto-detected latest checkpoint: {resume_ckpt}")
    if resume_ckpt is None and os.path.isdir(args.output_dir):
        # Fallback to final saved model weights in output_dir (no optimizer state)
        has_final_model = any(
            os.path.exists(os.path.join(args.output_dir, fname))
            for fname in ("pytorch_model.bin", "model.safetensors")
        )
        if has_final_model:
            resume_ckpt = args.output_dir
            print(
                f"No checkpoints found, but found final model in {args.output_dir}. "
                "Will load these weights and start a fresh optimizer/scheduler."
            )

    # Prefer loading tokenizer/model from resume checkpoint if present to keep config in sync
    load_source = resume_ckpt if resume_ckpt else args.model_name

    print(f"Loading tokenizer and model ({load_source})...")
    tokenizer = AutoTokenizer.from_pretrained(load_source)
    # distilgpt2 tokenizer may not have pad token; set it to eos_token for batching
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    model = AutoModelForCausalLM.from_pretrained(load_source)
    # ensure model uses the tokenizer pad token id for generation
    if getattr(model.config, "pad_token_id", None) is None and tokenizer.pad_token_id is not None:
        model.config.pad_token_id = tokenizer.pad_token_id

    # Optionally enable cudnn autotune for speed
    try:
        if torch.cuda.is_available():
            torch.backends.cudnn.benchmark = True
    except Exception:
        pass

    def tokenize_function(examples):
        # 'text' field is provided by the text dataset loader
        return tokenizer(examples["text"], truncation=True, max_length=args.block_size)

    print("Tokenizing dataset...")
    tokenized = dataset.map(tokenize_function, batched=True, remove_columns=["text"])  # keep 'input_ids' etc.

    # Filter out empty sequences that would cause reshape errors
    def filter_empty_sequences(example):
        return len(example["input_ids"]) > 0

    print("Filtering out empty sequences...")
    tokenized = tokenized.filter(filter_empty_sequences)

    # For causal LM we don't use masking; DataCollatorForLanguageModeling with mlm=False will provide labels=input_ids
    data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)

    # Sample prompts for on-the-fly generations
    def _read_sample_prompts(path: str, num_prompts: int) -> List[str]:
        prompts: List[str] = []
        try:
            with open(path, "r", encoding="utf-8") as f:
                for line in f:
                    s = line.strip()
                    if not s:
                        continue
                    # Prefer lines that look like a user prompt
                    if s.lower().startswith("user:"):
                        prompts.append(s)
                    else:
                        prompts.append(s)
                    if len(prompts) >= num_prompts:
                        break
        except Exception as e:
            print(f"Warning: could not read sample prompts from {path}: {e}")
        if not prompts:
            prompts = ["User: Hello\nAssistant:"]
        return prompts

    sample_prompts = _read_sample_prompts(args.train_file, args.num_sample_prompts)
    print("Sample prompts for monitoring:")
    for i, p in enumerate(sample_prompts, 1):
        print(f"  [{i}] {p[:120]}{'...' if len(p) > 120 else ''}")

    # Metrics: token-level accuracy (ignoring -100 labels)
    def compute_metrics(eval_pred):
        preds, labels = eval_pred
        if isinstance(preds, tuple):
            preds = preds[0]
        # Convert arrays to lists to avoid external deps
        try:
            preds_list = preds.tolist()
        except Exception:
            preds_list = preds
        try:
            labels_list = labels.tolist()
        except Exception:
            labels_list = labels
        correct = 0
        total = 0
        for batch_pred, batch_label in zip(preds_list, labels_list):
            for token_logits, label_id in zip(batch_pred, batch_label):
                if label_id == -100:
                    continue
                # argmax over vocab dimension
                max_idx = max(range(len(token_logits)), key=lambda i: token_logits[i])
                if max_idx == label_id:
                    correct += 1
                total += 1
        acc = (correct / total) if total > 0 else 0.0
        return {"accuracy": acc}

    # Callback to print sample generations during training
    class SampleGenerationCallback(TrainerCallback):
        def __init__(self, tokenizer, prompts: List[str], print_every: int = 200, max_new_tokens: int = 60, gen_kwargs=None):
            self.tokenizer = tokenizer
            self.prompts = prompts
            self.print_every = max(1, int(print_every))
            self.max_new_tokens = max_new_tokens
            self.gen_kwargs = gen_kwargs or {}
            self.model = None  # will be set after trainer is initialized

        def on_log(self, args, state, control, **kwargs):
            if state.global_step == 0:
                return
            if state.global_step % self.print_every != 0:
                return
            model = kwargs.get("model", self.model)
            if model is None:
                return
            print("\n=== Sample generations @ step", state.global_step, "===")
            for i, prompt in enumerate(self.prompts, 1):
                inputs = self.tokenizer(prompt, return_tensors="pt")
                input_ids = inputs["input_ids"].to(model.device)
                with torch.no_grad():
                    output_ids = model.generate(
                        input_ids,
                        pad_token_id=self.tokenizer.eos_token_id,
                        do_sample=True,
                        top_p=0.9,
                        temperature=0.9,
                        max_new_tokens=self.max_new_tokens,
                        **self.gen_kwargs,
                    )
                text = self.tokenizer.decode(output_ids[0], skip_special_tokens=True)
                # Only show the continuation part if possible
                print(f"[Prompt {i}] {text}")
            print("=== End samples ===\n")

    # Determine precision flags safely for current device
    use_fp16 = bool(args.fp16 and torch.cuda.is_available())
    # bf16 generally requires compute capability >= 8.0 (Ampere+)
    try:
        cc_major = torch.cuda.get_device_capability(0)[0] if torch.cuda.is_available() else 0
    except Exception:
        cc_major = 0
    use_bf16 = bool(args.bf16 and torch.cuda.is_available() and cc_major >= 8)

    # Build TrainingArguments with compatibility across transformers versions
    def build_training_args(**kwargs):
        sig = inspect.signature(TrainingArguments.__init__)
        accepted = set(sig.parameters.keys()) - {"self"}
        filtered = {k: v for k, v in kwargs.items() if k in accepted}
        # Backward-compat for evaluation_strategy -> eval_strategy
        if (
            "evaluation_strategy" in kwargs
            and "evaluation_strategy" not in accepted
            and "eval_strategy" in accepted
        ):
            filtered["eval_strategy"] = kwargs["evaluation_strategy"]
        return TrainingArguments(**filtered)

    training_args = build_training_args(
        output_dir=args.output_dir,
        overwrite_output_dir=True,
        num_train_epochs=args.epochs,
        per_device_train_batch_size=args.per_device_train_batch_size,
        per_device_eval_batch_size=args.per_device_train_batch_size,
        learning_rate=args.learning_rate,
        logging_strategy="steps",
        logging_steps=args.logging_steps,
        evaluation_strategy="steps",
        eval_steps=args.eval_steps,
        save_strategy="steps",
        save_steps=args.save_steps,
        save_total_limit=2,
        load_best_model_at_end=True,
        metric_for_best_model="eval_loss",
        greater_is_better=False,
        report_to="none",
        seed=args.seed,
        # Colab/GPU related
        gradient_accumulation_steps=args.gradient_accumulation_steps,
        fp16=use_fp16,
        bf16=use_bf16,
        dataloader_num_workers=args.dataloader_num_workers,
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized["train"],
        eval_dataset=tokenized["test"],
        data_collator=data_collator,
        tokenizer=tokenizer,
        compute_metrics=compute_metrics,
    )

    # Register generation callback for richer console output
    gen_cb = SampleGenerationCallback(
        tokenizer=tokenizer,
        prompts=sample_prompts,
        print_every=args.print_generations_every,
        max_new_tokens=args.max_new_tokens,
        gen_kwargs=None,
    )
    trainer.add_callback(gen_cb)
    gen_cb.model = trainer.model

    # Determine if the resume path is a real Trainer checkpoint (has trainer_state.json)
    resume_for_trainer = None
    if resume_ckpt:
        trainer_state_path = os.path.join(resume_ckpt, "trainer_state.json")
        if os.path.isfile(trainer_state_path):
            resume_for_trainer = resume_ckpt
        else:
            print(
                f"Note: '{resume_ckpt}' does not look like a Trainer checkpoint (missing trainer_state.json). "
                "We'll start a new optimizer/scheduler but keep the loaded model weights."
            )

    print("Starting training...")
    # If resume_for_trainer is a directory with checkpoints, Trainer will resume optimizer/scheduler state as well
    trainer.train(resume_from_checkpoint=resume_for_trainer)

    # Evaluate after training for final metrics
    print("Running final evaluation...")
    eval_metrics = trainer.evaluate()
    eval_loss = eval_metrics.get("eval_loss")
    eval_acc = eval_metrics.get("eval_accuracy") or eval_metrics.get("accuracy")
    try:
        ppl = float(np.exp(eval_loss)) if eval_loss is not None else None
    except Exception:
        ppl = None
    print("Final evaluation metrics:")
    if eval_loss is not None:
        print(f"  eval_loss: {eval_loss:.4f}")
    if ppl is not None:
        print(f"  perplexity: {ppl:.2f}")
    if eval_acc is not None:
        print(f"  token_accuracy: {eval_acc:.4f}")

    # Save metrics to a JSONL for record-keeping
    try:
        os.makedirs(args.output_dir, exist_ok=True)
        with open(os.path.join(args.output_dir, "metrics.txt"), "a", encoding="utf-8") as f:
            f.write(str(eval_metrics) + "\n")
    except Exception as e:
        print("Warning: failed to write metrics:", e)

    print(f"Saving model to {args.output_dir}...")
    trainer.save_model(args.output_dir)
    tokenizer.save_pretrained(args.output_dir)

    print("Done.")


if __name__ == "__main__":
    main()
