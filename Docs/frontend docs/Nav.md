# Navigation

* This document provides an overview of the way the React components interact specifically in reference to the Navigation bar, which has components
that conditionally render depending on the user's status (signed in or not). Please refer to `App.js` to see how different navigation bars are conditionally rendered by the presence of a token or based on viewport size.

* Standard: <br>
  <img width="1440" alt="Screenshot 2024-04-30 at 3 20 20 PM" src="https://github.com/amoahy15/GenTech/assets/75340434/2f2e8e99-d5f5-46c7-9015-137024b140c3">

* Mobile: <br>
  
  ![IMG_5335](https://github.com/amoahy15/GenTech/assets/75340434/473bf507-b8af-4216-b361-d8319ce7de3a)



* Found in VirtuosoApp/frontend/src/components/Navigation

## Components

- **Button** 
 * Overview: A single button that takes in text and onClick as parameters. This is for ease of use since it already has preset styling.

- **DropDownMenu**
Hardcoded links and titles to about page and terms of service page

- **Nav**

The navbar for users that are not signed in (displays login and sign up) 

- **NavItem**
Toggles children components (DropDownMenu) 

- **NavUsers**

Navbar for users that are signed in (displays profile picture and links to profile page and settings

- **UserIcon** 

Profile photo displayed in NavUsers
