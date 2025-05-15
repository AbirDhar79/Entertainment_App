// const express = require('express');
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const moviesRouter = require('./routes/movies');
// const tvSeriesRouter = require('./routes/tvSeries');
// const additionalRouter = require('./routes/additional');
// const bookmarkRouter = require('./routes/bookmark');
// const personRoutes = require('./routes/person')
// const trendingRoutes = require('./routes/trending');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors())
// app.use(bodyParser.json());

// // Database connection
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Error connecting to MongoDB:', err));



// app.use('/movies', moviesRouter);
// app.use('/tvseries', tvSeriesRouter);
// app.use('/additional', additionalRouter);
// app.use('/bookmark', bookmarkRouter)
// app.use('/person', personRoutes);
// app.use('/trending', trendingRoutes);
// app.get('/', (req, res,) => {
//     res.status(200).json("Server is now Listen")
// })





// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const moviesRouter = require('./routes/movies');
// const tvSeriesRouter = require('./routes/tvSeries');
// const additionalRouter = require('./routes/additional');
// const bookmarkRouter = require('./routes/bookmark');
// const personRoutes = require('./routes/person');
// const trendingRoutes = require('./routes/trending');
// require('dotenv').config();

// const app = express();

// // CORS configuration
// const corsOptions = {
//   origin: [
//     'https://entertainment-app-bice.vercel.app',
//     'http://localhost:5173' // For local development
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// };

// // Apply CORS to all requests
// app.use(cors(corsOptions));

// // Handle preflight OPTIONS requests
// app.options('*', (req, res) => {
//   res.set({
//     'Access-Control-Allow-Origin': req.headers.origin || 'https://entertainment-app-bice.vercel.app',
//     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     'Access-Control-Allow-Credentials': 'true'
//   });
//   res.status(204).send(); // Respond with 204 No Content
// });

// // Middleware
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors({
//     origin: ['https://entertainment-app-bice.vercel.app', 'http://localhost:3000'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));
// app.use(bodyParser.json());


// // Normalize URLs to prevent redirects (remove extra slashes)
// app.use((req, res, next) => {
//   req.url = req.url.replace(/\/+/g, '/'); // Replace multiple slashes with single slash
//   next();
// });

// // Database connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));

// // Routes
// app.use('/movies', moviesRouter);
// app.use('/tvseries', tvSeriesRouter);
// app.use('/additional', additionalRouter);
// app.use('/bookmark', bookmarkRouter);
// app.use('/person', personRoutes);
// app.use('/trending', trendingRoutes);

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Server is now listening' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moviesRouter = require('./routes/movies');
const tvSeriesRouter = require('./routes/tvSeries');
const additionalRouter = require('./routes/additional');
const bookmarkRouter = require('./routes/bookmark');
const personRoutes = require('./routes/person');
const trendingRoutes = require('./routes/trending');
const decodeToken = require('./middleware/decodeToken');
require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://entertainment-app-bice.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': req.headers.origin || 'https://entertainment-app-bice.vercel.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true'
  });
  res.status(204).send();
});

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Normalize URLs
app.use((req, res, next) => {
  req.url = req.url.replace(/\/+/g, '/');
  next();
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/movies', moviesRouter);
app.use('/tvseries', tvSeriesRouter);
app.use('/additional', additionalRouter);
app.use('/bookmark', decodeToken, bookmarkRouter);
app.use('/person', personRoutes);
app.use('/trending', trendingRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is now listening' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));