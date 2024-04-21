import datetime
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
        user = User.objects.get(user_id=user_id)
        artwork = Artwork.objects.get(artwork_id=data['artwork_id'])
        
        new_review = Review(
            review_id=review_id,
            user_id=user,
            artwork_id=artwork,
            rating=data['rating'],
            comment=data.get('comment', ''),
        )
        new_review.save()
        # had to remove the append and update average
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
    user_id = get_jwt_identity()
    try:
        user = User.objects.get(user_id=user_id)
        review = Review.objects.get(review_id=review_id, user_id=user)
        review.delete()
        return jsonify({"message": "Review deleted successfully"}), 200
    except DoesNotExist:
        return jsonify({"error": "Review not found or access denied"}), 404
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500
    
@review_controller.route('/artwork/<string:artwork_id>/reviews', methods=['GET'])
@jwt_required()
def get_reviews_for_artwork(artwork_id):
    user_id = get_jwt_identity()
    curruser= User.objects(user_id=user_id).first()
    try:
        artwork = Artwork.objects(artwork_id=artwork_id).first()
        if not artwork:
            return jsonify({"error": "Artwork not found"}), 404

        reviews = Review.objects(artwork_id=artwork)
        reviews_list = []

        for review in reviews:
            user = User.objects(id=review.user_id.id).first()
            likedbyuser = curruser in review.liked_by

            likes = [u.serialize() for u in review.liked_by]
            if user:
                reviews_list.append({
                    'review_id': str(review.id),
                    'user_id': str(review.user_id),
                    'user_name': user.user_name,
                    'profile_picture': user.profile_picture,
                    'is_owner': user == curruser,
                    'rating': review.rating,
                    'comment': review.comment,
                    'created_at': review.created_at.isoformat() if review.created_at else None,
                    'liked_status': likedbyuser,
                    "likes": likes,
                    "like_count": review.like_count
                })
        return jsonify(reviews_list), 200
    except ValidationError as e:
        return jsonify({"error": "Invalid data format", "details": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500
@review_controller.route('/<string:review_id>/like', methods=['POST'])
@jwt_required()
def toggle_likes(review_id): #both like and unlike use this 
    user_id = get_jwt_identity()
    try:
        review = Review.objects.get(review_id=review_id)
        user = User.objects.get(user_id=user_id)
        if user in review.liked_by: #can not like 2x
            review.update(pull__liked_by=user)
            review.update(dec__like_count=1)
            liked_status = False
        else:
            review.update(push__liked_by=user)
            review.update(inc__like_count=1)
            liked_status = True
        review.reload()
        users = [u.serialize() for u in review.liked_by]
        return jsonify({"message": "Like or unlike succesful", "likedby": users, "like_count": review.like_count, "liked_status": liked_status}), 200
    except DoesNotExist:
        return jsonify({"error": "Review not found"}), 404
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500
