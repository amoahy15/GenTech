import logging
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from VirtuosoApp.backend.app.models.user import Users
from mongoengine.errors import NotUniqueError, ValidationError, DoesNotExist
from datetime import timedelta
import os
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

# Initialize Blueprint for UserController
user_controller = Blueprint('user_controller', __name__)

# Configure the logger
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize JWTManager
def setup_jwt(app):
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
    jwt = JWTManager(app)

@user_controller.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json()
    try:
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

        new_user = Users(
            userID=data['userID'],
            username=data['username'],
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            email=data['email'],
            passwordHash=hashed_password.decode('utf-8'),
            profilePicture=data.get('profilePicture'),
            bio=data.get('bio'),
            location=data.get('location'),
            favoriteArtworks=data.get('favoriteArtworks', []),
            reviews=data.get('reviews', []),
            friendsList=data.get('friendsList', []),
            socialMediaLinks=data.get('socialMediaLinks', {}),
            verificationStatus=data.get('verificationStatus', False),
            preferences=data.get('preferences', {}),
            joinedDate=data.get('joinedDate')
        )
        new_user.save()
        logger.info(f"User {new_user.username} created successfully.")
        return jsonify({"message": "User created successfully"}), 201
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({"error": "Data validation failed"}), 400
    except NotUniqueError:
        logger.error("User already exists.")
        return jsonify({"error": "User already exists"}), 409
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


@user_controller.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password').encode('utf-8')  # Ensure password is bytes for bcrypt comparison

    if not username or not password:
        return jsonify({"msg": "Username and password are required"}), 400

    try:
        user = Users.objects.get(username=username)  # Adjust as needed if you use email or another field for login
    except Users.DoesNotExist:
        return jsonify({"msg": "Username not found"}), 404

    # Verify the password with the stored hash
    if user and bcrypt.checkpw(password, user.passwordHash.encode('utf-8')):
        # Identity can be any data that is json serializable, using user ID here
        access_token = create_access_token(identity=str(user.id))
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401