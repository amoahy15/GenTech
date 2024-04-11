from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from mongoengine import ValidationError, NotUniqueError, DoesNotExist
from models.reviewModel import Review
from models.artworkModel import Artwork
from models.userModel import User
import logging
import uuid

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
review_controller = Blueprint('review_controller', __name__)

@review_controller.route('/create_review', methods=['POST'])
@jwt_required()
def create_review():
    user_id = get_jwt_identity()
    data = request.get_json()
    try:
        user = User.objects.get(user_id=user_id)
        new_review = Review(
            review_id=str(uuid.uuid4()),
            user=user,
            rating=data['rating'],
            comment=data.get('comment', '')
        )
        new_review.save()

        logger.info(f"Review {new_review.review_id} successfully created.")
        return jsonify({"msg": "Review created successfully", "review": new_review.serialize()}), 201

    except DoesNotExist as e:
        logger.error(f"DoesNotExist error during review creation: {e}")
        return jsonify({"error": "User or Artwork not found", "details": str(e)}), 404
    except ValidationError as e:
        logger.error(f"Validation error during review creation: {e}")
        return jsonify({"error": "Validation error", "details": str(e)}), 400
    except Exception as e:
        logger.exception("Unexpected error occurred during review creation.")
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500
    
@review_controller.route('/reviews/<string:review_id>', methods=['GET'])
@jwt_required()
def get_review(review_id):
    logger.info(f"Fetching review {review_id}")
    try:
        review = Review.objects.get(id=review_id)
        logger.info(f"Review {review_id} fetched successfully")
        return jsonify(review.serialize()), 200
    except DoesNotExist:
        logger.error(f"Review {review_id} not found")
        return jsonify({"error": "Review not found"}), 404

@review_controller.route('/reviews/<string:review_id>', methods=['PUT'])
@jwt_required()
def update_review(review_id):
    logger.info(f"Attempting to update review {review_id}")
    try:
        data = request.get_json()
        Review.objects(id=review_id).update_one(**data)
        review = Review.objects.get(id=review_id)
        logger.info(f"Review {review_id} updated successfully")
        return jsonify({"msg": "Review updated successfully", "review": review.serialize()}), 200
    except ValidationError as e:
        logger.error(f"Validation error while updating review {review_id}: {str(e)}")
        return jsonify({"error": str(e)}), 400
    except DoesNotExist:
        logger.error(f"Review {review_id} not found for update")
        return jsonify({"error": "Review not found"}), 404

@review_controller.route('/reviews/<string:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    logger.info(f"Attempting to delete review {review_id}")
    try:
        review = Review.objects.get(id=review_id)
        review.delete()
        logger.info(f"Review {review_id} deleted successfully")
        return jsonify({"msg": "Review deleted successfully"}), 200
    except DoesNotExist:
        logger.error(f"Review {review_id} not found for deletion")
        return jsonify({"error": "Review not found"}), 404
    
@review_controller.route('/artwork/<artwork_id>', methods=['GET'])
def get_reviews(artwork_id):
    try:
        artwork = Artwork.objects(artwork_id=artwork_id)
        reviews = Review.objects(artwork=artwork)
        review_list = [review.serialize() for review in reviews]

        return jsonify(review_list), 200
    except DoesNotExist:
        return jsonify({"error": "Artwork not found"}), 404
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500