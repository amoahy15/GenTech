# Review Components

This document provides an overview of the way the React components interact specifically in reference to the 'Review' Page (for instance, https://virtuoso-419315.web.app/reviews/6856b9e4-f392-463d-b871-c3e79b234638)

## Parent Page
## Components
- **FetchAnnotate:** 
  * Displays the entire array of annotation comments
  * `handleAddAnnotationClick` toggles the popup when a user clicks "+"
    ![image](https://github.com/amoahy15/GenTech/assets/141963248/419e6425-87f9-4d61-ba00-7f8ce4cdba42)
  * `fetchAnnotations` retrieves all corresponding annotations from the database
  * `handleAnnotationSubmit` refreshes the annotations once a user has submitted their annotation
  * `handleDeleteAnnotation` utilizes the annotation deletion endpoint and refreshes the page accordingly
- **SingleAnnotation:** (annotationText.js)
    * Displays a single annotation comment
- **ImageDisplay:**
  *Displays the image and renders the red dot when a user hovers over an annotation. 
- **ArtTextCols:**
  * Displays the image (ImageDisplay) and text/annotation column (FetchAnnotate) in a single component
  * `useEffect` fetches the image url and details, also handles dynamic resizing
  * `handlebuttonclick` functions ensure the buttons beneath the artwork change
      * 'Write a Review' will be 'Edit your review' if the user has a review
      * 'View annotations' and 'view information' toggle what is displayed in the text column
- **Help:**
  * Displays the ? button on the bottom right hand side of the page, showing the user how to use the page upon clicking (onClick triggers a popup)
- **PopupForm:**
  *
