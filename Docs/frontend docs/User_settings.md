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
<img width="1440" alt="Screenshot 2024-04-30 at 1 08 02 PM" src="https://github.com/amoahy15/GenTech/assets/75340434/2aeeb57e-79e1-4fa9-b1d4-f89135c25569">



