from mongoengine import Document, StringField, ListField, FloatField, ReferenceField
from .userModel import User  
from .reviewModel import Review

class Artwork(Document):
    artwork_id = StringField(required=True, unique=True)
    title = StringField(required=True)
    user_id = StringField(required=True) 
    # Reference to the User document of the artist, required
    artist = StringField(required=True) 
    artist_name = StringField(required=True)
    year = StringField(required=True)
    # URL to the image of the artwork, required
    image_url = StringField(required=True)
    # List of tags associated with the artwork, each tag's max length is 50
    tags = ListField(StringField(max_length=50))
    # Description of the artwork, optional
    description = StringField()
    image_location = StringField()
    annotations = ListField(StringField()) #optional
    average_rating = FloatField()
    genre = StringField()
    reviews = ListField(ReferenceField(Review))


    def update_average_rating(self):
        from .reviewModel import Review
        reviews = Review.objects(artwork=self) 
        if reviews:
            total_rating = sum(review.rating for review in reviews)
            self.average_rating = total_rating / len(reviews)
            self.save()
    
    def serialize(self):
        return {
            "artwork_id": self.artwork_id,
            "title": self.title,
            "user_id": self.user_id,
            "artist": self.artist,
            "artist_name": self.artist_name,
            "year": self.year,
            "image_url": self.image_url,
            "tags": self.tags,
            "description": self.description if self.description else "",
            "image_location": self.image_location if self.image_location else "",
            "annotations": self.annotations,
            "average_rating": float(self.average_rating) if self.average_rating else None,
            "genre": self.genre if self.genre else "",
            "reviews": [review.serialize() for review in self.reviews] if self.reviews else []
        }
