# Import necessary classes from MongoEngine to define document fields
from mongoengine import Document, FloatField, StringField, DateTimeField, ReferenceField
# Import datetime for handling date and time fields
from datetime import datetime
# Import the User model for creating a reference in the Review document
from .userModel import User
# Import uuid to generate unique identifiers
import uuid

# Define the Review model as a MongoDB document
class Review(Document):
    # Unique identifier for the review, generated using uuid
    review_id = StringField(primary_key=True, default=lambda: str(uuid.uuid4()))
    # Reference to an Artwork document; requires an Artwork document to exist
    artwork = ReferenceField('Artwork', required=True)
    # Reference to a User document; requires a User document to exist
    user = ReferenceField('User', required=True)
    # Numeric rating for the artwork, must be between 0 and 5
    rating = FloatField(required=True, min_value=0, max_value=5)
    # Optional text comment for the review
    comment = StringField()
    # Timestamp when the review was created, defaults to the current time
    created_at = DateTimeField(default=datetime.now)
    
    # Method to serialize the review document into a dictionary for easier manipulation or JSON conversion
    def serialize(self):
        return {
            "review_id": self.review_id,
            # Convert the user ID to string in case it's in a non-string format (e.g., ObjectId)
            "user_id": str(self.user.id),
            # Display name of the user (assuming user_name attribute holds this information)
            "user_displayName": self.user.user_name,
            # Convert the artwork ID to string
            "artwork_id": str(self.artwork.artwork_id),
            "rating": self.rating,
            "comment": self.comment,
            # Format the created_at datetime to ISO 8601 string
            "created_at": self.created_at.isoformat()
        }