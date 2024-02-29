from flask import request, jsonify, Blueprint
from mongoengine import NotUniqueError, ValidationError
from VirtuosoApp.backend.app.models.reviews import Reviews

review_controller = Blueprint('ReviewController', __name__)

@review_controller.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()

    # Required fields list
    required_fields = ['user_id', 'artwork_id', 'rating']

    # Check if all required fields are present
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    try:
        new_review = Review(
            user_id=data['user_id'],
            artwork_id=data['artwork_id'],
            rating=data['rating'],
            comment=data.get('comment')
        )
        new_review.save()
        return jsonify({"message": "Review created successfully!"}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500

@review_controller.route('/reviews/<review_id>', methods=['GET'])
def get_review(review_id):
    review = Review.objects(reviewID=review_id).first()
    if review:
        return jsonify(review.serialize())  
    else:
        return jsonify({"error": "Review not found"}), 404

@review_controller.route('/reviews/<review_id>', methods=['PUT'])
def update_review(review_id):
    data = request.get_json()
    try:
        review = Review.objects(reviewID=review_id).first()
        if review:
            for key, value in data.items():
                setattr(review, key, value)
            review.save()
            return jsonify({"message": "Review updated successfully"})
        else:
            return jsonify({"error": "Review not found"}), 404
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500

@review_controller.route('/reviews/<review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.objects(reviewID=review_id).first()
    if review:
        review.delete()
        return jsonify({"message": "Review deleted successfully"})
    else:
        return jsonify({"error": "Review not found"}), 404
