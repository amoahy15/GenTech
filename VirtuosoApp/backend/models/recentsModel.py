from mongoengine import Document, StringField, DateTimeField, ListField, ReferenceField
from datetime import datetime, timezone
import mongoengine

class Recents(Document):
    user_id = StringField(required=True)  
    artworks = ListField(
        ReferenceField('Artwork', reverse_delete_rule=mongoengine.PULL)
    )  
    viewed_dates = ListField(DateTimeField(default=datetime.now(timezone.utc))) 

    meta = {'collection': 'Recents'}  

    def serialize(self):
        return {
            "user_id": self.user_id,
            "artworks": [artwork.serialize() for artwork in self.artworks],
            "viewed_dates": [date.isoformat() for date in self.viewed_dates]
        }

