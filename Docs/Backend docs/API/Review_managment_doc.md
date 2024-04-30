# Review Management

## Background 

The review model and endpoints contain additional abilities beyond what is deployed in the app. These were created earlier on in hopes that this project could continue, but certain attributes needed work beyond the limitations of 9 weeks. 

## Review Model

The Review model represents review made in the application. Each artwork is uniquely identified and includes information about the review, such as its content and number of likes, and a reference to the user object that created it and the artwork object it describes, and metadata (see VirtuosoApp/backend/models/reviewModel.py. 

Note that ratings are stored as a float; this allows for future changes to the way users review art (eg half-star ratings)

## Review Controller

 *  POST /create_review:
    * Description: creates a new review object in the database
    * Data body: artwork_id, rating, and optional comment.
    * Auth: token required
    * Return: 201 Created, {"message": "Review created successfully"}
 *  GET /reviews/{review_id}
    * Description: retrieves a specific review by its id.
    * Data body:
    * Auth: token required
    * Return: 200, review in JSON format
 *  PUT /reviews/{review_id}
    * Description: updates an existing review identified by its id
    * Data body: fields to be updated (rating and comment)
    * Auth: token required
    * Return: 200, updated review in JSON format
 *  DELETE /reviews/{review_id}
    * Description: deletes an existing review identified by its id
    * Data body: 
    * Auth: token required
    * Return: 200, {"message": "Review deleted successfully"}
 *  GET /artwork/{artwork_id}/reviews
    * Description: retrieves all existing reviews corresponding to an artwork object
    * Data body: 
    * Auth: token required
    * Return: 200, JSON formatted list of reviews, including a boolean variable "user_has_reviewed" (limiting a user to one review), and the user's reviewid (in order for them to use PUT /reviews/{review_id}) alongside the review 
 *  POST /{review_id}/like
    * Description: toggles the like status of a review relevant to the current user
    * Data body: 
    * Auth: token required
    * Return: 200, {"message": "Review deleted successfully"}
  ## Future Work: 
  * more descriptive error messages 
