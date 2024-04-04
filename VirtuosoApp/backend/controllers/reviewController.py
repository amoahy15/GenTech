from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from mongoengine import ValidationError, NotUniqueError, DoesNotExist
from models.reviewModel import Review
from models.artworkModel import Artwork
from models.userModel import User
from datetime import datetime
import logging
import uuid

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
review_controller = Blueprint('review_controller', __name__)
@review_controller.route('/create_review', methods=['POST'])
@jwt_required()
def create_review():
    user_id = get_jwt_identity()
    data = request.get_json()
    review_id = str(uuid.uuid4())  # Generate a UUID for the review ID
    logger.info(f"Creating review {review_id} by user {user_id} for artwork {data.get('artwork_id')}")

    try:
        user = User.objects.get(user_id=user_id)
        artwork = Artwork.objects.get(artwork_id=data['artwork_id'])
        
        # Assign the generated UUID as the review_id
        new_review = Review(
            review_id=review_id,  
            user=user,
            artwork=artwork,
            rating=data['rating'],
            comment=data.get('comment', '')
        )
        new_review.save()

         # Update the user's and artwork's list of reviews
        user.update(push__reviews=new_review)
        artwork.update(push__reviews=new_review)
        artwork.reload()  # Reload the artwork document to ensure the list of reviews is updated

        # Update the average rating of the artwork
        artwork.update_average_rating()

        logger.info(f"Review {review_id} created successfully for artwork {data.get('artwork_id')}")
        return jsonify({"msg": "Review created successfully", "review": new_review.serialize()}), 201

    except DoesNotExist as e:
        logger.error(f"Error: {str(e)}")
        return jsonify({"error": "User or Artwork not found"}), 404
    except ValidationError as e:
        logger.error(f"Validation error: {str(e)}")
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        logger.exception("An unexpected error occurred")
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

@review_controller.route('/reviews/<string:review_id>', methods=['GET'])
@jwt_required()
def get_review(review_id):
    try:
        review = Review.objects.get(id=review_id)
        return jsonify(review.serialize()), 200
    except DoesNotExist:
        return jsonify({"error": "Review not found"}), 404

@review_controller.route('/reviews/<string:review_id>', methods=['PUT'])
@jwt_required()
def update_review(review_id):
    try:
        data = request.get_json()
        Review.objects(id=review_id).update_one(**data)
        review = Review.objects.get(id=review_id)
        return jsonify({"msg": "Review updated successfully", "review": review.serialize()}), 200
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except DoesNotExist:
        return jsonify({"error": "Review not found"}), 404

@review_controller.route('/reviews/<string:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    try:
        review = Review.objects.get(id=review_id)
        review.delete()
        return jsonify({"msg": "Review deleted successfully"}), 200
    except DoesNotExist:
        return jsonify({"error": "Review not found"}), 404
