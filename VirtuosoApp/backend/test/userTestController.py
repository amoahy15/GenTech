import logging
import os

from flask import Flask, Blueprint, request, jsonify, current_app
from models.userModel import Users
from mongoengine.errors import NotUniqueError, ValidationError, DoesNotExist
from datetime import timedelta, datetime,timezone
from flask_bcrypt import Bcrypt

#this is for Faker will delete
from faker import Faker

app = Flask(__name__)
bcrypt = Bcrypt(app)

# Initialize Blueprint for UserController
user_controller = Blueprint('user_test_controller', __name__)

# Configure the logger
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@user_controller.route('/cfu', methods=['POST'])
def cfu():
    faker = Faker()
    fake_data = {
        'userID': faker.uuid4(),
        'userName': faker.user_name(),
        'firstName': faker.first_name(),
        'lastName': faker.last_name(),
        'email': faker.email(),
        'password': faker.password(),
        'profilePicture': faker.image_url(),
        'bio': faker.text(max_nb_chars=200),
        'location': faker.city(),
        'favoriteArtworks': [],  # You might want to generate fake data for this as well
        'reviews': [],  # Similarly, fake data can be generated
        'friendsList': [],  # Depending on your requirements, generate fake data
        'socialMediaLinks': {},  # You can also generate fake social media links
        'verificationStatus': faker.boolean(),
        'preferences': {},  # Preferences can be generated based on your app's needs
        'joinedDate': faker.date_time_this_decade(before_now=True, after_now=False, tzinfo=timezone.utc)
    }

    try:
        # Correct method to hash a password with Flask-Bcrypt, without decode for Python 3
        hashed_password = bcrypt.generate_password_hash(fake_data['password'])

        new_user = Users(
            userID=fake_data['userID'],
            username=fake_data['userName'],
            first_name=fake_data['firstName'],
            last_name=fake_data['lastName'],
            email=fake_data['email'],
            passwordHash=hashed_password,
            profilePicture=fake_data['profilePicture'],
            bio=fake_data['bio'],
            location=fake_data['location'],
            favoriteArtworks=fake_data['favoriteArtworks'],
            reviews=fake_data['reviews'],
            friendsList=fake_data['friendsList'],
            socialMediaLinks=fake_data['socialMediaLinks'],
            verificationStatus=fake_data['verificationStatus'],
            preferences=fake_data['preferences'],
            joinedDate=fake_data['joinedDate']
        )
        new_user.save()
        logger.info(f"Fake user {new_user.username} created successfully.")
        return jsonify({
            "message": "Fake user created successfully",
            "user": {
                "userID": new_user.userID,
                "username": new_user.username,
                "firstName": new_user.first_name,
                "lastName": new_user.last_name,
                "email": new_user.email,
                "profilePicture": new_user.profilePicture,
                "bio": new_user.bio,
                "location": new_user.location,
                "favoriteArtworks": new_user.favoriteArtworks,
                "reviews": new_user.reviews,
                "friendsList": new_user.friendsList,
                "socialMediaLinks": new_user.socialMediaLinks,
                "verificationStatus": new_user.verificationStatus,
                "preferences": new_user.preferences,
                "joinedDate": new_user.joinedDate.strftime("%Y-%m-%d %H:%M:%S")  # Assuming joinedDate is a datetime object
            }
        }), 201    
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({"error": "Data validation failed"}), 400
    except NotUniqueError:
        logger.error("User already exists.")
        return jsonify({"error": "User already exists"}), 409
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


@user_controller.route('/get_user/<username>', methods=['GET'])
def get_user(username):
    try:
        user = Users.objects.get(username=username)
        user_info = {
            "userID": str(user.userID),
            "username": user.username,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "email": user.email,
            "profilePicture": user.profilePicture,
            "bio": user.bio,
            "location": user.location,
            "favoriteArtworks": user.favoriteArtworks,
            "reviews": user.reviews,
            "friendsList": user.friendsList,
            "socialMediaLinks": user.socialMediaLinks,
            "verificationStatus": user.verificationStatus,
            "preferences": user.preferences,
            # Format datetime as string
            "joinedDate": user.joinedDate.strftime("%Y-%m-%d %H:%M:%S") if user.joinedDate else None
        }
        return jsonify({"user": user_info}), 200
    except DoesNotExist:
        logger.error("User does not exist.")
        return jsonify({"error": "User does not exist"}), 404
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500
