# README

<p align="center">
  <img src="https://github.com/amoahy15/GenTech/assets/141963248/2b7cbde2-badd-4f16-b18e-8d6cb1911169">
</p>
Welcome to the Virtuoso Documentation! 

Follow along at https://virtuoso-419315.web.app/

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
  - [Registration](#registration)
  - [Login](#login)
  - [Annotation](#annotation)
  - [Reviews](#reviews)
  - [User Settings](#settings)
  - [Finding Art](#finding-images-and-users)
 
## Technologies Used
* Flask
* MongoDB
* React
  
## Features
  ### Registration
   Our registration is a multi-step process that includes email verification
   first, navigate to https://virtuoso-419315.web.app/register
    ![image](https://github.com/amoahy15/GenTech/assets/141963248/2b583b4b-2870-40b8-a66f-db1b45738d83)
  Upon entering details, the user will be prompted to look at their email
    ![image](https://github.com/amoahy15/GenTech/assets/141963248/1d4ce36b-8d4d-4e4f-ac0a-de0d2b213d3f)
  An email will be sent to the user's inbox
    ![image](https://github.com/amoahy15/GenTech/assets/141963248/67fa7e80-e6ff-4827-a663-dfddb08848b2)
  The link in the email will route the user to the login page
  ### Login
  The user's details will be verified (see our [User API documentation](https://github.com/amoahy15/GenTech/blob/main/Docs/Backend%20docs/API/User_management_doc.md)
    ![image](https://github.com/amoahy15/GenTech/assets/141963248/860b040e-6da9-4eed-959c-2498e72ad0ca)

 ### Annotation
  * Annotations allow a user to select a specific part of an artwork and comment on it.
    ![image](https://github.com/amoahy15/GenTech/assets/141963248/7e0ddbc2-db35-469c-b2d1-e8d9a296699f)

  * Once users have submitted their annotation, anyone can hover over the annotation and the marker will be rendered on the image.
    ![image](https://github.com/amoahy15/GenTech/assets/141963248/6e1d197f-6ae8-4d85-9eee-d058b8d0f3ec)
### Reviews
  * We recognized that the art community wished to write reviews and rate works of art, so we allowed users to write a single review, including a star rating on a 5-point scale, and to comment on the overall work, with both being optional features for a user's review.
    ![image](https://github.com/amoahy15/GenTech/assets/141963248/2c610698-a00c-4042-8cb9-b114c57163f4)
### Profile
  * Your user profile is a place where you can track your own history and art pieces. This is also your landing page upon login. You can update your bio here, and create posts (if you are an authorized user). Your history of reviews and annotations will appear here along with your uploads.
    <img width="1440" alt="Screenshot 2024-04-30 at 1 08 02 PM" src="https://github.com/amoahy15/GenTech/assets/75340434/1277577d-467f-4054-9686-e359e1cdc85c">
    <img width="1440" alt="Screenshot 2024-04-30 at 1 08 51 PM" src="https://github.com/amoahy15/GenTech/assets/75340434/59c752a4-3bc5-4e58-9c69-6a4b10dad3a8">
    <img width="1440" alt="Screenshot 2024-04-30 at 1 09 24 PM" src="https://github.com/amoahy15/GenTech/assets/75340434/9c3e9df5-af15-4a3b-8cb4-c4b66c7f2140">



### Settings
  * Here you will find all the information about your account that you need. You can change your password and username here. The one thing that remains constant is your user ID, so hold onto it with all costs. You may also completely delete your account from our database here (We do not collect information).
<img width="1437" alt="Screenshot 2024-04-30 at 1 26 12 PM" src="https://github.com/amoahy15/GenTech/assets/75340434/412e0249-f07d-4c9d-a89b-8d84c6f2274c">
<img width="1440" alt="Screenshot 2024-04-30 at 1 26 59 PM" src="https://github.com/amoahy15/GenTech/assets/75340434/5b89340f-3ee2-4708-b36c-3b5b8d9b76ed">
<img width="1440" alt="Screenshot 2024-04-30 at 1 27 27 PM" src="https://github.com/amoahy15/GenTech/assets/75340434/c765f338-7381-4df6-9937-d9566b88a76a">


### Finding Images and Users
  There are two ways of finding artwork, the first being via the 'Gallery' or 'Collections' page. This page has capabilities to display a number of collections dependent on attributes such as period, artist, and media...
      ![image](https://github.com/amoahy15/GenTech/assets/141963248/866b3edc-4fb4-4ccc-a6ca-507436edfd84)

  ...and the second being the search page, which also displays links to user profiles.
      ![image](https://github.com/amoahy15/GenTech/assets/141963248/7cb2fc14-e148-4063-ba0c-a158ac48cba0)
