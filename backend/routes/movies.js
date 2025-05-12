const express = require('express');
const router = express.Router();
const Movie = require('../models/Movies');
const MoviesDetails = require('../models/MovieDetails');
const axios = require('axios');

// router.get('/', async (req, res) => {
//   const { search, page = 1, limit = 8 } = req.query;
//   const query = search ? { title: { $regex: search, $options: 'i' } } : {};

//   try {
//     const totalDocuments = await Movie.countDocuments(query);
//     const totalPages = Math.ceil(totalDocuments / limit);
//     const movies = await Movie.find(query)
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit));
//     res.status(200).json({ movies, totalPages, totalDocuments, currentPage: parseInt(page) });
//   } catch (error) {
//     console.error('Error fetching movies:', error);
//     res.status(500).json({ message: 'Error fetching movies from database.' });
//   }
// });

// router.get('/details/:id', async (req, res) => {
//   const id = parseInt(req.params.id);
//   console.log('Fetching movie details for ID:', id);
//   try {
//     let movie = await MoviesDetails.findOne({ 'details.id': id });
//     if (!movie) {
//       console.log('Movie not found in DB, fetching from TMDb');
//       const response = await axios.get(
//         `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits`
//       );
//       const movieData = {
//         _id: id.toString(), // Add _id as string
//         details: {
//           adult: response.data.adult,
//           backdrop_path: response.data.backdrop_path,
//           belongs_to_collection: response.data.belongs_to_collection?.id || null,
//           budget: response.data.budget,
//           genres: response.data.genres,
//           homepage: response.data.homepage,
//           id: response.data.id,
//           imdb_id: response.data.imdb_id,
//           original_language: response.data.original_language,
//           original_title: response.data.original_title,
//           overview: response.data.overview,
//           popularity: response.data.popularity,
//           poster_path: response.data.poster_path,
//           production_companies: response.data.production_companies,
//           production_countries: response.data.production_countries,
//           release_date: response.data.release_date ? new Date(response.data.release_date) : null,
//           revenue: response.data.revenue,
//           runtime: response.data.runtime,
//           spoken_languages: response.data.spoken_languages,
//           status: response.data.status,
//           tagline: response.data.tagline,
//           title: response.data.title,
//           video: response.data.video,
//           vote_average: response.data.vote_average,
//           vote_count: response.data.vote_count,
//         },
//         cast: response.data.credits?.cast?.map(actor => ({
//           adult: actor.adult,
//           gender: actor.gender,
//           id: actor.id,
//           known_for_department: actor.known_for_department,
//           name: actor.name,
//           original_name: actor.original_name,
//           popularity: actor.popularity,
//           profile_path: actor.profile_path,
//           cast_id: actor.cast_id,
//           character: actor.character,
//           credit_id: actor.credit_id,
//           order: actor.order,
//         })) || [],
//       };
//       movie = await MoviesDetails.create(movieData);
//       console.log('Fetched from TMDb and saved:', movie);
//     }
//     res.json({
//       details: movie.details,
//       cast: movie.cast || [],
//     });
//   } catch (error) {
//     console.error('Error fetching movie details:', error);
//     res.status(404).json({ message: 'Movie not found' });
//   }
// });

// module.exports = router;

router.get('/', async (req, res) => {
  const { search, page = 1, limit = 8 } = req.query;
  const query = search ? { title: { $regex: search, $options: 'i' } } : {};

  try {
    const totalDocuments = await Movie.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / limit);
    const movies = await Movie.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json({ movies, totalPages, totalDocuments, currentPage: parseInt(page) });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Error fetching movies from database.' });
  }
});

router.get('/details/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  console.log('Fetching movie details for ID:', id);
  try {
    let movie = await MoviesDetails.findOne({ 'details.id': id });
    if (!movie) {
      console.log('Movie not found in DB, fetching from TMDb');
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits`
      );
      const movieData = {
        _id: id.toString(),
        details: {
          adult: response.data.adult,
          backdrop_path: response.data.backdrop_path,
          belongs_to_collection: response.data.belongs_to_collection?.id || null,
          budget: response.data.budget,
          genres: response.data.genres,
          homepage: response.data.homepage,
          id: response.data.id,
          imdb_id: response.data.imdb_id,
          original_language: response.data.original_language,
          original_title: response.data.original_title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          poster_path: response.data.poster_path,
          production_companies: response.data.production_companies,
          production_countries: response.data.production_countries,
          release_date: response.data.release_date ? new Date(response.data.release_date) : null,
          revenue: response.data.revenue,
          runtime: response.data.runtime,
          spoken_languages: response.data.spoken_languages,
          status: response.data.status,
          tagline: response.data.tagline,
          title: response.data.title,
          video: response.data.video,
          vote_average: response.data.vote_average,
          vote_count: response.data.vote_count,
        },
        cast: response.data.credits?.cast?.map(actor => ({
          adult: actor.adult,
          gender: actor.gender,
          id: actor.id,
          known_for_department: actor.known_for_department,
          name: actor.name,
          original_name: actor.original_name,
          popularity: actor.popularity,
          profile_path: actor.profile_path,
          cast_id: actor.cast_id,
          character: actor.character,
          credit_id: actor.credit_id,
          order: actor.order,
        })) || [],
      };
      movie = await MoviesDetails.create(movieData);
      console.log('Fetched from TMDb and saved:', movie);
    }
    res.json({
      details: movie.details,
      cast: movie.cast || [],
    });
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(404).json({ message: 'Movie not found' });
  }
});

module.exports = router;