# Collection and Search Components
* These components are used for the search and gallery pages on the site, as well as any carousel components.
  
![image](https://github.com/amoahy15/GenTech/assets/141963248/68c37cff-4fc8-49a7-b290-9ea751b8a13c)

* Search can be found in VirtuosoApp/frontend/src/components/API/Search.js
* Carousel can be found in VirtuosoApp/frontend/src/components/API/Carousel.js

## Search Components

- **Search**
  * Overview: This component will find existing users and artworks, while string matching to what is typed in the bar.
      *  The first `UseEffect` simply checks for the presence of a token in this case and reroutes to login if none is present.
      * `fetchUsers` makes an API call to /list_users to find all existing users.
      * `fetchArtworks` makes an API call to /getartwork to find all existing artwork.
      * `Promise.all` fetches the data and puts it into an array that handles users and artwork.
      *  The second `UseEffect` then filters whats in the array based on input.

- **UserCard**
  * The display of a user card(circular to distinguish from artcard).
    
- **ArtCard**
  * The display of an artwork card (rectangular to distinguish from UserCard).
  * Uses styles from ImageCard, which is used for any carousels on the site.
    
- **SearchList**
  * Maps the user and art cards for the search page.
    
## Carousel Components

- **Carousel**
    * React Slick template; displays a carousel based on tags such as 'painting' (see endpoint [GET /tags/string:tag:](https://github.com/amoahy15/GenTech/blob/main/Docs/Backend%20docs/API/Artwork_managment_doc.md))
      
- **ImageCardHover**
    * This is the image card displayed in the carousels; upon hovering a user can see the title of a work of art
