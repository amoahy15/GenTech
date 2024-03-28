from mongoengine import Document, StringField, EmailField, DateTimeField, BooleanField, ListField, DictField
from datetime import datetime, timezone

class User(Document):
    user_id = StringField(required=True)
    user_name = StringField(required=True)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    email = EmailField(required=True)
    password_hash = StringField(required=True) 
    profile_picture = StringField()
    bio = StringField()
    location = StringField()
    favorite_artworks = ListField()
    reviews = ListField()
    friends_list = ListField()
    social_media_links = DictField()
    verification_status = BooleanField(default=False)
    preferences = DictField()
    joined_date = DateTimeField(default=datetime.now(timezone.utc))

    def serialize(self):
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
            "reviews": self.reviews,
            "friends_list": self.friends_list,
            "social_media_links": self.social_media_links,
            "verification_status": self.verification_status,
            "preferences": self.preferences,
            "joined_date": self.joined_date.isoformat()
        }
