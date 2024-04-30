# Navigation

* This document provides an overview of the way the React components interact specifically in reference to the Navigation bar, which has components
that conditionally render depending on the user's status (signed in or not). Please refer to `App.js` to see how different navigation bars are conditionally rendered by the presence of a token or based on viewport size.

* Standard:

  <img width="1440" alt="Screenshot 2024-04-30 at 3 20 20 PM" src="https://github.com/amoahy15/GenTech/assets/75340434/2f2e8e99-d5f5-46c7-9015-137024b140c3">

* Mobile: <br>
  
  ![IMG_5335](https://github.com/amoahy15/GenTech/assets/75340434/473bf507-b8af-4216-b361-d8319ce7de3a)

## Components

- **Nav**
  * Found in VirtuosoApp/frontend/src/components/Navigation/Nav.js
  * Overview: The navbar for users that are not signed in (displays login and sign up buttons; `navbutton.js`). 
    
- **NavUsers**
  * Found in VirtuosoApp/frontend/src/components/Navigation/NavUsers.js
  * Overview: The navbar for users that are signed in (displays profile picture and links to profile page and settings).

- **Button**
  * Found in VirtuosoApp/frontend/src/components/Navigation/Button.js
  * Overview: A single button that takes in text and onClick as parameters. This is for ease of use since it already has preset styling.

- **NavItem, UserIcon**
  * Found in VirtuosoApp/frontend/src/components/Navigation/UserIcon.js
  * Overview: Toggles children components (DropDownMenu and UserDropdown) depending token presence.
    * `UserIcon` renders the user's profile picture as the dropdown toggle button.

- **DropDownMenu**
  * Found in VirtuosoApp/frontend/src/components/Navigation/DropDownMenu.js
  * Overview: This is the styling and setup of the dropdown after toggle.
    * `DropDownItems` passes in each element as a prop in the list. These are the toggled children.

- **UserDropDown**
  * Found in VirtuosoApp/frontend/src/components/Navigation/UserDropDown.js
  * Overview: This is the styling and setup of the dropdown after toggle. This dropdown replaces the login and register buttons when a token is present (.....so after login).
    * `DropDownItems` passes in each element as a prop in the list. These are the toggled children.
    * This dropdown has a multilayer effect through CSSTransition. The settings child when clicked will toggle another set of children.
   
- **Loading**
  * Found in VirtuosoApp/frontend/src/components/Navigation/Loading.js
  * Overview: simple loading animation that pops up between route renders.

- **Mobile Instances of Navbar**
  * These can be found in VirtuosoApp/frontend/src/components/Navigation under the same naming convention but with `Mobile` added.
  * There is not much to these except the buttons have been removed and all the routes and links are provided in dropdowns.
  

