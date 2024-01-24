# react-nextjs

The user profile page allows users to view and edit their account details.

# Features
    Edit Profile Questions - Users can edit fields like About Me, Location, Occupation etc. These are fetched from the API.
    Upload Profile Picture - Users can upload a profile picture which is previewed and can be changed.
    View Member Since - The month/year the user joined is displayed but not editable.
    Email/Name Not Editable - Email and first/last name are not editable fields.
    Own Profile Edit Only - The API only allows editing your own profile, not others.

# Implementation

    Fetch user data from /api/users/me endpoint. Includes email, name and profile questions.
    Submit updated questions to /api/users/me endpoint.
    Upload profile picture to /api/users/me/photo endpoint.
    Use authorization token in API requests to prevent editing other profiles.
    Show read-only join date from user object.
