= SPEC-3: Review Management Documentation
:sectnums:
:toc:

== Background

The Review Management system is designed to enrich the user experience by allowing users to leave reviews on artworks. These reviews can offer insights, critiques, and appreciations, contributing to a vibrant art community dialogue.

== Requirements

* Must allow users to post, edit, and delete their reviews on artworks.
* Should enable users to rate artworks as part of their review.
* Must ensure reviews are linked to the correct artwork and user.
* Should provide mechanisms to report or flag reviews for moderation.

== Method

=== Architecture Design

image::reviewComponentDiagram.png[Review Component Diagram,align="center"]

=== Database Schema

[plantuml, schema-review, png]
----
entity "Review" as Review {
  *review_id : string <<generated>>
  --
  *user_id : string
  *artwork_id : string
  *content : text
  *rating : double
  *post_date : datetime
  --
  flags : int
}
----

=== Algorithms

* Review Moderation: Automatic flagging system based on predefined criteria for inappropriate content.
* Artwork Rating Update: Artwork ratings are recalculated upon new review submissions to reflect the most current user feedback.

== Implementation

1. Definition of Review model in `reviewModel.py` with fields corresponding to the database schema.
2. Implementation of review-related operations in `reviewController.py`, including routes for posting, editing, and deleting reviews, as well as rating artworks.

== Sending Requests

=== Posting a Review

- Method: POST
- URL: `http://<your_server>/api/reviews`
- Required Headers: `Authorization: Bearer <your_jwt_token>`
- Body: JSON with `artwork_id`, `content`, and `rating`.
- Example:{
    "artwork_id": "artwork123",
    "content": "A captivating piece that explores...",
    "rating": 4.5
    }


=== Editing a Review

- Method: PUT
- URL: `http://<your_server>/api/reviews/<review_id>`
- Required Headers: `Authorization: Bearer <your_jwt_token>`
- Body: JSON with fields to be updated (`content` and/or `rating`).

=== Deleting a Review

- Method: DELETE
- URL: `http://<your_server>/api/reviews/<review_id>`
- Required Headers: `Authorization: Bearer <your_jwt_token>`

== Milestones

1. Completion of the Review model.
2. Implementation and testing of all review-related routes.

== Gathering Results

* User feedback on the review system's impact on engagement and community building.
* Analysis of moderation efforts required as the volume of reviews grows.
