// const express = require("express");
// const router = express.Router();
// const Trending = require("../models/Trending");
// const Recommended = require('../models/Recommended')
// router.get("/trending", async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 16;
//     const totalDocuments = await Trending.countDocuments();
//     const totalPages = Math.ceil(totalDocuments / limit);

//     try {
//         const trending = await Trending.find()
//             .skip((page - 1) * limit)
//             .limit(limit);
//         // console.log("Trending Data:", trending);
//         res.json({ trending, totalPages, totalDocuments, currentPage: page });
//     } catch (error) {
//         console.error("Error fetching movies:", error);
//         res.status(500).json({ message: "Error fetching movies from database." });
//     }
// });

// router.get("/recommended", async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 8;
//     const totalDocuments = await Recommended.countDocuments();
//     const totalPages = Math.ceil(totalDocuments / limit);

//     try {
//         const recommended = await Recommended.find()
//             .skip((page - 1) * limit)
//             .limit(limit);
//         // console.log("Trending Data:", trending);
//         res.json({ recommended, totalPages, totalDocuments, currentPage: page });
//     } catch (error) {
//         console.error("Error fetching movies:", error);
//         res.status(500).json({ message: "Error fetching movies from database." });
//     }
// });
// module.exports = router;
const express = require('express');
const router = express.Router();
const Trending = require('../models/Trending');
const Recommended = require('../models/Recommended');
const axios = require('axios');

router.get('/trending', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const totalDocuments = await Trending.countDocuments();
  const totalPages = Math.ceil(totalDocuments / limit);

  try {
    const trending = await Trending.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    if (trending.length === 0) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.TMDB_API_KEY}`
      );
      const items = response.data.results.map(item => ({
        _id: item.id.toString(),
        id: item.id,
        media_type: item.media_type,
        title: item.title || item.name,
        name: item.name,
        release_date: item.release_date,
        first_air_date: item.first_air_date,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        overview: item.overview,
        genre_ids: item.genre_ids,
        vote_average: item.vote_average,
        vote_count: item.vote_count
      }));
      await Trending.insertMany(items);
      res.json({
        trending: items.slice(0, limit),
        totalPages: 1,
        totalDocuments: items.length,
        currentPage: page
      });
    } else {
      res.json({ trending, totalPages, totalDocuments, currentPage: page });
    }
  } catch (error) {
    console.error('Error fetching trending:', error.message);
    res.status(500).json({ message: 'Error fetching trending from database.' });
  }
});

router.get('/recommended', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 16;
  const totalDocuments = await Recommended.countDocuments();
  const totalPages = Math.ceil(totalDocuments / limit);

  try {
    const recommended = await Recommended.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    res.json({ recommended, totalPages, totalDocuments, currentPage: page });
  } catch (error) {
    console.error('Error fetching recommended:', error.message);
    res.status(500).json({ message: 'Error fetching recommended from database.' });
  }
});

module.exports = router;