import logging
from flask import request, jsonify, Blueprint
from mongoengine import NotUniqueError, ValidationError
from VirtuosoApp.backend.app.models.review import Review

review_controller = Blueprint('ReviewController', __name__)

# Configure the logger
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@review_controller.route('/review', methods=['POST'])
def create_review():
    data = request.get_json()

    # Required fields list
    required_fields = ['userID', 'artworkID', 'rating']

    # Check if all required fields are present
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    try:
        new_review = Review(
            userID=data['userID'],
            artworkID=data['artworkID'],
            rating=data['rating'],
            comment=data.get('comment')
        )
        new_review.save()
        logger.info("Review created successfully!")
        return jsonify({"message": "Review created successfully!"}), 201
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500

@review_controller.route('/review/<reviewID>', methods=['GET'])
def get_review(reviewID):
    review = Review.objects(reviewID=reviewID).first()
    if review:
        logger.info("Review found")
        return jsonify(review.serialize())  
    else:
        logger.error("Review not found")
        return jsonify({"error": "Review not found"}), 404

@review_controller.route('/review/<reviewID>', methods=['PUT'])
def update_review(reviewID):
    data = request.get_json()
    try:
        review = Review.objects(reviewID=reviewID).first()
        if review:
            for key, value in data.items():
                setattr(review, key, value)
            review.save()
            logger.info("Review updated successfully")
            return jsonify({"message": "Review updated successfully"})
        else:
            logger.error("Review not found")
            return jsonify({"error": "Review not found"}), 404
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500

@review_controller.route('/review/<reviewID>', methods=['DELETE'])
def delete_review(reviewID):
    review = Review.objects(reviewID=reviewID).first()
    if review:
        review.delete()
        logger.info("Review deleted successfully")
        return jsonify({"message": "Review deleted successfully"})
    else:
        logger.error("Review not found")
        return jsonify({"error": "Review not found"}), 404
