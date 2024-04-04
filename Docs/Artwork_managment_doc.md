= SPEC-2: Artwork Management Documentation
:sectnums:
:toc:

== Background

The Artwork Management system within VirtuosoApp enables artists to upload, showcase, and manage their artworks. It provides functionality for users to view, rate, and comment on artworks, fostering an interactive art community.

== Requirements

* Must support artwork upload, update, and deletion by the artist.
* Must allow users to view, rate, and comment on artworks.
* Should store artwork metadata including title, description, creation date, and artist information.
* Must support searching and filtering of artworks.

== Method

=== Architecture Design

image::artworkComponentDiagram.png[Artwork Component Diagram,align="center"]

=== Database Schema

[plantuml, schema-artwork, png]
----
entity "Artwork" as Artwork {
  *artwork_id : string <<generated>>
  --
  *title : string
  *artist_id : string
  *creation_date : datetime
  *description : string
  *tags : array[string]
  *image_url : url
  --
  comments : array[string]
  ratings : array[double]
}
----

=== Algorithms

* Artwork Rating Calculation: Average of all user-submitted ratings.
* Comment Moderation: Basic filtering for inappropriate content.

== Implementation

1. Definition of Artwork model in `artworkModel.py` with fields corresponding to the database schema.
2. Implementation of artwork-related operations in `artworkController.py`, including routes for artwork management and interaction.

== Sending Requests

=== Uploading Artwork

- Method: POST
- URL: `http://<your_server>/api/artworks`
- Required Headers: `Authorization: Bearer <your_jwt_token>`
- Body: Form-data with fields for `title`, `description`, `tags` (optional), and `image` (file upload).

=== Viewing Artworks

- Method: GET
- URL: `http://<your_server>/api/artworks`
- Optional Query Parameters: `tags`, `artist_id`, `rating_above`

== Milestones

1. Completion of the Artwork model.
2. Implementation and testing of artwork-related routes.

== Gathering Results

* User feedback on ease of artwork management.
* Performance analysis with increasing artwork uploads.
