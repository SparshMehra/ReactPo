"""
Chatbot API using Fine-Tuned DistilGPT-2 Model

@file chatbot_api.py
@author Abdiaziz Muse (A00471783)
@description Flask API server for the conservation area chatbot using a fine-tuned
             DistilGPT-2 model to answer questions about the woodland conservation area.
             Includes a rule-based fallback for servers without PyTorch installed.

Features:
- Fine-tuned DistilGPT-2 model for domain-specific responses (when available)
- Rule-based fallback responses (when PyTorch not installed)
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

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Try to load PyTorch and transformers, fall back to rule-based if not available
USE_ML_MODEL = False
tokenizer = None
model = None

try:
    from transformers import AutoTokenizer, AutoModelForCausalLM
    import torch

    MODEL_PATH = "./distilgpt2-finetuned"
    print(f"Loading model from {MODEL_PATH}...")

    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
    model = AutoModelForCausalLM.from_pretrained(MODEL_PATH)

    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    model.eval()
    USE_ML_MODEL = True
    print("ML Model loaded successfully!")
except ImportError as e:
    print(f"PyTorch/Transformers not available: {e}")
    print("Using rule-based fallback responses.")
except Exception as e:
    print(f"Error loading model: {e}")
    print("Using rule-based fallback responses.")


# Rule-based fallback responses for when ML model isn't available
FALLBACK_RESPONSES = {
    # Greetings
    "hello": "Hello! Welcome to the Woodland Conservation Area. How can I help you today?",
    "hi": "Hi there! I'm the Woodland Assistant. What would you like to know about our conservation area?",
    "hey": "Hey! Welcome to our conservation area. Feel free to ask me anything!",
    "good morning": "Good morning! Beautiful day to explore nature. How can I assist you?",
    "good afternoon": "Good afternoon! How can I help you learn about our woodland area?",
    "good evening": "Good evening! What would you like to know about the conservation area?",
    "greetings": "Greetings! Welcome to the Woodland Conservation Area. I'm here to help!",
    "howdy": "Howdy! Welcome to nature's paradise. What can I help you discover today?",

    # About/General
    "about": "The St. Margaret's Bay Area Woodland Conservation Site is dedicated to preserving natural habitats, protecting wildlife, and educating visitors about environmental conservation. We offer guided tours, workshops, and volunteer opportunities.",
    "what is this": "This is the Woodland Conservation Area - a protected natural space where you can explore trails, observe wildlife, attend educational workshops, and participate in conservation efforts.",
    "where": "We are located in the St. Margaret's Bay area of Nova Scotia. You can find directions on our Contact page or use the location lookup feature.",
    "location": "The Woodland Conservation Area is situated in St. Margaret's Bay, Nova Scotia. Visit our Contact page for detailed directions and maps.",
    "address": "Our address is in St. Margaret's Bay, Nova Scotia. Check our Contact page for the full address and directions.",
    "directions": "You can find directions to our conservation area on the Contact page. We're located in the beautiful St. Margaret's Bay region.",
    "history": "The Woodland Conservation Area has been protecting this natural habitat since 1995. Our mission has always been to preserve biodiversity and educate the public about environmental stewardship.",
    "mission": "Our mission is to protect and preserve the woodland ecosystem, promote environmental education, and provide a natural sanctuary for wildlife and visitors alike.",
    "purpose": "We exist to conserve natural habitats, protect wildlife, educate visitors about nature, and inspire environmental stewardship in our community.",

    # Events
    "events": "We host various events including guided nature tours, bird watching sessions, plant identification workshops, photography walks, and volunteer conservation activities. Check our Events page for upcoming activities!",
    "tour": "We offer guided tours of the conservation area led by experienced naturalists. Tours cover local wildlife, native plants, and conservation efforts. Book through our Events page!",
    "tours": "Our guided tours run throughout the year! We have morning bird walks, afternoon nature hikes, sunset tours, and special seasonal events. Visit the Events page to book.",
    "workshop": "Our workshops cover topics like native plant identification, bird watching, wildlife photography, nature journaling, and environmental conservation. See the Events page for schedules.",
    "workshops": "We offer educational workshops for all ages - from beginner nature walks to advanced ecology seminars. Check the Events page for our full workshop calendar!",
    "volunteer": "We welcome volunteers! You can help with trail maintenance, tree planting, wildlife monitoring, invasive species removal, and educational programs. Visit our Events page to find volunteer opportunities.",
    "volunteering": "Volunteering is a great way to give back! Opportunities include trail work, habitat restoration, wildlife surveys, and helping with events. Sign up on our Events page!",
    "book": "You can book events, tours, and workshops through our Events page. Select the activity you're interested in and follow the booking process.",
    "register": "To register for events, visit our Events page, choose your activity, and complete the booking form. You'll receive a confirmation email with all the details.",
    "calendar": "Our event calendar is available on the Events page. You can filter by category, date, and difficulty level to find activities that interest you.",
    "schedule": "Check our Events page for the full schedule of upcoming tours, workshops, and volunteer activities. New events are added regularly!",
    "upcoming": "View all upcoming events on our Events page! We have guided tours, workshops, volunteer days, and special seasonal activities planned.",
    "cost": "Many of our events are free! Some specialized workshops may have a small fee. Check individual event listings on our Events page for pricing details.",
    "price": "Event pricing varies - many activities are free, while some workshops have modest fees to cover materials. See the Events page for specific pricing.",
    "free": "Yes! Many of our events are completely free, including guided tours and volunteer activities. Some workshops may have a small materials fee.",

    # Wildlife & Nature
    "animals": "Our conservation area is home to various wildlife including white-tailed deer, red foxes, eastern coyotes, raccoons, porcupines, snowshoe hares, and numerous bird species. Join our wildlife watching events to learn more!",
    "wildlife": "The woodland hosts diverse wildlife - from white-tailed deer to red foxes, and over 100 bird species. Our guided tours can help you spot these amazing creatures in their natural habitat.",
    "birds": "We have excellent bird watching opportunities! Common species include woodpeckers, owls, hawks, warblers, chickadees, nuthatches, and seasonal waterfowl. Join our bird watching tours for the best experience.",
    "bird": "Bird watching is one of our most popular activities! We've recorded over 100 species including raptors, songbirds, and waterfowl. Check out our bird watching events!",
    "plants": "The area features diverse native plants including maple, oak, birch trees, ferns, wildflowers, mosses, lichens, and medicinal plants. Our plant identification workshops teach you to recognize them.",
    "trees": "Our woodland includes various native trees such as red maple, sugar maple, white oak, red oak, yellow birch, white pine, red spruce, and balsam fir. Each supports unique wildlife habitats.",
    "flora": "Our flora includes diverse native species - deciduous and coniferous trees, shrubs, ferns, mosses, lichens, and seasonal wildflowers. Visit our Flora page to learn more!",
    "fauna": "Our fauna includes mammals like deer, foxes, and hares; numerous bird species; amphibians like frogs and salamanders; and countless insects. Check out our wildlife guides on the Flora & Fauna page.",
    "deer": "White-tailed deer are commonly seen in our conservation area, especially at dawn and dusk. Join our wildlife tours for the best chance to observe them!",
    "fox": "Red foxes inhabit our woodland and are occasionally spotted on our trails. They're most active during early morning and evening hours.",
    "owl": "Several owl species call our woodland home, including barred owls and great horned owls. Join our evening wildlife walks for a chance to hear their calls!",
    "butterfly": "Our meadow areas attract many butterfly species during spring and summer. The best viewing is in our wildflower garden areas.",
    "flowers": "Wildflowers bloom throughout the seasons - from trilliums and violets in spring to asters and goldenrod in fall. Our plant walks highlight these beauties!",
    "mushroom": "Various fungi thrive in our woodland ecosystem. Join our fall mushroom identification walks to learn about these fascinating organisms (foraging not permitted).",
    "fungi": "Our forest supports diverse fungi species that play crucial roles in the ecosystem. We offer educational walks about fungi identification.",
    "ecosystem": "Our woodland ecosystem includes diverse habitats - mature forest, wetlands, meadows, and streams - each supporting unique plant and animal communities.",
    "habitat": "We protect various habitats including old-growth forest, young forest, wetlands, streams, and meadow areas. Each supports different species and ecological processes.",
    "nature": "Experience nature at its finest! Our conservation area offers pristine forests, diverse wildlife, beautiful trails, and peaceful surroundings for all to enjoy.",

    # Facilities & Services
    "hours": "The conservation area is open daily from dawn to dusk. The visitor center is open 9 AM to 5 PM on weekends and holidays. Specific event times vary - please check our Events page.",
    "open": "We're open every day from sunrise to sunset! The visitor center operates on weekends and holidays from 9 AM to 5 PM.",
    "parking": "Free parking is available at the main entrance with space for about 30 vehicles. Additional overflow parking is available during special events.",
    "facilities": "We have a visitor center with exhibits, restrooms, marked trails of varying difficulty, picnic areas, and an education center for workshops and programs.",
    "trails": "We have over 10 km of marked trails ranging from easy accessible paths to moderate woodland hikes. Trail maps are available at the visitor center and on our website.",
    "trail": "Our trail system offers something for everyone - from easy 15-minute walks to longer 2-hour hikes. Maps are available at the trailhead kiosks.",
    "map": "Trail maps are available at the visitor center, trailhead kiosks, and can be downloaded from our website. They show difficulty levels and points of interest.",
    "accessibility": "We strive to make our facilities accessible. The visitor center and the Accessible Nature Trail are wheelchair accessible. Contact us for specific accessibility information.",
    "wheelchair": "Yes! Our visitor center is fully accessible, and we have a dedicated Accessible Nature Trail designed for wheelchair users and those with mobility challenges.",
    "dogs": "Leashed dogs are welcome on most trails! Please keep your pet on a leash at all times and clean up after them. Some sensitive areas may be dog-free.",
    "pets": "Well-behaved, leashed pets are welcome in most areas. Please be respectful of wildlife and other visitors, and always clean up after your pet.",
    "picnic": "We have several picnic areas with tables throughout the conservation area. Feel free to bring a lunch and enjoy a meal surrounded by nature!",
    "restroom": "Restrooms are available at the visitor center and at the main trailhead. Portable facilities are sometimes available at remote picnic areas.",
    "bathroom": "Restrooms are located at the visitor center and main trailhead. They're accessible and maintained regularly.",
    "water": "We recommend bringing your own water bottle. There's a water fountain at the visitor center, but no water sources on the trails.",
    "food": "There's no food service on-site, but you're welcome to bring snacks and picnic lunches. Please pack out all trash to keep our area pristine.",
    "gift shop": "Our small gift shop at the visitor center offers nature books, field guides, local crafts, and conservation-themed items. Proceeds support our programs!",
    "wifi": "Free WiFi is available at the visitor center. However, we encourage visitors to disconnect and enjoy the natural surroundings!",

    # Contact & Support
    "contact": "You can reach us through our Contact page, by email at info@woodlandconservation.ca, or by phone. We're happy to answer any questions!",
    "email": "You can email us at info@woodlandconservation.ca. We typically respond within 24-48 hours.",
    "phone": "Contact information including our phone number is available on the Contact page. We're happy to help with any questions!",
    "help": "I can help you with information about events, wildlife, trails, volunteering, facilities, and general questions about the conservation area. What would you like to know?",
    "support": "For support, please visit our Contact page or reach out via email. Our team is here to help with any questions or concerns.",
    "question": "I'm here to answer your questions! Ask me about events, wildlife, trails, volunteering, or anything else about the conservation area.",
    "feedback": "We value your feedback! You can share your thoughts through our Contact page or leave a comment after attending an event.",

    # Conservation & Environment
    "conservation": "Our mission is to protect and preserve this woodland ecosystem for future generations. We focus on habitat restoration, wildlife protection, invasive species management, and environmental education.",
    "donate": "Your donations help us maintain trails, protect wildlife habitats, restore ecosystems, and run educational programs. Visit our website to learn about donation options and become a conservation champion!",
    "donation": "Donations of any size make a difference! Funds support trail maintenance, habitat restoration, educational programs, and wildlife monitoring. See our website for ways to give.",
    "protect": "We protect the woodland through habitat restoration, invasive species removal, wildlife monitoring, sustainable land management, and community engagement.",
    "environment": "Environmental protection is at the heart of what we do. Through conservation, education, and community involvement, we work to preserve this natural treasure.",
    "climate": "We're addressing climate change through forest preservation, native species planting, and educating visitors about sustainable practices. Healthy forests are vital carbon sinks!",
    "sustainable": "Sustainability guides all our practices - from trail construction to event planning. We aim to minimize our footprint while maximizing conservation impact.",
    "invasive": "We actively manage invasive species that threaten native plants and wildlife. Volunteer for our invasive species removal days to help!",
    "native": "Native plants and animals are our priority! We work to protect indigenous species and restore habitats to support local biodiversity.",
    "biodiversity": "Protecting biodiversity is central to our mission. Our woodland supports hundreds of plant and animal species, each playing a vital role in the ecosystem.",

    # Gallery & Photos
    "gallery": "Our gallery showcases beautiful photos of the conservation area, wildlife, seasonal changes, and events. You can also submit your own nature photos!",
    "photos": "Check out our Gallery page for stunning photos of the woodland, wildlife, and seasonal beauty. We love when visitors share their own photos too!",
    "pictures": "Browse our Gallery for beautiful images of nature, wildlife, and events. Feel free to share your own photos from your visit!",
    "photography": "Photography is welcome throughout the conservation area! We also offer photography workshops and walks. Check the Events page for photography-focused activities.",
    "camera": "Feel free to bring your camera! Our trails offer excellent photography opportunities. Join our photography workshops to improve your nature photography skills.",
    "share": "We'd love to see your photos! You can share them on our Gallery page or tag us on social media. The best photos may be featured!",

    # Seasons & Weather
    "spring": "Spring brings wildflowers, migrating birds, and awakening wildlife. It's a magical time to visit! Watch for spring workshops on bird identification and wildflowers.",
    "summer": "Summer offers lush green forests, active wildlife, butterflies, and warm weather hiking. Don't forget sunscreen and bug spray!",
    "fall": "Fall is spectacular with colorful foliage, mushrooms, and wildlife preparing for winter. Our fall foliage walks are very popular!",
    "autumn": "Autumn brings stunning leaf colors, mushroom season, and crisp hiking weather. Join our fall nature walks to experience the changing seasons!",
    "winter": "Winter reveals animal tracks, offers quiet snowshoe walks, and features hardy winter birds. Bundle up and explore the peaceful winter woodland!",
    "weather": "Check local weather before your visit and dress in layers. Trails can be muddy after rain. We operate rain or shine, but may cancel during severe weather.",
    "rain": "We're open in light rain! Trails may be muddy, so wear appropriate footwear. Events may be rescheduled during heavy rain - check our Events page for updates.",
    "snow": "Winter is beautiful here! Bring snowshoes or join our winter walks. Some trails may not be maintained for snow removal, so check conditions before visiting.",

    # Safety
    "safety": "Your safety is important! Stay on marked trails, wear appropriate footwear, bring water, and let someone know your plans. Check trail conditions before hiking.",
    "emergency": "In an emergency, call 911. Trail markers include location codes to help emergency responders find you. The visitor center has first aid supplies.",
    "lost": "If you become lost, stay calm and stay on the trail. Trail markers include location codes. Cell service is available in most areas. Our staff can assist you.",
    "rules": "Please stay on marked trails, keep pets leashed, carry out all trash, don't feed wildlife, and respect other visitors. Full rules are posted at trailheads.",

    # Kids & Families
    "kids": "We love families! Our Junior Naturalist program offers fun activities for children, and many of our trails are suitable for young explorers.",
    "children": "Children are welcome! We have family-friendly trails, educational programs, and special events designed for young nature enthusiasts.",
    "family": "The conservation area is perfect for families! We offer kid-friendly trails, educational activities, and programs designed for all ages.",
    "school": "We offer school programs and field trips! Teachers can arrange educational visits covering ecology, wildlife, and conservation. Contact us to plan a trip.",
    "education": "Education is central to our mission! We offer programs for schools, community groups, and individuals of all ages. Learn about nature while enjoying it!",
    "learn": "There's so much to learn here! Join our workshops, guided tours, or simply explore with our trail guides and interpretive signs.",

    # Misc
    "thank": "You're welcome! Feel free to ask if you have any other questions about the conservation area. Enjoy your visit!",
    "thanks": "You're welcome! Is there anything else you'd like to know? I'm happy to help!",
    "thank you": "You're very welcome! Don't hesitate to ask if you have more questions. We hope to see you soon!",
    "bye": "Goodbye! We hope to see you at the conservation area soon. Enjoy nature and take care!",
    "goodbye": "Thank you for chatting! Visit us soon and enjoy the great outdoors. Take care!",
    "see you": "See you soon! We look forward to welcoming you to the conservation area!",
    "awesome": "Glad I could help! Let me know if you have any other questions.",
    "great": "Wonderful! Feel free to ask more questions anytime.",
    "cool": "Thanks! Is there anything else you'd like to know about the conservation area?",
    "nice": "Thank you! I'm here if you need any more information.",
    "ok": "Great! Let me know if you have any other questions.",
    "okay": "Perfect! Feel free to ask anything else about the conservation area.",
    "yes": "Great! What would you like to know more about?",
    "no": "No problem! Feel free to ask if you have any other questions.",
    "maybe": "Take your time! I'm here whenever you have questions about the conservation area.",
    "who are you": "I'm the Woodland Assistant, a virtual helper for the St. Margaret's Bay Woodland Conservation Area. I can answer questions about events, wildlife, trails, and more!",
    "what can you do": "I can help you with information about our events, wildlife, trails, facilities, volunteering, and general questions about the conservation area. Just ask!",
    "your name": "I'm the Woodland Assistant! I'm here to help you learn about and enjoy the St. Margaret's Bay Woodland Conservation Area.",
}

DEFAULT_RESPONSE = "I'd be happy to help! You can ask me about our events, wildlife, trails, volunteering opportunities, facilities, or general information about the Woodland Conservation Area. What would you like to know?"


def get_fallback_response(user_message):
    """
    Get a rule-based response based on keywords in the user message.
    Uses multiple matching strategies for better results.
    """
    message_lower = user_message.lower().strip()

    # Remove punctuation for better matching
    message_clean = ''.join(c for c in message_lower if c.isalnum() or c.isspace())

    # Check for exact matches first
    if message_lower in FALLBACK_RESPONSES:
        return FALLBACK_RESPONSES[message_lower]

    if message_clean in FALLBACK_RESPONSES:
        return FALLBACK_RESPONSES[message_clean]

    # Score-based keyword matching for better relevance
    best_match = None
    best_score = 0

    for keyword, response in FALLBACK_RESPONSES.items():
        score = 0
        # Exact word match (higher score)
        if f" {keyword} " in f" {message_lower} ":
            score = 3
        # Starts with keyword
        elif message_lower.startswith(keyword):
            score = 2
        # Contains keyword
        elif keyword in message_lower:
            score = 1

        # Bonus for longer keyword matches (more specific)
        if score > 0:
            score += len(keyword) / 20

        if score > best_score:
            best_score = score
            best_match = response

    if best_match and best_score >= 1:
        return best_match

    # Semantic category matching for questions
    words = message_clean.split()

    # Event-related queries
    if any(word in words for word in ["event", "events", "book", "booking", "register", "registration", "signup", "attend", "join", "participate"]):
        return FALLBACK_RESPONSES["events"]

    # Wildlife/animal queries
    if any(word in words for word in ["animal", "animals", "wildlife", "creature", "creatures", "mammal", "mammals"]):
        return FALLBACK_RESPONSES["wildlife"]

    # Bird queries
    if any(word in words for word in ["bird", "birds", "birding", "birdwatching", "avian", "feathered"]):
        return FALLBACK_RESPONSES["birds"]

    # Plant/tree queries
    if any(word in words for word in ["plant", "plants", "tree", "trees", "flower", "flowers", "vegetation", "botanical"]):
        return FALLBACK_RESPONSES["plants"]

    # Trail/hiking queries
    if any(word in words for word in ["trail", "trails", "hike", "hiking", "walk", "walking", "path", "paths", "route"]):
        return FALLBACK_RESPONSES["trails"]

    # Volunteer queries
    if any(word in words for word in ["volunteer", "volunteering", "help", "contribute", "assist", "service"]):
        return FALLBACK_RESPONSES["volunteer"]

    # Location queries
    if any(word in words for word in ["where", "location", "located", "address", "directions", "find", "get"]):
        if any(word in words for word in ["you", "this", "place", "area", "site", "park"]):
            return FALLBACK_RESPONSES["location"]

    # Hours/timing queries
    if any(word in words for word in ["when", "hours", "open", "close", "time", "timing", "schedule"]):
        return FALLBACK_RESPONSES["hours"]

    # Cost/pricing queries
    if any(word in words for word in ["cost", "price", "fee", "charge", "money", "pay", "free", "expensive"]):
        return FALLBACK_RESPONSES["cost"]

    # Facility queries
    if any(word in words for word in ["facility", "facilities", "amenity", "amenities", "restroom", "bathroom", "parking"]):
        return FALLBACK_RESPONSES["facilities"]

    # Contact queries
    if any(word in words for word in ["contact", "reach", "call", "email", "phone", "talk", "speak"]):
        return FALLBACK_RESPONSES["contact"]

    # Donation queries
    if any(word in words for word in ["donate", "donation", "support", "contribute", "give", "fund", "sponsor"]):
        return FALLBACK_RESPONSES["donate"]

    # Photo/gallery queries
    if any(word in words for word in ["photo", "photos", "picture", "pictures", "gallery", "image", "images", "camera"]):
        return FALLBACK_RESPONSES["gallery"]

    # Kids/family queries
    if any(word in words for word in ["kid", "kids", "child", "children", "family", "families", "young", "youth"]):
        return FALLBACK_RESPONSES["kids"]

    # Safety queries
    if any(word in words for word in ["safe", "safety", "emergency", "danger", "dangerous", "risk", "careful"]):
        return FALLBACK_RESPONSES["safety"]

    # Weather/season queries
    if any(word in words for word in ["weather", "rain", "snow", "winter", "summer", "spring", "fall", "autumn", "season"]):
        if "winter" in words:
            return FALLBACK_RESPONSES["winter"]
        if "summer" in words:
            return FALLBACK_RESPONSES["summer"]
        if "spring" in words:
            return FALLBACK_RESPONSES["spring"]
        if "fall" in words or "autumn" in words:
            return FALLBACK_RESPONSES["fall"]
        return FALLBACK_RESPONSES["weather"]

    # About/info queries
    if any(word in words for word in ["about", "info", "information", "tell", "explain", "describe", "what"]):
        if any(word in words for word in ["you", "this", "place", "site", "area", "woodland", "conservation"]):
            return FALLBACK_RESPONSES["about"]

    return DEFAULT_RESPONSE


def generate_ml_response(user_message, max_length=120):
    """
    Generate a response using the fine-tuned ML model
    """
    import torch

    try:
        prompt = f"User: {user_message}\nAssistant:"
        inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True, max_length=512)

        with torch.no_grad():
            outputs = model.generate(
                inputs.input_ids,
                attention_mask=inputs.attention_mask,
                max_new_tokens=100,
                num_return_sequences=1,
                temperature=0.7,
                top_p=0.9,
                top_k=50,
                do_sample=True,
                pad_token_id=tokenizer.pad_token_id,
                eos_token_id=tokenizer.eos_token_id,
                no_repeat_ngram_size=3
            )

        response = tokenizer.decode(outputs[0], skip_special_tokens=True)

        if "Assistant:" in response:
            response = response.split("Assistant:")[-1].strip()
            if "User:" in response:
                response = response.split("User:")[0].strip()

        response = response.strip()

        if len(response) < 5:
            return get_fallback_response(user_message)

        return response

    except Exception as e:
        print(f"Error generating ML response: {e}")
        return get_fallback_response(user_message)


def generate_response(user_message):
    """
    Generate a response - uses ML model if available, otherwise falls back to rules
    """
    if USE_ML_MODEL and model is not None and tokenizer is not None:
        return generate_ml_response(user_message)
    else:
        return get_fallback_response(user_message)


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

        response = generate_response(user_message)

        return jsonify({
            'response': response,
            'status': 'success',
            'mode': 'ml' if USE_ML_MODEL else 'fallback'
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
        'model_loaded': USE_ML_MODEL,
        'mode': 'ml' if USE_ML_MODEL else 'fallback'
    })


if __name__ == '__main__':
    print("Starting chatbot API server...")
    print(f"Mode: {'ML Model' if USE_ML_MODEL else 'Rule-based Fallback'}")
    print("Server will be available at http://ugdev.cs-smu.ca:8744")
    app.run(debug=True, port=8744, host='0.0.0.0')
