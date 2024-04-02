import logging
from flask import Blueprint, request, jsonify
from models.annotationModel import Annotation
from mongoengine.errors import ValidationError, DoesNotExist

annotation_controller = Blueprint('annotation_controller', __name__)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@annotation_controller.route('/create_annotation', methods=['POST'])
def create_annotation():
    data = request.get_json()
    try:
        new_annotation = Annotation(**data).save()
        logger.info(f"Annotation created successfully with annotationID {new_annotation.annotationID}.")
        return jsonify({"message": "Annotation created successfully", "annotationID": new_annotation.annotationID}), 201
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({"error": "Data validation failed"}), 400
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@annotation_controller.route('/delete_annotation/<annotation_id>', methods=['DELETE'])
def delete_annotation(annotation_id):
    logger.info(f"Attempting to delete annotation with annotationID {annotation_id}")
    try:
        annotation = Annotation.objects(annotationID=annotation_id).first()
        if annotation:
            annotation.delete()
            logger.info(f"Annotation with annotationID {annotation_id} deleted successfully.")
            return jsonify({"message": "Annotation deleted successfully"}), 200
        else:
            logger.error(f"Annotation with annotationID {annotation_id} not found.")
            return jsonify({"error": "Annotation not found"}), 404
    except Exception as e:
        logger.error(f"Unexpected error while deleting annotation: {e}, Type: {type(e)}")
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500





