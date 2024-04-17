from flask import request, jsonify, Blueprint, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from mongoengine import ValidationError, NotUniqueError, DoesNotExist
from models.reviewModel import Review
from models.artworkModel import Artwork
from models.userModel import User
import logging
import uuid

review_controller = Blueprint('review_controller', __name__)

@review_controller.route('/create_review', methods=['POST'])
@jwt_required()
def create_review():
    user_id = get_jwt_identity()
    data = request.get_json()
    review_id = str(uuid.uuid4())
    current_app.logger.info(f"Attempting to create review {review_id} by user {user_id} for artwork {data.get('artwork_id')}")
    current_app.logger.setLevel(logging.INFO)

    try:
        user = User.objects.get(id=user_id)
        artwork = Artwork.objects.get(id=data['artwork_id'])
        
        new_review = Review(
            id=review_id,
            user_id=user_id,
            artwork_id=data['artwork_id'],
            rating=data['rating'],
            comment=data.get('comment', ''),
            created_at=datetime.now()
        )
        new_review.save()

        artwork.update_average_rating()  # Update average rating for the artwork after adding new review
        current_app.logger.info(f"Review {review_id} successfully created.")

        return jsonify({"message": "Review created successfully", "review_id": review_id}), 201

    except ValidationError as e:
        current_app.logger.error(f"Validation error during review creation: {str(e)}")
        return jsonify({"error": str(e)}), 400
    except NotUniqueError:
        current_app.logger.error("Duplicate review not allowed")
        return jsonify({"error": "Review already exists"}), 409
    except Exception as e:
        current_app.logger.exception("Unexpected error occurred during review creation.")
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

@review_controller.route('/reviews/<string:review_id>', methods=['GET'])
@jwt_required()
def get_review(review_id):
    try:
        review = Review.objects.get(id=review_id)
        return jsonify(review.serialize()), 200
    except DoesNotExist:
        current_app.logger.error(f"Review {review_id} not found")
        return jsonify({"error": "Review not found"}), 404

@review_controller.route('/reviews/<string:review_id>', methods=['PUT'])
@jwt_required()
def update_review(review_id):
    data = request.get_json()
    try:
        Review.objects(id=review_id).update_one(**data)
        review = Review.objects.get(id=review_id)
        return jsonify({"message": "Review updated successfully", "review": review.serialize()}), 200
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except DoesNotExist:
        return jsonify({"error": "Review not found"}), 404

@review_controller.route('/reviews/<string:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    try {
        review = Review.objects.get(id=review_id)
        review.delete()
        return jsonify({"message": "Review deleted successfully"}), 200
    except DoesNotExist:
        return jsonify({"error": "Review not found"}), 404

@review_controller.route('/artwork/<string:artwork_id>/reviews', methods=['GET'])
@jwt_required()
def get_reviews_for_artwork(artwork_id):
    user_id = get_jwt_identity()  # Retrieves the JWT identity, typically the user ID of the logged-in user
    try:
        reviews = Review.objects(artwork_id=artwork_id)
        reviews_list = []
        for review in reviews:
            user = User.objects(user_id=review.user_id).first()
            if user:
                reviews_list.append({
                    'review_id': str(review.id),
                    'user_id': str(review.user_id),
                    'user_name': user.user_name,
                    'profile_picture': user.profile_picture,
                    'rating': review.rating,
                    'comment': review.comment,
                    'created_at': review.created_at.isoformat()
                })
        return jsonify(reviews_list), 200
    except DoesNotExist:
        return jsonify({"error": "Artwork not found"}), 404
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

