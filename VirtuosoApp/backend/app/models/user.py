import bcrypt

class User():
    //Creates User
    def __init__(self, userID, username, email, password, profilePicture, bio, location, joinedDate,  favoriteArtworks=None, reviews=None, friendsList=None, socialMediaLinks=None, verificationStatus=False, preferences=None):
                self.userID = userID
                self.username = username
                self.email = email
                self.set_password(password)
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
     //creates password uses bcrypt
     def set_password(self, password):
                if not password:
                    raise ValueError("Password cannot be empty")
                salt = bcrypt.gensalt()
                self.passwordHash = bcrypt.hashpw(password.encode('utf-8'), salt)
   //verify password 
     def verify_password(self, provided_password):
                if not provided_password:
                    return False
                return bcrypt.checkpw(provided_password.encode('utf-8'), self.passwordHash)
   //Allow users to update profile          
     def update_profile(self, username=None, email=None, password=None, bio=None, location=None, profilePicture=None, favoriteArtworks=None, reviews=None, socialMediaLinks=None, verificationStatus=None, preferences=None):
                    if username is not None:
                       self.username = username
                    if email is not None:
                       self.email = email
                    if password is not None:
                       self.set_password(password)
                    if bio is not None:
                       self.bio = bio
                    if location is not None:
                        self.location = location
                    if profilePicture is not None:
                        self.profilePicture = profilePicture
                    if favoriteArtworks is not None:
                        self.favoriteArtworks = favoriteArtworks
                    if reviews is not None:
                        self.reviews = reviews
                    if socialMediaLinks is not None:
                        self.socialMediaLinks = socialMediaLinks
                    if verificationStatus is not None:
                        self.verificationStatus = verificationStatus
                    if preferences is not None:
                        self.preferences = preferences

      //allows users to delete account
      def delete_account(self):
                self.username = None
                self.email = None
                self.passwordHash = None
                self.profilePicture = None
                self.bio = None
                self.location = None
                self.favoriteArtworks = []
                self.reviews = []
                self.friendsList = []
                self.socialMediaLinks = {}
                self.verificationStatus = False
                self.preferences = {}
                 self.deleted = True
       //allows users to block an account
        def block_user(self, user_to_block):
                if user_to_block.userID in self.friendsList:
                    self.friendsList.remove(user_to_block.userID)
                if 'blocked_users' not in self.preferences:
                    self.preferences['blocked_users'] = []
                if user_to_block.userID not in self.preferences['blocked_users']:
                    self.preferences['blocked_users'].append(user_to_block.userID)

       //retrival of user data
        def retrieve_profile_info(self):
                profile_info = {
                    "userID": self.userID,
                    "username": self.username,
                    "email": self.email,
                    "profilePicture": self.profilePicture,
                    "bio": self.bio,
                    "location": self.location,
                    "favoriteArtworks": self.favoriteArtworks,
                    "reviews": self.reviews,
                    "friendsList": self.friendsList,
                    "socialMediaLinks": self.socialMediaLinks,
                    "verificationStatus": self.verificationStatus,
                    "preferences": self.preferences,
                    "joinedDate": self.joinedDate
                }
                return profile_info
