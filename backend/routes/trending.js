const express = require('express');
const router = express.Router();
const Trendings = require('../models/Trending');
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const trendings = await Trendings.find();
    if (trendings.length === 0) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.TMDB_API_KEY}`
      );
      const items = response.data.results.map(item => ({
        _id: item.id.toString(),
        adult: item.adult,
        backdrop_path: item.backdrop_path,
        id: item.id,
        name: item.name || item.title,
        original_language: item.original_language,
        original_name: item.original_name || item.original_title,
        overview: item.overview,
        poster_path: item.poster_path,
        media_type: item.media_type,
        genre_ids: item.genre_ids,
        popularity: item.popularity,
        release_date: item.media_type === 'movie' ? item.release_date : null,
        first_air_date: item.media_type === 'tv' ? item.first_air_date : null,
        vote_average: item.vote_average,
        vote_count: item.vote_count,
        origin_country: item.origin_country || [],
      }));
      await Trendings.insertMany(items);
      res.json({ trending: items });
    } else {
      res.json({ trending: trendings });
    }
  } catch (error) {
    console.error('Error fetching trending:', error);
    res.status(500).json({ message: 'Error fetching trending data' });
  }
});

module.exports = router;