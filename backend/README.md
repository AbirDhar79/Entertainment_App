# `Entertainment App using MERN stack` (Backend) 

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [API Endpoints](#api-endpoints)
  
FrontEnd Live URL:   https://entertainment--webapp.vercel.app/

Frontend Github link: https://github.com/cypher1ravi/entertainment-app

Backend Live Link:   https://entertainment-backend.vercel.app/

## General info
<img src="https://github.com/Magar0/entertainment-app-AlmaBetter-FinalProject/assets/35245789/bcb6ba7f-b403-4439-8d3f-ea51392d7cec" height="350" >

* Developed a feature-rich entertainment platform for browsing videos using the MERN stack (MongoDB, Express.js, React.js, Node.js)
* Developed a responsive platform accross all devices including mobiles & tablets.
* Implemented secure user authentication and authorization using Firebase.
* Enabled extensive user interaction with adding and removing bookmark.
* Leveraged Node.js, Express.js, Firebase, and other technologies for a robust and scalable backend foundation.
* Employed Redux Toolkit for efficient state management and data flow.

## Technologies
* MERN stack
* React JS
* Redux Toolkit, React Router.
* Node JS., Express JS.
* Firebase
* Mongo DB.
	
## Setup
1. Set up environment variables (Backend):
   - Create a `.env` file in the root directory.
   - Add the following variables to the `.env` file, replacing the placeholder values with your actual credentials:
     ```
       FIREBASE_ADMIN_SDK_KEY_PATH= "path to the firebase service key file"
       MONGO_URI= "Your Mongo DB URI"
     ```
2. Install dependencies and run server:
#### Backend
```
npm install
npm start
```

## API Endpoints
| Endpoint | Description | Method | Request Body | Response Format (Example) | Authentication |
|---|---|---|---|---|---|
| `/` | Get server status | GET | None | "Server is now Listening"  | None |
| `/movies` | Get trending or searched movies (paginated) | GET | Query parameters: <br> * `page` (optional): Page number (default: 1) <br> * `limit` (optional): Number of movies per page (default: 8) <br> * `search` (optional): Search query string  | JSON (`{ movies: [], totalPages: number, totalDocuments: number, currentPage: number }`) | None |
| `/movies/details/:id` | Get details of a specific movie | GET | Path parameter: `id` | JSON (`{ details: {...}, cast: [...] }`) | None |
| `/tvseries` | Get trending or searched TV series (paginated) | GET | Query parameters: <br> * `page` (optional): Page number (default: 1) <br> * `limit` (optional): Number of TV series per page (default: 8) <br> * `search` (optional): Search query string  | JSON (`{ tvSeries: [], totalPages: number, totalDocuments: number, currentPage: number }`) | None |
| `/tvseries/details/:id` | Get details of a specific TV series | GET | Path parameter: `id` | JSON (`{ details: {...}, cast: [...] }`) | None |
| `/bookmark` | Get user bookmarks (requires authentication) | GET | None | JSON (`[{ id: number, mediatype: string }, ...]`) | JWT token in authorization header |
| `/bookmark/add` | Add a movie or TV series to user bookmarks (requires authentication) | POST | Body parameters: <br> * `movieId`: ID of the movie or TV series <br> * `mediaType`: "movies" or "tvseries" | JSON (`{ message: "Added bookmark Successfully" }` or `{ message: "Bookmark already exists" }`) | JWT token in authorization header |
| `/bookmark/remove` | Remove a movie or TV series from user bookmarks (requires authentication) | POST | Body parameters: <br> * `movieId`: ID of the movie or TV series <br> * `mediaType`: "movies" or "tvseries" | JSON (`{ message: "Removed bookmark Successfully" }`) | JWT token in authorization header |

**Notes:**

* All endpoints support JSON responses.
* Authentication is required for `/bookmark` endpoints using a Firebase token in the authorization header.
* Some endpoints support optional query parameters for pagination and search.


