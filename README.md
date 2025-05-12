# Entertainment App

A MERN stack application for browsing movies and TV series, powered by the TMDb API.

## Project Structure

Entertainment_App/
├── backend/        # Node.js/Express backend
├── frontend/       # React frontend (Vite)
├── README.md
└── .gitignore

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- TMDb API key (https://www.themoviedb.org/)
- Vercel account (https://vercel.com/)

## Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/AbirDhar79/Entertainment_App.git
   cd Entertainment_App

Backend Setup:
bash

cd backend
npm install

Create a .env file in backend/:

TMDB_API_KEY=your_tmdb_api_key
MONGO_URI=your_mongodb_connection_string
PORT=3001

Populate MongoDB with TMDb data:
bash

node scripts/importTmdbData.js

Run the backend:
bash

npm start

Frontend Setup:
bash

cd ../frontend
npm install

Create a .env file in frontend/ (optional, for API URL):

VITE_API_URL=http://localhost:3001

Run the frontend:
bash

npm run dev

Access the App:
Frontend: http://localhost:5173

Backend API: http://localhost:3001

eployment
Deployed on Vercel as two projects:
Frontend: Static React app from /frontend.

Backend: Serverless Node.js API from /backend.

Vercel Setup
Push to GitHub:
Ensure all changes are committed and pushed to https://github.com/AbirDhar79/Entertainment_App.git.

Frontend Deployment:
Create a Vercel project, select the Entertainment_App repo.

Set root directory to frontend/.

Framework: Vite.

Environment variables: None (or VITE_API_URL for backend URL).

Deploy.

Backend Deployment:
Create another Vercel project, select the same repo.

Set root directory to backend/.

Framework: Node.js.

Environment variables: TMDB_API_KEY, MONGO_URI, PORT.

Deploy.

Troubleshooting
404 Not Found for /person/details: Ensure backend/routes/person.js is included and deployed.

MongoDB Errors: Verify MONGO_URI and run importTmdbData.js.

CORS Issues: Check backend CORS settings in server.js.

License
MIT

**Notes**:
- Includes setup for local development and Vercel deployment.
- Addresses the `404` error by referencing `person.js`.
- Update with specific details (e.g., your MongoDB setup).

#### 4. Push to GitHub
Assuming the repo is empty or you want to overwrite it:

1. **Initialize Git** (if not already done):
   ```bash
   cd D:\Entertainment App
   git init

Add Files:
bash

git add .

Commit:
bash

git commit -m "Initial commit with backend and frontend"

Link to Remote Repo:
bash

git remote add origin https://github.com/AbirDhar79/Entertainment_App.git

Push to GitHub:
bash

git branch -M main
git push -u origin main

If the repo isn’t empty, use git push -f origin main to overwrite (caution: this deletes existing content).

Verify:
Visit https://github.com/AbirDhar79/Entertainment_App.

Ensure backend/, frontend/, README.md, and .gitignore are present.

Notes:
If you get errors about submodules or split repos, ensure no .git folders exist in backend/ or frontend/.

The .gitignore prevents uploading node_modules and .env.

