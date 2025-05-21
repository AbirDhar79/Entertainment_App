# Entertainment App
Entertainment App



A MERN stack application for browsing movies and TV series, powered by the TMDb API.

## Project Structure

Entertainment_App/
├── backend/        # Node.js/Express backend
├── frontend/       # React frontend (Vite)
├── README.md
└── .gitignore

The Entertainment App is a web application that allows users to browse, search, and bookmark movies and TV series, powered by The Movie Database (TMDb) API. With a responsive design and secure user authentication, it provides a seamless experience for discovering entertainment content.
Table of Contents
Features (#features)

Technologies (#technologies)

Installation (#installation)

Configuration (#configuration)

Running the App (#running-the-app)

API Documentation (#api-documentation)

Database Schema (#database-schema)

Deployment (#deployment)

Best Practices (#best-practices)

Contributing (#contributing)

License (#license)

Features
Browse Content: Explore trending movies, popular movies, TV series, and personalized recommendations.

Search: Find movies and series by title or genre.

Detailed Views: Access comprehensive details, including cast, genres, ratings, and synopsis for each title.

Bookmarking: Authenticated users can save favorite movies and series to a personal bookmark list.

User Authentication: Secure Google Sign-In via Firebase.

Responsive Design: Optimized for mobile, tablet, and desktop devices.

Error Handling: Robust handling of errors (e.g., missing movie details, invalid API responses).

Technologies
Frontend:
React (with React Router for navigation)

Redux Toolkit (state management)

Tailwind CSS (responsive styling)

Vite (fast build tool)

Backend:
Node.js with Express.js (RESTful API)

MongoDB (NoSQL database)

Mongoose (MongoDB ODM)

Axios (HTTP requests to TMDb)

Authentication: Firebase Authentication (Google Sign-In)

External API: The Movie Database (TMDb) API

Deployment: Vercel (frontend and backend)

Tools: Git, GitHub, dotenv, Postman (API testing)

Installation
Follow these steps to set up the project locally.
Prerequisites
Node.js (v16 or higher)

MongoDB Atlas account (or local MongoDB instance)

Firebase project for authentication

TMDb API key

Git

Clone the Repository
bash

git clone https://github.com/AbirDhar79/Entertainment_App.git
cd Entertainment_App

Install Dependencies
Install dependencies for both frontend and backend:
bash

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

Configuration
Create .env files in both backend/ and frontend/ directories based on the provided .env.example files.
Backend .env
env

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/entertainment_app
TMDB_API_KEY=your_tmdb_api_key
PORT=5000
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id

Frontend .env
env

VITE_API_URL=https://entertainment-app-zopp.vercel.app
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

Obtain API Keys
TMDb API Key: Register at TMDb and generate an API key.

Firebase: Set up a Firebase project, enable Google Sign-In, and copy credentials to .env files.

MongoDB Atlas: Create a cluster and get the connection URI.

Running the App
Populate the Database:
Run the data import script to fetch movies, series, and trending content from TMDb:
bash

cd backend/scripts
node importTmdbData.js

This populates the MongoDB collections (Movies, MovieDetails, TvSeries, TvSeriesDetails, Trending, Recommended).

Start the Backend:
bash

cd backend
npm start

The server runs on http://localhost:5000 (or the specified PORT).

Start the Frontend:
bash

cd frontend
npm run dev

The app runs on http://localhost:5173 (default Vite port).

Access the App:
Open http://localhost:5173 in your browser. Sign in with Google to access bookmarking features.

API Documentation
The backend provides RESTful APIs at https://entertainment-app-zopp.vercel.app.
Key Endpoints
GET /movies: Fetch paginated movies (?page=1&limit=8).

GET /movies/details/:id: Fetch movie details (e.g., /movies/details/8590).

GET /tvseries: Fetch paginated TV series.

GET /tvseries/details/:id: Fetch series details.

GET /additional/trending: Fetch trending content (e.g., ID 1151039 for Captain America: Brave New World).

GET /additional/recommended: Fetch recommended content.

POST /bookmark: Fetch user bookmarks (requires Firebase JWT in Authorization: Bearer <token>).

Example Request
bash

curl https://entertainment-app-zopp.vercel.app/movies/details/8590

Response:
json

{
  "_id": "8590",
  "details": {
    "id": 8590,
    "title": "Movie Title",
    "release_date": "2023-01-01",
    "genres": [{ "id": 28, "name": "Action" }],
    ...
  },
  "cast": [{ "name": "Actor Name", "character": "Role" }]
}

For full API details, see API Documentation (#api-documentation) (to be expanded in a separate docs/api.md file).
Database Schema
The app uses MongoDB with six collections, populated by importTmdbData.js.
Collections
Movies: Basic movie data (e.g., title, release_date).

MovieDetails: Detailed movie data with cast (e.g., genres, runtime).

TvSeries: Basic TV series data (e.g., name, first_air_date).

TvSeriesDetails: Detailed series data with cast (e.g., seasons, episode_run_time).

Trending: Trending movies/series (e.g., ID 1151039).

Recommended: Recommended movies/series.

ER Diagram (Text-Based)

[Users] --(bookmarks)--> [Bookmarks]
[Bookmarks] --(references)--> [Movies | TvSeries | Trending | Recommended]
[Movies] --(details)--> [MovieDetails]
[TvSeries] --(details)--> [TvSeriesDetails]
[Trending] --(references)--> [Movies | TvSeries]
[Recommended] --(references)--> [Movies | TvSeries]

For a graphical ERD, use MongoDB Compass or Lucidchart with the schema in backend/models/.
Deployment
The app is deployed on Vercel:
Frontend: https://entertainment-app-bice.vercel.app

Backend: https://entertainment-app-zopp.vercel.app

Deployment Steps
Push changes to GitHub:
bash

git add .
git commit -m "Update app with fixes"
git push origin main

Deploy to Vercel:
bash

vercel --prod

Set environment variables in Vercel dashboard (same as .env files).

Note: Recent fixes addressed 404 errors (e.g., /movies/details/8590), TypeError (undefined release_date), and SyntaxError (HTML responses) by updating api.js, MovieDetails.jsx, and importTmdbData.js.
Best Practices
The project adheres to the following best practices:
Modular Code: Organized into frontend/ and backend/ with clear directories (routes/, services/).

Environment Variables: Secured sensitive data in .env files.

Error Handling: Try-catch in api.js and redirects in MovieDetails.jsx.

CORS: Configured in vercel.json for secure cross-origin requests.

Data Deduplication: Used Map in seriesSlice.js and MovieDetails.jsx.

Centralized APIs: api.js for consistent HTTP requests.

MongoDB Efficiency: upsert in importTmdbData.js for data consistency.

Responsive Design: Tailwind CSS for mobile-first UI.

Secure Authentication: Firebase JWT for /bookmark.

Clean URLs: vercel.json with cleanUrls: true.

Contributing
Contributions are welcome! Follow these steps:
Fork the repository.

Create a branch:
bash

git checkout -b feature/your-feature

Commit changes:
bash

git commit -m "Add your feature"

Push to your fork:
bash

git push origin feature/your-feature

Open a Pull Request on GitHub.

Please adhere to the Code of Conduct (CODE_OF_CONDUCT.md) and include tests for new features.
License
This project is licensed under the MIT License (LICENSE).
Notes and Action Items
Push README to GitHub:
Save the above content as README.md in the project root.

Resolve any pending rebase issues:
bash

cd D:\Entertainment App
git rebase --abort
git add README.md
git commit -m "Add README.md with project details"
git pull origin main --rebase
git push origin main

Verify at https://github.com/AbirDhar79/Entertainment_App.

Verify Fixes:
Ensure importTmdbData.js includes ID 8590 (as updated previously).

Test /movies/details/8590 and /additional/trending (ID 1151039).

Check MongoDB:
javascript

db.movieDetails.find({ "details.id": 8590 })
db.trendings.find({ id: 1151039 })

Requested Information:
Please provide:
backend/models/*.js (Mongoose schemas).

Output of node backend/scripts/importTmdbData.js.

Vercel logs.

Confirmation: Does the app load /movies/details/8590 and show Captain America: Brave New World in Trending?

