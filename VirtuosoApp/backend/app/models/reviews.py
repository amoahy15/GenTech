from mongoengine import Document, StringField, IntField, DateTimeField
from datetime import datetime


# Model for Reviews
class Reviews(Document):
    # Fields
    reviewID = StringField(required=True, unique=True)
    user_id = StringField(required=True)
    artwork_id = StringField(required=True)
    rating = IntField(min_value=1, max_value=5)
    comment = StringField()
    created_at = DateTimeField(default=datetime.now)

    meta = {
        'collection': 'reviews'
   
    #Serialize the Review object into a dictionary
    def serialize(self):
        return {
            'reviewID': self.reviewID,
            'user_id': self.user_id,
            'artwork_id': self.artwork_id,
            'rating': self.rating,
            'comment': self.comment,
            'created_at': self.created_at.isoformat()  # Convert to ISO format for datetime
        }
                            
    }
