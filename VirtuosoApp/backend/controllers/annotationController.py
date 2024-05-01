# Import necessary modules and classes
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from mongoengine.errors import ValidationError, DoesNotExist
from models.annotationModel import Annotation
from models.userModel import User
import datetime
import uuid
from models.artworkModel import Artwork

# Create a Blueprint for the annotation controller
annotation_controller = Blueprint('annotation_controller', __name__)

# Define a route to create an annotation; requires JWT authentication
@annotation_controller.route('/annotation', methods=['POST'])
@jwt_required()
def create_annotation():
    user_id = get_jwt_identity()  # Extract the user ID from the JWT
    data = request.get_json()  # Get data from the JSON body of the request
    required_fields = ['artwork_id', 'message', 'x_coordinate', 'y_coordinate']  # Required data fields
    # Check for missing required fields
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400
    try:
        unique_annotation_id = str(uuid.uuid4())  # Generate a unique identifier for the annotation
        # Create a new annotation instance
        new_annotation = Annotation(
            user_id=user_id,
            annotation_id=unique_annotation_id,
            artwork_id=data['artwork_id'],
            message=data['message'],
            x_coordinate=data['x_coordinate'],
            y_coordinate=data['y_coordinate'],
        )
        new_annotation.save()  # Save the new annotation to the database
        artwork = Artwork.objects.get(artwork_id=data['artwork_id'])  # Retrieve the artwork by ID
        # Update the artwork with the user ID if not already tagged
        if user_id not in artwork.tags:
            Artwork.objects(artwork_id=data['artwork_id']).update_one(push__tags=user_id)

        # Return a success response with the new annotation ID
        return jsonify({"message": "Annotation created successfully!", "annotation_id": str(new_annotation.id)}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400  # Handle validation errors
    except Exception as e:
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500  # Handle other unexpected errors

# Define a route to retrieve a specific annotation; does not require authentication
@annotation_controller.route('/annotations/<annotation_id>', methods=['GET'])
def get_annotation(annotation_id):
    annotation = Annotation.objects(id=annotation_id).first()  # Get the annotation by ID
    if annotation:
        user = User.objects(user_id=annotation.user_id).first()  # Get the user who made the annotation
        if user:
            # Return the annotation details including user information
            annotation_data = {
                "annotation_id": str(annotation.id),
                "user_id": annotation.user_id,
                "user_name": user.user_name,
                "profile_picture": user.profile_picture
            }
            return jsonify(annotation_data)
        else:
            return jsonify({"error": "User not found"}), 404  # User not found error
    else:
        return jsonify({"error": "Annotation not found"}), 404  # Annotation not found error

# Define a route to delete a specific annotation; requires JWT authentication
@annotation_controller.route('/annotations/<annotation_id>', methods=['DELETE'])
@jwt_required()
def delete_annotation(annotation_id):
    user_id = get_jwt_identity()  # Extract the user ID from the JWT
    annotation = Annotation.objects(id=annotation_id, user_id=user_id).first()  # Get the annotation if it belongs to the user
    if annotation:
        annotation.delete()  # Delete the annotation
        return jsonify({"message": "Annotation deleted successfully"})
    else:
        return jsonify({"error": "Annotation not found or access denied"}), 404  # Handle not found or access denied errors

# Define a route to retrieve all annotations for a specific artwork; JWT authentication is optional
@annotation_controller.route('/artwork/<artwork_id>/annotations', methods=['GET'])
@jwt_required(optional=True)
def get_annotations_for_artwork(artwork_id):
    curruser = get_jwt_identity()  # Extract the current user ID from the JWT
    try:
        annotations = Annotation.objects(artwork_id=artwork_id)  # Get all annotations for the artwork
        annotations_list = []
        for annotation in annotations:
            user = User.objects(user_id=annotation.user_id).first()  # Get the user for each annotation
            if user:
                # Append each annotation's details to the list
                annotations_list.append({
                    'annotation_id': str(annotation.id),
                    'user_id': str(annotation.user_id),
                    'user_name': user.user_name,
                    'profile_picture': user.profile_picture,
                    'message': annotation.message,
                    'x_coordinate': annotation.x_coordinate,
                    'y_coordinate': annotation.y_coordinate,
                    "is_owner": annotation.user_id == curruser,  # Check if the current user is the owner
                    "use": curruser
                })
        return jsonify(annotations_list), 200  # Return the list of annotations
    except DoesNotExist:
        return jsonify({"error": "Artwork not found"}), 404  # Handle artwork not found error
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500  # Handle other unexpected errors
