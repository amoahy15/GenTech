import logging
import uuid
import re
from flask import Flask, Blueprint, request, jsonify
from models.userModel import User
from mongoengine.errors import NotUniqueError, ValidationError
from datetime import datetime, timezone
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from models.reviewModel import Review
from models.userModel import User
import datetime

app = Flask(__name__)
bcrypt = Bcrypt(app)

review_controller = Blueprint('ReviewController', __name__)

@review_controller.route('/reviews', methods=['POST'])
@jwt_required() 
def create_review():
    user_id = get_jwt_identity()
    data = request.get_json()

    required_fields = ['artwork_id', 'rating']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    try:
        new_review = Review(
            user_id=user_id,
            artwork_id=data['artwork_id'],
            rating=data['rating'],
            comment=data.get('comment'),
            created_at=data.get('created_at', datetime.now())  # Assuming you might want to specify a creation date
        )
        new_review.save()

        User.objects(user_id=user_id).update_one(push__reviews=new_review.review_id)

        return jsonify({"message": "Review created successfully!", "review_id": str(new_review.review_id)}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500

@review_controller.route('/reviews/<review_id>', methods=['GET'])
def get_review(review_id):
    review = Review.objects(review_id=review_id).first()
    if review:
        review_data = review.serialize()
        user = User.objects(user_id=review.user_id).only('user_name', 'profile_picture').first()
        if user:
            review_data['userDetails'] = user.serialize()  # Adjusted to use serialization method from userModel
        return jsonify(review_data)  
    else:
        return jsonify({"error": "Review not found"}), 404

@review_controller.route('/reviews/<review_id>', methods=['PUT'])
@jwt_required()
def update_review(review_id):
    data = request.get_json()
    try:
        review = Review.objects(review_id=review_id).first()
        if review:
            review.update(**data)
            return jsonify({"message": "Review updated successfully"})
        else:
            return jsonify({"error": "Review not found"}), 404
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500

@review_controller.route('/reviews/<review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    review = Review.objects(review_id=review_id).first()
    if review:
        user_id = review.user_id
        review.delete()

        # Remove the review from the user's reviews list
        User.objects(user_id=user_id).update_one(pull__reviews=review_id)

        return jsonify({"message": "Review deleted successfully"})
    else:
        return jsonify({"error": "Review not found"}), 404
