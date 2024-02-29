from mongoengine import Document, StringField, IntField, DateTimeField
from datetime import datetime


# Model for Reviews
class Reviews(Document):
    # Fields
    reviewID = StringField(required=True, unique=True)
    userID = StringField(required=True)
    artworkID = StringField(required=True)
    rating = IntField(min_value=1, max_value=5)
    comment = StringField()
    created_at = DateTimeField(default=datetime.now)

    meta = {
        'collection': 'reviews'
   
    #Serialize the Review object into a dictionary
    def serialize(self):
        return {
            'reviewID': self.reviewID,
            'userID': self.userID,
            'artworkID': self.artworkID,
            'rating': self.rating,
            'comment': self.comment,
            'createdAt': self.createdAt.isoformat()  # Convert to ISO format for datetime
        }
                            
    }
