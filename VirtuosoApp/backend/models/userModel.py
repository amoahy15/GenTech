from mongoengine import Document, StringField, EmailField, DateTimeField, BooleanField, ListField, DictField
from datetime import datetime,timezone

class Users(Document):
    userID = StringField(required=True)
    userName = StringField(required=True)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    email = EmailField(required=True)
    passwordHash = StringField(required=True) 
    profilePicture = StringField()
    bio = StringField()
    location = StringField()
    favoriteArtworks = ListField()
    reviews = ListField()
    friendsList = ListField()
    socialMediaLinks = DictField()
    verificationStatus = BooleanField(default=False)
    preferences = DictField()
    joinedDate = DateTimeField(required=True, default=datetime.now(timezone.utc).isoformat())


