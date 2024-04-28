# Annotation Management

## Background 

The annotation model and endpoints contain additional abilities beyond what is deployed in the app. These were created earlier on in hopes that this project could continue, but certain attributes needed work beyond the limitations of 9 weeks. 

## Annotation Model

The annotation model represents an annotation made in the application via the review page ([read more](https://github.com/amoahy15/GenTech/blob/main/Docs/General_Info.md). 
Each annotation is uniquely identified and includes the coordinates of the image, as well as information about the corresponding comment. 

## Annotatoin Controller

## POST /annotation
- **Description**: Creates a new annotation on an existing artwork
- **Authorization**: token required
- **Data body**: `artwork_id`, `message`, `x_coordinate`, `y_coordinate`(all required)
- **Returns**:`201`: Returns the ID of the newly created annotation and a success message.

## GET /annotations/<annotation_id>
- **Description**: Retrieves details about a specific annotation
- **Authorization**: None
- **Parameters**: `annotation_id` (required)
- **Returns**:
  - `200`: Returns details of the annotation including user details (`user_id`, 'user_name`, and `profile_picture`

## DELETE /annotations/<annotation_id>
- **Description**: Deletes a specific annotation
- **Authorization**: token required
- **Parameters**: `annotation_id`
- **Returns**:
  - `200`: Annotation deleted successfully.

## GET /artwork/<artwork_id>/annotations
- **Description**: retrieves all annotations for a specific artwork
- **Authorization**: Optional JWT token (for identifying if the current user owns an annotation)
- **Parameters**:`artwork_id`
- **Returns**:
  - `200`: List of all annotations associated with the artwork, with each annotation including user details and ownership status (`is_owner`)

