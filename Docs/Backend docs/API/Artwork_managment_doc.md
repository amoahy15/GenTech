# Artwork Management

## Background 

The artwork model and endpoints contain additional abilities beyond what is deployed in the app. These were created earlier on in hopes that this project could continue, but certain attributes needed work beyond the limitations of 9 weeks. 

## Artwork Model

The Artwork model represents a piece of art stored in the application. Each artwork is uniquely identified and includes information about the title, artist, and metadata (see VirtuosoApp/backend/models/artworkModel.py. 
The model file contains a function updateRating, which updates the average rating of the artwork based on new or updated reviews.

## Artwork Controller

 *  POST /create_artwork:
    * Description: creates a new artwork object in the database
    * Data body: title, year, image_url, description (all required)
        * token required
    * Return: 201 Created, {"message": "Artwork created successfully!"}
 *  DELETE /delete_artwork/<artwork_id>:
    * Description: Deletes an artwork object in the database
    * Data body: token required
    * Return: 200, {"message": "Artwork deleted successfully"}
 *  PUT /update_artwork/<artwork_id>:
    * Description: updates an existing artwork's data
    * Data body: 
       * token required
    * Return: 200, {"message": "Artwork updated successfully"}
    * Notes: not used in the application, but future use for if we allow users to upload art with a verification process
 *  GET /get_artwork/<artwork_id>:
    * Description: retrieves information about a specific artwork
    * Data body: token optional
    * Return: 200, artwork data in JSON format
         *  returns all information found in model 
 *  GET /user_artwork:
    * Description: fetches all artwork associated with the authenticated user.
    * Data body: 
       * token required
    * Return: 200, artwork data in JSON format
    * Notes: not used in the application, but future use for if we allow users to upload art with a verification process
 *  GET /tags/<string:tag>:
    * Description: fetches all artworks under a specified tag name (eg 'painting')
    * Data body: 
       * token optional
    * Return: 200, artwork data in JSON format
    * Notes: not used in the application, but future use for if we allow users to upload art with a verification process
 *  GET /getartwork:
    * Description: fetches all artwork
    * Data body: 
    * Return: 200, artwork data in JSON format
