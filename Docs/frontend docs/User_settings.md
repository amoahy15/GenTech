# User management and settings

The relevant folders are going to be UserData and API. Profile.js is contained in the pages section since it is one of the main routes.

## Parent Pages

* Found in VirtuosoApp/frontend/src/components/UserData/registerLight.js
* Your first instance of user related interactions should be through login and registration.
  * `registerUser` will make an API call to /create_user and ensure the data filled in the form is used
  * `UseEffect` is utilized as our random profile picture selector.
    * We have configured an array of paintings that this algorithm chooses the user's profile picture from.
    * The random artwork is then called in `registerUser` as part of the data set to be pushed to the database.

![image](https://github.com/amoahy15/GenTech/assets/141963248/2b583b4b-2870-40b8-a66f-db1b45738d83)

* Upon entering details, the user will be prompted to look at their email

![image](https://github.com/amoahy15/GenTech/assets/141963248/1d4ce36b-8d4d-4e4f-ac0a-de0d2b213d3f)

* An email will be sent to the user's inbox
  
![image](https://github.com/amoahy15/GenTech/assets/141963248/67fa7e80-e6ff-4827-a663-dfddb08848b2)

* The link in the email will route the user to the login page
* Found in VirtuosoApp/frontend/src/components/UserData/loginPageLight.js
  * `loginUser` will make an API call to /login to authenticate the user
  * A unique token will also be generated in this step. This is used for authentication of any other user based interaction with the site.
  
![image](https://github.com/amoahy15/GenTech/assets/141963248/860b040e-6da9-4eed-959c-2498e72ad0ca)

* Upon successful login, you will be routed to your profile
* Found in VirtuosoApp/frontend/src/components/pages/Profile.js
  * `UseEffect` will make an API call to /details to retrieve the user data.
  * `handleUpdateBio` will make an API call to /update_bio to allow the user a bio change at will.
     *`handleBioChange` will interact with the form to confirm the user wants to make this change.
     * `handleSave` merged the functionality with `togglePopup` and `handleBioChange`.
  * `togglePopup` shows the pop up form for the user to change their bio.
  * `<post/>` calls the post component.
<img width="1440" alt="Screenshot 2024-04-30 at 1 08 02 PM" src="https://github.com/amoahy15/GenTech/assets/75340434/2aeeb57e-79e1-4fa9-b1d4-f89135c25569">

* The user may also view more information on themself in the advanced settings page
* Found in VirtuosoApp/frontend/src/components/UserData/AdvancedSettings.js
  * `UseEffect` will make an API call to /details to retrieve the user data.
  * `togglePopup` shows the pop up form for the user to confirm account deletion.
  * `<ProfilePic/>` calls the profile picture.
  * `<UpdatePassword/>` calls the component that handles this change.
  * `<UpdateUsername/>` calls the component that handles this change.
  * `<DeleteUser/>` calls the component that handles deletion.
 
<img width="1437" alt="Screenshot 2024-04-30 at 1 26 12 PM" src="https://github.com/amoahy15/GenTech/assets/75340434/b92b4142-410c-4134-8fee-fcda2969f096">
<img width="1440" alt="Screenshot 2024-04-30 at 1 26 59 PM" src="https://github.com/amoahy15/GenTech/assets/75340434/b1c272c7-1e83-4985-92e0-7c0c79a9659c">
<img width="1440" alt="Screenshot 2024-04-30 at 1 27 27 PM" src="https://github.com/amoahy15/GenTech/assets/75340434/34487cbf-2fd7-4984-bbcf-9467fb92ec98">

## Components

* Note: At this point all API calls will use the user's generated token as an authourization header for safety befores pulling or posting any data to the database.

- **Post:**
  * found in VirtuosoApp/frontend/src/components/API/Post.js
  * Overview: Authorized Users may create art. If a user wants access, they may request by emailing us [gentech.emory@gmail.com](mailto:gentech.emory@gmail.com) and providing us with their user ID (can be found in advanced settings) and a brief art portfolio. We reserve the rights to reject requests.
   * `handleFileChange` allows user to select a file from local machine.
   * `UploadImage` deals with the generation of an s3 link (s3 controller /upload). The image file chosen will be pushed to the database in the context of a url of the image stored in our s3 bucket.
   * `handleSubmit` makes an api call to /create_artwork which will verify that your user ID is authourized to make a post. This will also submit the s3 image url to the database rather than the entire image.
   * `togglePopup` shows and closes the pop up form where the user can specify description, artist, year, and title.
  
- **ProfilePic:**
  * found in VirtuosoApp/frontend/src/components/UserData/ProfilePic.js
  * Overview: Simple component that pulls the profile picture from the API endpoint /details so that it can be dynamically styled. Not much else to know here.
    
- **UpdatePassword:**
  * found in VirtuosoApp/frontend/src/components/API/UpdatePassword.js
  * Overview: The user must type their old password in correctly to change it. Upon completion, the user's password will have been updated for further use.
     * `handleOldPasswordChange` handles form submission of old password.
     * `handleNewPasswordChange` handles form submission of new password.
     * `handleSubmit` makes an API call to /update_password which requires the old password to authenticate the change.
     
    
- **UpdateUsername:**
  * found in VirtuosoApp/frontend/src/components/API/UpdateUsername.js
  * Overview: The user can update their username here. Usernames are not unique, but the user ID is and will remain the same regardless. Think of it like Steam's system.
    * `handleUsernameChange` handles form submission of typed requested username.
    * `handleSubmit` makes an API call to /update_user which uses the user ID as verification then makes the change.
     
- **DeleteUser:**
  * found in VirtuosoApp/frontend/src/components/API/DeleteUser.js
  * Overview: This component will delete every trace of the user from the database, so be sure that this is your final decision. You will lose your artworks and reviews.
    * `handleDelete` makes an API call to /delete_user which will delete all user variables. `useHistory` will push the user to the homepage after they have deleted their account.
   
- **OtherUsers:**
  * found in VirtuosoApp/frontend/src/components/UserData/OtherUsers.js
  * Overview: This component is essentially the profile page of other users you may find in `<Search/>` or through reviews and annotations.
     * `UseEffect` will make an API call to /details/(variable username) for the user you clicked on's information. This is done by using React `Link` on the usernames listed on a specific page. `Link` then allows us to pass the username clicked on as a parameter and variable for `UseEffect` to find the specific details.
     * We then call `<Row>` and `<Collections>` to display that user's reviewed art by passing in their username as the given tag.
