# Nav Components

This document provides an overview of the way the React components interact specifically in reference to the Navigation bar, which has components
that conditionally render depending on the user's status (signed in or not)
Found in VirtuosoApp/frontend/src/components/Navigation

## Button 
A single button that takes in text and onClick as parameters. This button may be used elsewhere in the application

## DropDownMenu
Hardcoded links and titles to about page and terms of service page

## Nav

The navbar for users that are not signed in (displays login and sign up) 

## NavItem
Toggles children components (DropDownMenu) 

## NavUsers

Navbar for users that are signed in (displays profile picture and links to profile page and settings

## UserIcon 

Profile photo displayed in NavUsers
