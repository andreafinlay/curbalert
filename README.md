# Curb Alert

Awareness of the problems caused by excessive waste is at an all-time high. Yet, every day, people throw out countless useful and valuable objects. Curb Alert seeks to reduce waste by inspiring good recycling practices. :recycle:

Curb Alert allows users to share images of abandoned items that look ready for a second life, and to tag a map with the location of the items. Other users can then view the items and their location, and make their way to the items to pick them up on a first-come basis.

In order to foster a healthy community, users who contribute items/locations are rewarded with in-app currency when a new item is posted. A user can then spend currency to hide existing posts from other users, giving them the opportunity to claim an item before anyone else.

## Final Product

Welcome page

!["welcome"](https://github.com/andreafinlay/curbalert/blob/master/docs/welcome.png?raw=true)

Home page

!["home"](https://github.com/andreafinlay/curbalert/blob/master/docs/home.png?raw=true)

User profile

!["profile"](https://github.com/andreafinlay/curbalert/blob/master/docs/profile.png?raw=true)

Profile (mobile view)

!["profile mobile"](https://github.com/andreafinlay/curbalert/blob/master/docs/profile-mobile.png?raw=true)

Adding a new post

!["add post"](https://github.com/andreafinlay/curbalert/blob/master/docs/add-post.gif?raw=true)

## Getting Started

1. Clone this repository
2. From within the project directory, install dependencies (`npm install`)
3. From within the server directory, install dependencies (`npm install`)
4. Create `.env` from `.env.example` in both the project and server directories
5. From the server directory, run `knex migrate:latest` to create the database
6. From the server directory, run `knex seed:run` to seed the database
7. From the server directory, run `npm start`
8. From the project directory, run `npm start`. The app will be automatically served at `localhost:3000`

## Dependencies

Client-side:
- React
- React Router
- Axios
- Bulma
- Google Map React
- React Geocode
- React Dropzone
- Jwt Decode
- Moment
- Express
- Nodemon
- Node Sass
- Knex

Server-side:
- Bcrypt
- BodyParser
- Express
- Faker
- JsonWebToken
- Knex
- PG

## APIs
- Google Maps
- Google Geocoder
- Node Cloud Vision
- Cloudinary
