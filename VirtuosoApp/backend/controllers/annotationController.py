from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from mongoengine.errors import ValidationError, DoesNotExist
from models.annotationModel import Annotation
from models.userModel import User
import datetime

annotation_controller = Blueprint('annotation_controller', __name__)

@annotation_controller.route('/annotations', methods=['POST'])
@jwt_required()
def create_annotation():
    user_id = get_jwt_identity()  # Get the ID of the user making the request
    data = request.get_json()

    required_fields = ['artworkID', 'message', 'x_coordinate', 'y_coordinate']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    try:
        # Assuming 'createdAt' is automatically handled by the model or you want to specify it like in the review model
        new_annotation = Annotation(
            userID=user_id,
            artworkID=data['artworkID'],
            message=data['message'],
            x_coordinate=data['x_coordinate'],
            y_coordinate=data['y_coordinate'],
            createdAt=datetime.datetime.now()  # Adjust according to how you handle 'createdAt' in your model
        )
        new_annotation.save()

        # Example: If you keep track of annotations on the User model as well
        # User.objects(userID=user_id).update_one(push__annotations=new_annotation.id)

        return jsonify({"message": "Annotation created successfully!", "annotationID": str(new_annotation.id)}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500

@annotation_controller.route('/annotations/<annotation_id>', methods=['GET'])
def get_annotation(annotation_id):
    annotation = Annotation.objects(id=annotation_id).first()
    if annotation:
        # Assuming Annotation model has a method to serialize or you manually select fields to return
        annotation_data = {
            "annotationID": annotation.id,
            "userID": annotation.userID,
            # Include other fields as needed
        }
        return jsonify(annotation_data)
    else:
        return jsonify({"error": "Annotation not found"}), 404

@annotation_controller.route('/annotations/<annotation_id>', methods=['DELETE'])
@jwt_required()
def delete_annotation(annotation_id):
    user_id = get_jwt_identity()  # Get the ID of the user making the request
    annotation = Annotation.objects(id=annotation_id, userID=user_id).first()  # Ensure user owns the annotation
    if annotation:
        annotation.delete()
        return jsonify({"message": "Annotation deleted successfully"})
    else:
        return jsonify({"error": "Annotation not found or access denied"}), 404
