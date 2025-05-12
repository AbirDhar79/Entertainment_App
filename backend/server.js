const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moviesRouter = require('./routes/movies');
const tvSeriesRouter = require('./routes/tvSeries');
const additionalRouter = require('./routes/additional');
const bookmarkRouter = require('./routes/bookmark');
const personRoutes = require('./routes/person')
const trendingRoutes = require('./routes/trending');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));



app.use('/movies', moviesRouter);
app.use('/tvseries', tvSeriesRouter);
app.use('/additional', additionalRouter);
app.use('/bookmark', bookmarkRouter)
app.use('/person', personRoutes);
app.use('/trending', trendingRoutes);
app.get('/', (req, res,) => {
    res.status(200).json("Server is now Listen")
})





const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
