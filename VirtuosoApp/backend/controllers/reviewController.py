import datetime
from flask import request, jsonify, Blueprint, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from mongoengine import ValidationError, NotUniqueError, DoesNotExist
from models.reviewModel import Review
from models.artworkModel import Artwork, updateRating
from models.userModel import User
import logging
import uuid

# Setup a Flask Blueprint for review-related routes.
review_controller = Blueprint('review_controller', __name__)

@review_controller.route('/create_review', methods=['POST'])
@jwt_required()
def create_review():
    user_id = get_jwt_identity()  # Extract user ID from JWT
    data = request.get_json()  # Get JSON data from request
    # Log attempt to create review.
    current_app.logger.info(f"Attempting to create review by user {user_id} for artwork {data.get('artwork_id')}")
    try:
        user = User.objects.get(user_id=user_id)  # Retrieve user from database
        artwork = Artwork.objects.get(artwork_id=data['artwork_id'])  # Retrieve artwork from database
        
        # Create a new review instance.
        new_review = Review(
            user_id=user,
            artwork_id=artwork,
            rating=data['rating'],
            comment=data.get('comment', ''),
        )

        # Add user to artwork tags if not already present.
        if user_id not in artwork.tags:
            Artwork.objects(artwork_id=data['artwork_id']).update_one(push__tags=user_id)

        new_review.save()  # Save the review to the database.
        updateRating(data['artwork_id'])  # Update the artwork rating.
        # Log success and return success message.
        current_app.logger.info("Review successfully created.")
        return jsonify({"message": "Review created successfully"}), 201

    except ValidationError as e:  # Handle validation errors.
        current_app.logger.error(f"Validation error during review creation: {str(e)}")
        return jsonify({"error": str(e)}), 400
    except NotUniqueError as e:  # Handle uniqueness errors.
        current_app.logger.error("Duplicate review not allowed")
        return jsonify({"error": "Review already exists"}), 409
    except DoesNotExist as e:  # Handle non-existence errors.
        current_app.logger.error("Artwork or user not found")
        return jsonify({"error": "Artwork or user not found", "details": str(e)}), 404

@review_controller.route('/reviews/<string:review_id>', methods=['GET'])
@jwt_required()
def get_review(review_id):
    try:
        review = Review.objects.get(review_id=review_id)  # Retrieve the review.
        return jsonify(review.serialize()), 200  # Serialize and return the review.
    except DoesNotExist:  # Handle non-existence errors.
        current_app.logger.error(f"Review {review_id} not found")
        return jsonify({"error": "Review not found"}), 404
    except AttributeError as e:  # Handle attribute errors.
        current_app.logger.error(f"Attribute error: {str(e)}")
        return jsonify({"error": str(e)}), 500
    except Exception as e:  # Handle unexpected errors.
        current_app.logger.error(f"Unexpected error: {str(e)}")
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

@review_controller.route('/reviews/<string:review_id>', methods=['PUT'])
@jwt_required()  # TODO: Implement detailed user authentication.
def update_review(review_id):
    data = request.get_json()  # Get JSON data from request.
    try:
        Review.objects(review_id=review_id).update_one(**data)  # Update review fields.
        review = Review.objects.get(review_id=review_id)  # Retrieve updated review.
        updateRating(review.artwork_id.artwork_id)  # Update artwork rating.
        return jsonify({"message": "Review updated successfully", "review": review.serialize()}), 200
    except ValidationError as e:  # Handle validation errors.
        return jsonify({"error": str(e)}), 400
    except DoesNotExist:  # Handle non-existence errors.
        return jsonify({"error": "Review not found"}), 404

@review_controller.route('/reviews/<string:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    user_id = get_jwt_identity()  # Extract user ID from JWT.
    try:
        user = User.objects.get(user_id=user_id)  # Retrieve user from database.
        review = Review.objects.get(review_id=review_id, user_id=user)  # Retrieve review to be deleted.
        review.delete()  # Delete the review.
        updateRating(review.artwork_id.artwork_id)  # Update artwork rating.
        return jsonify({"message": "Review deleted successfully"}), 200
    except DoesNotExist:  # Handle non-existence errors.
        return jsonify({"error": "Review not found or access denied"}), 404
    except Exception as e:  # Handle unexpected errors.
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

@review_controller.route('/artwork/<string:artwork_id>/reviews', methods=['GET'])
@jwt_required()
def get_reviews_for_artwork(artwork_id):
    user_id = get_jwt_identity()  # Extract user ID from JWT.
    try:
        curruser = User.objects.get(user_id=user_id)  # Retrieve current user from database.
        artwork = Artwork.objects.get(artwork_id=artwork_id)  # Retrieve artwork from database.

        # Get all reviews for the artwork, sorted by like count.
        reviews = Review.objects(artwork_id=artwork).order_by('-like_count')
        user_review = reviews.filter(user_id=curruser).first()  # Get current user's review if exists.

        reviews_list = []
        for review in reviews:  # Create a list of reviews with additional details.
            user = review.user_id
            likedbyuser = curruser in review.liked_by
            likes = [u.serialize() for u in review.liked_by]
            reviews_list.append({
                'review_id': str(review.id),
                'user_id': str(user.id),
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

        # Return list of reviews along with user review status.
        return jsonify({
            "reviews": reviews_list,
            "user_has_reviewed": bool(user_review),
            "user_review_id": str(user_review.id) if user_review else None
        }), 200

    except ValidationError as e:  # Handle validation errors.
        return jsonify({"error": "Invalid data format", "details": str(e)}), 400
    except DoesNotExist:  # Handle non-existence errors.
        return jsonify({"error": "Artwork not found"}), 404
    except Exception as e:  # Handle unexpected errors.
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

@review_controller.route('/<string:review_id>/like', methods=['POST'])
@jwt_required()
def toggle_likes(review_id):  # Both like and unlike use this function.
    user_id = get_jwt_identity()  # Extract user ID from JWT.
    try:
        review = Review.objects.get(review_id=review_id)  # Retrieve the review.
        user = User.objects.get(user_id=user_id)  # Retrieve the user.
        if user in review.liked_by:  # Check if the user has already liked the review.
            review.update(pull__liked_by=user)  # Remove user from liked_by list.
            review.update(dec__like_count=1)  # Decrement like count.
            liked_status = False
        else:
            review.update(push__liked_by=user)  # Add user to liked_by list.
            review.update(inc__like_count=1)  # Increment like count.
            liked_status = True
        review.reload()  # Reload the review to reflect updates.
        users = [u.serialize() for u in review.liked_by]  # Serialize liked_by users.
        return jsonify({"message": "Like or unlike succesful", "likedby": users, "like_count": review.like_count, "liked_status": liked_status}), 200
    except DoesNotExist:  # Handle non-existence errors.
        return jsonify({"error": "Review not found"}), 404
    except Exception as e:  # Handle unexpected errors.
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500
