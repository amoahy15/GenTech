# Review Components

This document provides an overview of the way the React components interact specifically in reference to the 'Review' Page (for instance, https://virtuoso-419315.web.app/reviews/6856b9e4-f392-463d-b871-c3e79b234638)

## Parent Page
* Overview: ReviewPage takes in props (the artwork id) and fetches corresponding information
  ![image](https://github.com/amoahy15/GenTech/assets/141963248/24cbcdfb-ce7e-43fe-9eac-395042c490a9)

* Found in VirtuosoApp/frontend/src/components/Pages/ReviewPage.js
* `useEffect` ensures the user is logged in before viewing the page
* `fetchReviews` sets the corresponding reviews
* `deleteReview` is passed down to children components to allow user to delete their review
* `handleLike` allows the user to like a review
* `handleReviewSubmitted` refreshes the reviews upon the child's submission
## Components
* found in VirtuosoApp/frontend/src/components
- **FetchAnnotate:** 
  * Overview: Displays the entire array of annotation comments
  * `handleAddAnnotationClick` toggles the popup when a user clicks "+"
    ![image](https://github.com/amoahy15/GenTech/assets/141963248/419e6425-87f9-4d61-ba00-7f8ce4cdba42)
  * `fetchAnnotations` retrieves all corresponding annotations from the database
  * `handleAnnotationSubmit` refreshes the annotations once a user has submitted their annotation
  * `handleDeleteAnnotation` utilizes the annotation deletion endpoint and refreshes the page accordingly
- **SingleAnnotation:** (annotationText.js)
    * Overview: Displays a single annotation comment
- **ImageDisplay:**
  * Overview: Displays the image and renders the red dot when a user hovers over an annotation. 
- **ArtTextCols:**
  * Overview: Displays the image (ImageDisplay) and text/annotation column (FetchAnnotate) in a single component
  * `useEffect` fetches the image url and details, also handles dynamic resizing
  * `handlebuttonclick` functions ensure the buttons beneath the artwork change
      * 'Write a Review' will be 'Edit your review' if the user has a review
      * 'View annotations' and 'view information' toggle what is displayed in the text column
- **Help:**
  * Overview: Displays the ? button on the bottom right hand side of the page, showing the user how to use the page upon clicking (onClick triggers a popup)
- **PopupForm:**
  * Overview: This is the popup form that is toggled when one wants to add an **annotation**
  * `handleTextChange` ensures the user's comment does not exceed 500 characters
  * `handleImageClick` stores the coordinates in percentage form of the area the user has clicked
  * `useEffect` collects the information of the current user
  * `fetchArtworkImage` sets the image in the popup
  * `handleFormSubmit` ensures the form contains valid information and resets the page by calling the parent's onSubmit handler
- **RevEdit:**
  * Overview: This is the popup form that is toggled when one wants to edit an existing **review**
  * `useEffect` fetches the existing review's information
  * `handleTextChange` ensures the new review is not too long
  * `handleFormSubmit` ensures the user is logged in 
- **Review:**
  * Overview: This displays all existing reviews. Most data is from a parent component (`reviews`, `onDel`, `isLiked`, `handleLike`)
- **ReviewCard:**
 * Overview: This is a single review card; takes in `rating`, `likes`, `user`, `review`, `revid`, `is_owner`, `onDelete`, `onLike`, `isLiked`
- **RevPopup:**
  ![image](https://github.com/amoahy15/GenTech/assets/141963248/375f7784-7cf4-4628-8399-8973901bad39)

 * Overview: this is the form that sets a user's review
 * `handleTextChange` ensures the text is not too long
 * `useEffect` fetches user details
 * `handleFormSubmit` submits and verifies the payload, also calling on the parent to refresh the reviews
- **Stars:**
 * Overview: these are stars that users can click on to change the display; keeps track of the number selected
 * `useEffect` takes in a parameter to initially set the number of stars selected to a certain number (not a default 0 since users can edit their review)
 * `handleStarClick` ensures the stars selected changes with a click
 * `handleMouseOn` creates the hover effect (the user can 'preview' the stars before selecting a rating)
 * `handleMouseOff` ensures the hover effect is not permanent
- **StaticStars:**
 * Overview: these are purely a display of a star rating that takes in the numerical rating (number of stars to be selected) as a parameter
- **TextColumn:**
 * Overview: this is the 'information' tab to the left of the artwork; it takes in `text`, `header`, `name`, `year`, and `rating` from its parent. 
