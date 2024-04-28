# User Management

## Background 

The user model and endpoints contain additional abilities beyond what is deployed in the app. These were created earlier on in hopes that this project could continue, but certain attributes needed work beyond the limitations of 9 weeks. 

## Review Model

The User model represents a user made in the application via registration. Each user is uniquely identified and includes information about the user, and contains capabilites that could be used for future development, such as links to their other social media profiles (see VirtuosoApp/backend/models/userModel.py).

## Review Controller

## POST /create_user
- **Description**: Registers a new user in the system.
- **Authorization**: None 
- **Data body**: `user_name`, `email`, `password` (all required) 
  - Optional:  `first_name`, `last_name`, `profile_picture`, `bio`, `location`, `favorite_artworks`, `is_private`, and `social_media_links`. (see future work)
- **Returns**:
  - `201 Created`: Returns user ID and a message to verify account via email; the endpoint also sends the verification email. 
## PUT /update_user
- **Description**: updates the profile details of the currently logged-in user
- **Authorization**: token required
- **Data body** (JSON): `user_name`: (optional , new username)
- **Returns**:
  - `200 OK`: {"message": "User updated successfully"}

## PUT /update_password
- **Description**: updates the password for the currently logged-in user.
- **Authorization**: token required
- **Data body**: `old_password`, `new_password` (required) 
- **Returns**:
  - `200 OK`: {"message": "Password updated successfully"}
## PUT /update_bio
- **Description**: Updates the bio of the currently logged-in user.
- **Authorization**: token required
- **Data body** (JSON): `bio` (optional)
- **Response**:
  - `200 OK`: "User bio updated successfully for user ID {user_id}
## POST /login
- **Description**: authenticates a user and provides a JWT
- **Authorization**: None 
- **Data body** (JSON):
  - `user_name`: Username (required).
  - `password`: Password (required).
- **Returns**:
  - `200 OK`: Login successful messge and access token.
## DELETE /delete_user/{user_id}
- **Description**: Deletes a user object from database
- **Authorization**: token required
- **Data body**:
- **Response**:
  - `200 OK`: User deleted successfully.
## POST /authenticate_user
- **Description**: checks if user credentials are valid (already in the database) 
- **Authorization**: token required
- **Data body** (JSON):`email`, `password`
- **Response**:
  - `200 OK`: Authentication successful.
## GET /list_users
- **Description**: retrieves a list of all users in the database.
- **Authorization**: token required
- **Response**:
  - `200 OK`: Successfully fetched all users and returns list of user data in JSON format
## GET /details
- **Description**: Retrieves details of the currently logged-in user (such as bio and username)
- **Authorization**: Required (JWT Token).
- **Response**:
  - `200 OK`: Details fetched successfully and returns user details in JSON format
## POST /follow
- **Description**: Allows the current user to follow another user (not deployed)
- **Authorization**: token required
- **Data body** : `target_user_id` (id of the user to be followed) 
- **Response**:
  - `200 OK`: {"message": "Successfully followed the user"} or {"message": "Follow request sent"}

## POST /unfollow
- **Description**: Allows the current user to unfollow another user (not deployed, see future work) 
- **Authorization**: Required (JWT Token).
- **Data body** (JSON): `target_user_id`(id of user to be unfollowed)
- **Response**:
  - `200 OK`: {"message": "Successfully unfollowed the user"}
## GET /verify/{user_id}/{verification_token}
- **Description**: Verifies a user's email address.
- **Authorization**: None 
- **Parameters**: `user_id`, `verification_token` (via the user's email) 
- **Response**:
  - `200 OK`: User successfully verified.
## POST /request_password_reset
- **Description**: initiates a password reset process by sending an email to the user.
- **Authorization**: None 
- **Data body** : `email`
- **Response**:
  - `200 OK`: Password reset email sent successfully.
## PUT /reset_password/{reset_token}
- **Description**: resets the user's password via a token received by email.
- **Authorization**: None (reset token)
- **Parameters**:`reset_token`
- **Data body**:`password`
- **Response**:
  - `200 OK`: Password reset successfully.
## GET /getreviews
- **Description**: returns all reviews associated with currently-logged in user
- **Authorization**: token required 
- **Returns**: JSON formatted reviews, including information like `artwork_name`, `artwork_image_url`, and `artwork_id`
## GET /details/<string:user_name>
- **Description**: retrieves user details via username (not token or user id)
- **Authorization**: token required
- **Parameters**: `user_name` (of user to be fetched) 
- **Returns**: JSON formatted user details

# Future Work:

* Implement unfollowing/following other users (this was primarily not done since we did not have the capacity to create a feed) 
