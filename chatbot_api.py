"""
Chatbot API using Fine-Tuned DistilGPT-2 Model

@file chatbot_api.py
@author Abdiaziz Muse (A00471783)
@description Flask API server for the conservation area chatbot using a fine-tuned
             DistilGPT-2 model to answer questions about the woodland conservation area.

Features:
- Fine-tuned DistilGPT-2 model for domain-specific responses
- CORS enabled for React frontend integration
- GPU acceleration support with fallback to CPU
- RESTful API endpoint for chat messages
- Health check endpoint for monitoring

Endpoints:
- POST /api/chat - Send message and receive AI response
- GET /api/health - Check API status

This Flask API serves the chatbot requests from the React frontend
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load the fine-tuned model and tokenizer
MODEL_PATH = "./distilgpt2-finetuned"
print(f"Loading model from {MODEL_PATH}...")

try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
    model = AutoModelForCausalLM.from_pretrained(MODEL_PATH)

    # Set pad token if not already set
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    model.eval()  # Set to evaluation mode
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    tokenizer = None
    model = None


def generate_response(user_message, max_length=100):
    """
    Generate a response using the fine-tuned model
    """
    if model is None or tokenizer is None:
        return "Sorry, the chatbot model is not available at the moment."

    try:
        # Format the input as it was trained
        prompt = f"User: {user_message}\nAssistant:"

        # Tokenize the input
        inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True, max_length=512)

        # Generate response
        with torch.no_grad():
            outputs = model.generate(
                inputs.input_ids,
                attention_mask=inputs.attention_mask,
                max_length=max_length,
                num_return_sequences=1,
                temperature=0.7,
                top_p=0.9,
                top_k=50,
                do_sample=True,
                pad_token_id=tokenizer.pad_token_id,
                eos_token_id=tokenizer.eos_token_id,
                no_repeat_ngram_size=3
            )

        # Decode the response
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)

        # Extract only the assistant's response
        if "Assistant:" in response:
            response = response.split("Assistant:")[-1].strip()
            # Remove any trailing "User:" if present
            if "User:" in response:
                response = response.split("User:")[0].strip()

        # Clean up the response
        response = response.strip()

        # If response is empty or too short, provide a default
        if len(response) < 5:
            response = "I'm here to help! Could you please rephrase your question?"

        return response

    except Exception as e:
        print(f"Error generating response: {e}")
        return "I apologize, but I'm having trouble processing your request. Please try again."


@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Handle chat requests from the frontend
    """
    try:
        data = request.get_json()
        user_message = data.get('message', '')

        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Generate response
        response = generate_response(user_message)

        return jsonify({
            'response': response,
            'status': 'success'
        })

    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({
            'error': 'Internal server error',
            'status': 'error'
        }), 500


@app.route('/api/health', methods=['GET'])
def health():
    """
    Health check endpoint
    """
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })


if __name__ == '__main__':
    print("Starting chatbot API server...")
    print("Server will be available at http://localhost:5000")
    app.run(debug=True, port=5000, host='0.0.0.0')

