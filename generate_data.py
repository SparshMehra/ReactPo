"""
Data Augmentation Script

@file generate_data.py
@author Abdiaziz Muse (A00471783)
@description Script to augment conversational training data using Google's Gemini AI.
             Parses existing User/Assistant conversations and generates variations
             to expand the training dataset for the chatbot model.

Features:
- Parse conversational text files (User:/Assistant: format)
- Generate user message variations using Gemini AI
- Support for casual, formal, and different phrasings
- Output in multiple formats (TXT, JSONL)
- Configurable number of variations per message

Functions:
- parse_conversational_txt: Parse User/Assistant conversation format
- generate_user_variations: Create alternative phrasings using Gemini
- augment_conversations: Expand dataset with generated variations
- save_as_txt: Export conversations in text format
- save_as_jsonl: Export conversations in JSONL format

Requirements:
- Google Generative AI SDK (google-generativeai)
- Valid Gemini API key

Usage:
    Configure API key and run the script to augment training data.
"""

import google.generativeai as genai
import json
import re

# Initialize Gemini client
genai.configure(api_key='YOUR_API_KEY')
model = genai.GenerativeModel('gemini-2.0-flash-exp')


def parse_conversational_txt(filename):
    """Parse your conversational txt format"""
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    conversations = []
    current_convo = []

    lines = content.split('\n')

    for line in lines:
        line = line.strip()
        if line.startswith('User:'):
            if current_convo:  # If we have a previous conversation, save it
                conversations.append(current_convo)
                current_convo = []
            current_convo.append({"role": "user", "content": line[5:].strip()})
        elif line.startswith('Assistant:'):
            current_convo.append({"role": "assistant", "content": line[10:].strip()})

    # Don't forget the last conversation
    if current_convo:
        conversations.append(current_convo)

    return conversations


def generate_user_variations(user_message, num_variations=3):
    """Generate variations of user messages"""
    try:
        prompt = f"""Generate different ways a user might say the same thing. Include casual, formal, and slightly different phrasings.

Generate {num_variations} variations of this user message: '{user_message}'

Provide only the variations, one per line, without numbering or extra explanation."""

        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                temperature=0.8,
                max_output_tokens=100,
            )
        )
        variations_text = response.text.strip()

        # Parse variations (handle numbered list, bullet points, or plain text)
        variations = []
        for line in variations_text.split('\n'):
            line = line.strip()
            if line and not line.startswith('Here are') and not line.startswith('Variations:'):
                # Remove numbers/bullets
                clean_line = re.sub(r'^[\d\-•\.]\s*', '', line)
                if clean_line and len(clean_line) > 2:
                    variations.append(clean_line)

        return variations[:num_variations]
    except Exception as e:
        print(f"Error generating variations for: {user_message}")
        print(f"Error: {e}")
        return []


def augment_conversations(conversations):
    """Augment the conversational data"""
    augmented_data = []

    for i, convo in enumerate(conversations):
        print(f"Processing conversation {i + 1}/{len(conversations)}")

        # Add original conversation
        augmented_data.append(convo)

        # For each user message in the conversation, create variations
        for j, turn in enumerate(convo):
            if turn["role"] == "user":
                variations = generate_user_variations(turn["content"], num_variations=3)

                for variation in variations:
                    # Create a new conversation with the variation
                    new_convo = convo.copy()
                    new_convo[j] = {"role": "user", "content": variation}
                    augmented_data.append(new_convo)

    return augmented_data


def save_as_txt(conversations, filename):
    """Save conversations in User:/Assistant: format"""
    with open(filename, 'w', encoding='utf-8') as f:
        for i, convo in enumerate(conversations):
            f.write(f"=== Conversation {i + 1} ===\n")
            for turn in convo:
                if turn["role"] == "user":
                    f.write(f"User: {turn['content']}\n")
                elif turn["role"] == "assistant":
                    f.write(f"Assistant: {turn['content']}\n")
            f.write("\n")  # Add space between conversations


# Main execution
if __name__ == "__main__":
    # Parse your data
    print("Parsing your txt file...")
    conversations = parse_conversational_txt(r'C:\Users\abdia\PycharmProjects\ReactPoff\train_data_gpt2.txt')
    print(f"Found {len(conversations)} conversations")

    # Augment data
    print("Generating variations...")
    augmented_conversations = augment_conversations(conversations)

    # Save to TXT file
    output_file = 'augmented_training_data.txt'
    save_as_txt(augmented_conversations, output_file)

    print(f"✅ Done! Generated {len(augmented_conversations)} training examples")
    print(f"📁 Saved to: {output_file}")
    print(f"📊 Original: {len(conversations)} conversations")
    print(f"📈 New: {len(augmented_conversations) - len(conversations)} augmented variations")