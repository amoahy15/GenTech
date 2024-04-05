# Import necessary classes from mongoengine for database modeling
from mongoengine import Document, StringField, EmailField, DateTimeField, BooleanField, ListField, DictField
# Import datetime module for date and time operations
from datetime import datetime, timezone

# Define a User class that inherits from Document, to model a user in a MongoDB collection
class User(Document):
    # User's unique identifier, required for every user document
    user_id = StringField(required=True)
    # Username for the user, required
    user_name = StringField(required=True)
    # User's first name, optional, with a maximum length of 50 characters
    first_name = StringField(max_length=50)
    # User's last name, optional, with a maximum length of 50 characters
    last_name = StringField(max_length=50)
    # User's email, required and must be a valid email format
    email = EmailField(required=True)
    # Hashed password for security, required
    password_hash = StringField(required=True)
    # URL to the user's profile picture, optional
    profile_picture = StringField()
    # Short biography of the user, optional
    bio = StringField()
    # User's location, optional
    location = StringField()
    # List of IDs for the user's favorite artworks, can be empty
    favorite_artworks = ListField()
    # List of reviews made by the user, can be empty
    reviews = ListField()
    # List of artwork ids made by the user, can be empty
    artwork_created = ListField()
    # List of user IDs for the user's followers
    followers = ListField()  
    # List of user IDs that the user is following
    following = ListField()  
    # List of pending follow requests, uses StringField inside ListField for IDs
    pending_follow_requests = ListField(StringField(), default=list) 
    # Boolean flag to indicate if the user's page is private, defaults to False
    is_private = BooleanField(default=False)  
    # Dictionary of social media links, keys are platforms and values are URLs
    social_media_links = DictField()
    # Boolean flag to indicate if the user's account is verified, defaults to False
    verification_status = BooleanField(default=False)
    # Dictionary to store user preferences, can be used for customization
    preferences = DictField()
    # Date and time when the user joined, defaults to the current UTC time
    joined_date = DateTimeField(default=datetime.now(timezone.utc))

    # Method to serialize user data for easy JSON conversion or API responses
    def serialize(self):
        reviews = [review.serialize() for review in self.reviews]
        return {
            "user_id": self.user_id,
            "user_name": self.user_name,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "profile_picture": self.profile_picture,
            "bio": self.bio,
            "location": self.location,
            "favorite_artworks": self.favorite_artworks,
            "artwork_created" : self.artwork_created,
            "reviews": reviews,
            "followers": self.followers,
            "following": self.following,
            "pending_follow_requests": [str(user_id) for user_id in self.pending_follow_requests],
            "is_private": self.is_private,
            "social_media_links": self.social_media_links,
            "verification_status": self.verification_status,
            "preferences": self.preferences,
            "joined_date": self.joined_date.isoformat()
        }

