from mongoengine import Document, StringField, EmailField, DateTimeField, BooleanField, ListField, DictField, IntField
from datetime import datetime, timezone

class User(Document):
    user_id = StringField(required=True)
    user_name = StringField(required=True)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    email = EmailField(required=True)
    password_hash = StringField(required=True)
    profile_picture = StringField()  # URL to the user's profile picture
    bio = StringField()
    location = StringField()
    favorite_artworks = ListField()
    artwork_count = IntField(default=0)  
    reviews = ListField()
    review_count = IntField(default=0) 
    artwork_created = ListField()
    followers = ListField()  
    following = ListField()
    followers_count = IntField(default=0)
    following_count = IntField(default=0)
    pending_follow_requests = ListField(StringField(), default=list) 
    is_private = BooleanField(default=False)
    social_media_links = DictField()
    verification_status = BooleanField(default=False)
    preferences = DictField()
    joined_date = DateTimeField(default=datetime.now(timezone.utc))
    


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
            "artwork_count": self.artwork_count,
            "reviews": reviews,
            "review_count": self.review_count,
            "followers": self.followers,
            "following": self.following,
            "followers_count": self.followers_count,
            "following_count": self.following_count,
            "pending_follow_requests": [str(user_id) for user_id in self.pending_follow_requests],
            "is_private": self.is_private,
            "social_media_links": self.social_media_links,
            "verification_status": self.verification_status,
            "preferences": self.preferences,
            "joined_date": self.joined_date.isoformat(),
        }