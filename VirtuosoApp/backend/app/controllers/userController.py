import bcrypt
from flask import request, jsonify, Blueprint
from mongoengine import NotUniqueError, ValidationError
from VirtuosoApp.backend.app.models.user import User

user_controller = Blueprint('UserController', __name__)
@user_controller.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()

    # Required fields list
    required_fields = ['username', 'email', 'password']

    # Check if all required fields are present
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    # Ensure the password is not empty
    if not data['password']:
        return jsonify({"error": "Password cannot be empty."}), 400

    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    try:
        new_user = User(
            userID=data.get('userID'),
            username=data['username'],  # Using direct access since we now know it exists
            first_name=data.get('firstName'),
            last_name=data.get('lastName'),
            email=data['email'],  # Using direct access since we now know it exists
            passwordHash=hashed_password,  # Use the hashed password
            profilePicture=data.get('profilePicture', ''),
            bio=data.get('bio', ''),
            location=data.get('location', ''),
            joinedDate=data.get('joinedDate'),
            favoriteArtworks=data.get('favoriteArtworks', []),
            reviews=data.get('reviews', []),
            friendsList=data.get('friendsList', []),
            socialMediaLinks=data.get('socialMediaLinks', []),
            verificationStatus=data.get('verificationStatus', False),
            preferences=data.get('preferences', {})
        )
        new_user.save()
        return jsonify({"message": "User created successfully!"}), 201
    except NotUniqueError:
        return jsonify({"error": "Username or email already exists."}), 400
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500
