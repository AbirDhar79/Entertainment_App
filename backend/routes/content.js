const express = require('express');
const Movie = require('../models/Movies');
const MoviesDetails = require('../models/MovieDetails');
const TVSeries = require('../models/TvSeries');
const TvSeriesDetails = require('../models/TvseriesDetails');
const Trendings = require('../models/Trendings');
const Recommended = require('../models/Recommended');

const router = express.Router();

// Get all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch movies' });
  }
});

// Get movie details by ID
router.get('/movies/:id', async (req, res) => {
  try {
    const movieDetails = await MoviesDetails.findOne({ 'details.id': parseInt(req.params.id) });
    if (!movieDetails) {
      return res.status(404).json({ message: 'Movie details not found' });
    }
    res.status(200).json(movieDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch movie details' });
  }
});

// Get all TV series
router.get('/tvseries', async (req, res) => {
  try {
    const tvSeries = await TVSeries.find();
    res.status(200).json(tvSeries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch TV series' });
  }
});

// Get TV series details by ID
router.get('/tvseries/:id', async (req, res) => {
  try {
    const tvDetails = await TvSeriesDetails.findOne({ 'details.id': parseInt(req.params.id) });
    if (!tvDetails) {
      return res.status(404).json({ message: 'TV series details not found' });
    }
    res.status(200).json(tvDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch TV series details' });
  }
});

// Get trending content
router.get('/trending', async (req, res) => {
  try {
    const trending = await Trendings.find();
    res.status(200).json(trending);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch trending content' });
  }
});

// Get recommended content
router.get('/recommended', async (req, res) => {
  try {
    const recommended = await Recommended.find();
    res.status(200).json(recommended);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch recommended content' });
  }
});

module.exports = router;