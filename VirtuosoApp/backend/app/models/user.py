class User():
    def __init__(self, userID, username, email, passwordHash, profilePicture, bio, location, joinedDate,  favoriteArtworks=None, reviews=None, friendsList=None, socialMediaLinks=None, verificationStatus=False, preferences=None):
                self.userID = userID
                self.username = username
                self.email = email
                self.passwordHash = passwordHash
                self.profilePicture = profilePicture
                self.bio = bio
                self.location = location
                self.favoriteArtworks = favoriteArtworks if favoriteArtworks is not None else []
                self.reviews = reviews if reviews is not None else []
                self.friendsList = friendsList if friendsList is not None else []
                self.socialMediaLinks = socialMediaLinks if socialMediaLinks is not None else {}
                self.verificationStatus = verificationStatus
                self.preferences = preferences if preferences is not None else {}
                self.joinedDate = joinedDate
