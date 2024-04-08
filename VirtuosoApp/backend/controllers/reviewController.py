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
    review_id = str(uuid.uuid4())  # Generate a UUID for the review ID
    logger.info(f"Attempting to create review {review_id} by user {user_id} for artwork {data.get('artwork_id')}")
    logging.getLogger().setLevel(logging.INFO)

    try:
        logger.debug("Fetching user and artwork from the database.")
        try:
            user = User.objects.get(user_id=user_id)
        except DoesNotExist:
            logger.error(f"User not found: {user_id}")
            return jsonify({"error": "User not found"}), 404

        try:
            artwork = Artwork.objects.get(artwork_id=data['artwork_id'])
        except DoesNotExist:
            logger.error(f"Artwork not found: {data.get('artwork_id')}")
            return jsonify({"error": "Artwork not found"}), 404
        logger.debug("User and artwork successfully fetched.")

        new_review = Review(
            review_id=review_id,  
            user=user,
            artwork=artwork,
            rating=data['rating'],
            comment=data.get('comment', '')
        )
        new_review.save()
        logger.info(f"Review {review_id} successfully created.")

        logger.debug("Updating user and artwork with new review.")
        user.update(push__reviews=new_review)
        artwork.update(push__reviews=new_review)
        artwork.reload() 
        logger.info("User and artwork updated with new review.")

        logger.debug("Updating average rating for the artwork.")
        artwork.update_average_rating()
        logger.info(f"Average rating updated for artwork {data.get('artwork_id')}.")

        return jsonify({"msg": "Review created successfully", "review": new_review.serialize()}), 201
    except ValidationError as e:
        logger.error(f"Validation error during review creation: {str(e)}")
        return jsonify({"error": str(e)}), 400
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
def get_annotations(artwork_id):
    try:
        artwork = Artwork.objects.get(artwork_id=artwork_id)
        reviews = Review.objects(artwork=artwork)
        review_list = [{
            'review_id': review.review_id,
            'user_id': str(review.user.id),
            'rating': review.rating,
            'comment': review.comment,
            'created_at': review.created_at.isoformat()
        } for review in reviews]

        return jsonify(review_list), 200
    except DoesNotExist:
        return jsonify({"error": "Artwork not found"}), 404
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500