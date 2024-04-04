# Importing necessary classes from mongoengine for database modeling
from mongoengine import Document, StringField, ListField, FloatField, ReferenceField
# Import the User model for referencing in the artist field
from .userModel import User  

# Define the Artwork class that inherits from Document, to model an artwork in a MongoDB collection
class Artwork(Document):
    # Unique identifier for each artwork, required and must be unique
    artwork_id = StringField(required=True, unique=True)
    # Title of the artwork, required
    title = StringField(required=True)
    # Name of the artist for the artwork, required
    artist_name = StringField(required=True) 
    # Reference to the User document of the artist, required
    artist = ReferenceField(User, required=True) 
    # Year the artwork was created, required
    year = StringField(required=True)
    # URL to the image of the artwork, required
    image_url = StringField(required=True)
    # List of tags associated with the artwork, each tag's max length is 50
    tags = ListField(StringField(max_length=50))
    # Description of the artwork, optional
    description = StringField()
    # Physical location of the artwork image, optional
    image_location = StringField()
    # Annotations related to the artwork, optional
    annotations = StringField()
    # Average rating for the artwork, calculated from reviews
    average_rating = FloatField()
    # Genre of the artwork, optional
    genre = StringField()

    # Method to serialize artwork data for easy JSON conversion or API responses
    def serialize(self):
        return {
            "artwork_id": self.artwork_id,
            "title": self.title,
            "artist_name": self.artist_name,
            "artist_id": str(self.artist.id),  # Convert artist ID to string
            "artist_username": str(self.artist.user_name),  # Convert artist username to string
            "year": self.year,
            "image_url": self.image_url,
            "tags": self.tags,
            "description": self.description,
            "image_location": self.image_location,
            "annotations": self.annotations,
            "average_rating": self.average_rating,
            "genre": self.genre
        }

    # Method to update the average rating based on reviews
    def update_average_rating(self):
        # Import Review model dynamically to avoid circular import issues
        from .reviewModel import Review
        # Query reviews related to this artwork
        reviews = Review.objects(artwork=self) 
        if reviews:
            # Calculate the total rating by summing up all review ratings
            total_rating = sum(review.rating for review in reviews)
            # Update the average rating for the artwork
            self.average_rating = total_rating / len(reviews)
            # Save the updated artwork document to the database
            self.save()
