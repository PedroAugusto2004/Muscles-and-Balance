from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, auth

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["*"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Initialize Firebase Admin SDK with direct credentials
cred = credentials.Certificate({
    "type": "service_account",
    "project_id": "muscles-and-balance-7",
    "private_key_id": "24da7ef7a3fb6a519d72b6306a06c63461a8936b",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzbyrVaOuyio5x\nzxf5OfzyZI69KPAQRFYhATTTMhGPcc0YqS4Go7RqYn+x+dnH+3r4x9KjT0t9D+v7\nrVLl17Qgxxo9diT55smGQbD8De9YE48L4j/24RymcwwV5NVvyBhMaEauNEGeBpu0\nQUG8On1ohepO3SSdanm4e5PnGz2DpReShzVk1yl3KEgWFwoXbOQLb4hRZKOjat3D\nzQuAqf2mm0Q6svxECpVcGxNMVQmUykW5NIutFkJ7liOOSG0vO/32BHgGksAQF/pg\nFLVhhIhTOmcNwnSaZCrTdB9r2v6x++e0wqw62kTGYM1tax9qvV95skbWXY3cUkAs\nQEMtzl7jAgMBAAECggEAB86g8vsnMjQEIaCMnvvubQ+CBGn5FAQdKT93sG6/w9mE\nPnvx9DkAOxbBDpnb528iORvcpt1m3/Cm6GLwte5uOHThR+ZRkov/nbdS/4yNquvi\n7/XuqYu+5uEfl/5GaSAwKnbpCGBesIUCFlQ2i32SAk+9U6QcmTrORAAgfdA6G3Wr\nCCMPp0tQf5BdSUPg9Cye002Ut4C/7ImtzmfKLiWD2pV67BjBYj77xgztYr0leZS9\nHL+szkbCjGNCIL8TYaP2PkNoKedGDZb2Ej2FJAAQkYYbBUvMMUWUmtrklU+mNlfV\nPsNtWKPb7qveKHsYMomt6eJySKtrhvjgMC5Ux1h0tQKBgQD9kxBy4rNoBxpooJiu\nzBiirNh9IU0Dwl6x0eDl7py4K/GnVo+s6wbVLEo8kGRZwFieFORkw1+UB/xUklTa\nz0wAqFjcCqNLwU6qZlcjQ8tUP69PvcwWjm4GrRoJALcmS9y9mY1cTTV01NmCFdud\n5LCCRau4xZPyGMJ0JIToZ1nmpQKBgQC1Jo23eo5uACi60XSkGVEF/Rmq++PI4aqv\n//bHFerMAGaX8k6KG1l8fdvumZj0iLKXZK4ZXGXxRwsyJI6yC/cAplta3iKKoTNe\nrlHCR6GKeqMOv1jxomdciSbriBKEJMKBoWjsoOkgVhjWsKRRexvFfwwPphGjFycx\nKMSmcQ5A5wKBgFev7oU7/fxgUHKT7pirvW0rxmVnCaHeKi7lvBbnL8zEbXmHhoGu\neJtpCHbvG7SpvjtUUDLEGR4wsMJyI+PSwZ6MmMXm69c7jr+ASmvIety0dSRnJtc6\nA7RNUe6BD9SvcTMjkW20yWKQZHMGqf5s4dj6zMpFkMasZzoQkuFnNAB9AoGBAKWp\n0mR/Ig4a+ySONJt1w5E0e+rQXOny5oP6E5bRxl41550BrS3EATxGZYF42laXRKwL\nGOR8iYXzsJt0r0LIimT/vgAFsZUSAsaNqJuBoovfx4rPFuoz2U7Y5szzLevHKlIe\naLQuG8TEuAZumHcjnKwqmb8d4ndBz0e3vs9wCNb1AoGAYz8q7JKLx7dIKYzJRQ8l\nfxix28QMtv4VBmVIJlb7R0hUt7Z/+MOjjPl1xKfoW+5XqJ6hdgFct5gZal4V4MxY\nW+iTv/Iaoilibuvhf2Jiu5FOf7Zzs4dNZzHnhuSZy83lA2usK1Hd82tBzUmhIvLZ\njWl/ltQC6IB/TVLUq1Fle68=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-zdsi9@muscles-and-balance-7.iam.gserviceaccount.com",
    "client_id": "118394857176183477011",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zdsi9%40muscles-and-balance-7.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
})

try:
    firebase_admin.initialize_app(cred)
except ValueError:
    # App already initialized
    pass

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.route('/')
def home():
    """Root endpoint to verify the server is running."""
    return jsonify({"status": "ok", "message": "Server is running"})

@app.route('/api/firebase-config', methods=['GET'])
def get_firebase_config():
    """
    Endpoint to provide Firebase configuration to the frontend.
    The frontend should call this endpoint to get the Firebase configuration instead of hardcoding it.
    """
    try:
        config = {
            "apiKey": "AIzaSyCZ0rFP7j83dQ9v1YyUwTvhOIb3ZTNbY0E",
            "authDomain": "muscles-and-balance-7.firebaseapp.com",
            "projectId": "muscles-and-balance-7",
            "storageBucket": "muscles-and-balance-7.appspot.com",
            "messagingSenderId": "679194909576",
            "appId": "1:679194909576:web:f7f3faa46293dc8359383d"
        }
        return jsonify(config)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/verify-token', methods=['POST'])
def verify_token():
    """
    Endpoint to verify Firebase ID tokens.
    The frontend should send the ID token to this endpoint for verification.
    """
    try:
        token = request.json.get('token')
        if not token:
            return jsonify({"error": "No token provided"}), 400

        # Verify the ID token
        decoded_token = auth.verify_id_token(token)
        return jsonify({
            "uid": decoded_token['uid'],
            "email": decoded_token.get('email', ''),
            "email_verified": decoded_token.get('email_verified', False)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))
    app.run(host='0.0.0.0', port=port)