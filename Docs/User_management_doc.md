= SPEC-1: User Management Documentation
:sectnums:
:toc:

== Background

The VirtuosoApp requires a robust user management system to facilitate user authentication, profile management, and social features like following other users. The system is designed to support a rich user experience in an art-centric social platform.

== Requirements

* Must support user creation, authentication, and profile updates.
* Must allow users to follow and unfollow other users.
* Should handle password encryption securely.
* Should provide JWT tokens for session management.
* Must enable CRUD operations on user data.

== Method

=== Architecture Design

image::userComponentDiagram.png[User Component Diagram,align="center"]

=== Database Schema

[plantuml, schema-user, png]
----
entity "User" as User {
  *user_id : string <<generated>>
  --
  *user_name : string
  *email : email
  *password_hash : string
  --
  first_name : string
  last_name : string
  profile_picture : url
  bio : string
  location : string
  favorite_artworks : array[string]
  reviews : array[string]
  artwork_created : array[string]
  followers : array[string]
  following : array[string]
  pending_follow_requests : array[string]
  is_private : boolean = false
  social_media_links : dictionary
  verification_status : boolean = false
  preferences : dictionary
  joined_date : datetime
}
----

=== Algorithms

* Password Encryption: Utilizes `bcrypt` for hashing passwords before storage.
* Authentication: Implements JWT token generation for session management after successful authentication.
* Follow/Unfollow Logic: Manages user relationships and privacy settings to control follow requests.

== Implementation

1. Initialization of Flask application and necessary extensions like Flask-JWT and Flask-Bcrypt.
2. Definition of User model in `userModel.py` with fields corresponding to the database schema.
3. Implementation of user-related operations in `userController.py`, including routes for user creation, authentication, profile updates, and follow/unfollow functionalities.

== Sending Requests

To interact with the user management system, one can use Postman to send HTTP requests. Here's how:

1. **User Creation (Signup):** 
   - Method: POST
   - URL: `http://<your_server>/api/users/signup`
   - Body: JSON with `user_name`, `email`, `password`, and other optional fields.
   - Example:
     ```
     {
       "user_name": "john_doe",
       "email": "john@example.com",
       "password": "your_secure_password"
     }
     ```

2. **User Login (Authentication):**
   - Method: POST
   - URL: `http://<your_server>/api/users/login`
   - Body: JSON with `email` and `password`.
   - This request returns a JWT token upon successful authentication.
   - Example:
     ```
     {
       "email": "john@example.com",
       "password": "your_secure_password"
     }
     ```

3. **Accessing Protected Routes:**
   - Use the JWT token received from the login as a Bearer Token in the Authorization header.
   - Example:
     - Header: `Authorization: Bearer <your_jwt_token>`
   - This token is required to access routes that require authentication, such as profile updates or following another user.

== Milestones

1. Setup of Flask application with JWT and Bcrypt extensions.
2. Completion of the User model.
3. Implementation and testing of all user-related routes.

== Gathering Results

* Unit tests for each user operation to validate functionality and security.
* Performance testing to ensure scalability with an increasing number of users.
