from flask import Flask, jsonify, request # type: ignore
from flask_cors import CORS # type: ignore
import os
from dotenv import load_dotenv # type: ignore
import requests # type: ignore

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS

# Securely access sensitive information
NUTRITIONIX_APP_ID = os.getenv('NUTRITIONIX_APP_ID')
NUTRITIONIX_API_KEY = os.getenv('NUTRITIONIX_API_KEY')
USDA_API_KEY = os.getenv('USDA_API_KEY')  # Add this line

@app.route('/api/nutrition', methods=['POST'])
def get_nutrition_info():
    """
    Handle requests from the frontend to fetch nutrition information from Nutritionix.
    """
    # Extract data sent from the frontend
    data = request.json
    barcode = data.get('barcode')

    if not barcode:
        return jsonify({"error": "No barcode provided"}), 400

    # Make a secure request to the Nutritionix API
    nutritionix_url = f'https://trackapi.nutritionix.com/v2/natural/nutrients'
    headers = {
        "x-app-id": NUTRITIONIX_APP_ID,
        "x-app-key": NUTRITIONIX_API_KEY,
        "Content-Type": "application/json"
    }
    body = {
        "query": barcode,
        "num_servings": 1
    }

    try:
        response = requests.post(nutritionix_url, headers=headers, json=body)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/register', methods=['POST'])
def handle_registration():
    """
    Example of handling Firebase-related requests, such as user registration.
    """
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Simulated Firebase authentication logic
    # You would typically use Firebase Admin SDK on a secure backend
    return jsonify({
        "message": "User registered successfully",
        "email": email
    })

@app.route('/api/nutritionix-config', methods=['GET'])
def get_nutritionix_config():
    """
    Endpoint to provide Nutritionix API credentials to the frontend.
    """
    config = {
        "apiKey": NUTRITIONIX_API_KEY,
        "appId": NUTRITIONIX_APP_ID
    }
    return jsonify(config)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Changed port to 5000
    app.run(host='0.0.0.0', port=port)
