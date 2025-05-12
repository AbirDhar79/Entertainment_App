
// const express = require('express');
// const router = express.Router();
// const TVSeries = require('../models/TvSeries');
// const TvSeriesDetails = require('../models/TvseriesDetails');
// const MoviesDetails = require('../models/MovieDetails');
// const axios = require('axios');

// router.get('/', async (req, res) => {
//   const { search, page = 1, limit = 8 } = req.query;
//   const query = search ? { name: { $regex: search, $options: 'i' } } : {};

//   try {
//     const totalDocuments = await TVSeries.countDocuments(query);
//     const totalPages = Math.ceil(totalDocuments / limit);
//     const tvSeries = await TVSeries.find(query)
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit));
//     res.status(200).json({ tvSeries, totalPages, totalDocuments, currentPage: parseInt(page) });
//   } catch (error) {
//     console.error('Error fetching TV series:', error);
//     res.status(500).json({ message: 'Error fetching TV series from database.' });
//   }
// });

// router.get('/details/:id', async (req, res) => {
//   const id = parseInt(req.params.id);
//   console.log('Fetching TV series details for ID:', id);
//   try {
//     let series = await TvSeriesDetails.findOne({ 'details.id': id });
//     if (!series) {
//       // Check if it's a movie
//       const movie = await MoviesDetails.findOne({ 'details.id': id });
//       if (movie) {
//         console.log('Redirecting to movie details for ID:', id);
//         return res.json({
//           details: movie.details,
//           cast: movie.cast || [],
//         });
//       }
//       // Fallback to TMDb API
//       console.log('Series not found in DB, fetching from TMDb');
//       const response = await axios.get(
//         `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits`
//       );
//       const seriesData = {
//         details: {
//           adult: response.data.adult,
//           backdrop_path: response.data.backdrop_path,
//           genres: response.data.genres,
//           homepage: response.data.homepage,
//           id: response.data.id,
//           original_language: response.data.original_language,
//           original_name: response.data.original_name,
//           overview: response.data.overview,
//           popularity: response.data.popularity,
//           poster_path: response.data.poster_path,
//           first_air_date: new Date(response.data.first_air_date),
//           last_air_date: new Date(response.data.last_air_date),
//           episode_run_time: response.data.episode_run_time,
//           number_of_episodes: response.data.number_of_episodes,
//           number_of_seasons: response.data.number_of_seasons,
//           spoken_languages: response.data.spoken_languages,
//           status: response.data.status,
//           tagline: response.data.tagline,
//           name: response.data.name,
//           vote_average: response.data.vote_average,
//           vote_count: response.data.vote_count,
//         },
//         cast: response.data.credits.cast.map(actor => ({
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
//         })),
//       };
//       series = await TvSeriesDetails.create(seriesData);
//       console.log('Fetched from TMDb and saved:', series);
//     }
//     res.json({
//       details: series.details,
//       cast: series.cast || [],
//     });
//   } catch (error) {
//     console.error('Error fetching TV series details:', error);
//     res.status(404).json({ message: 'TV series not found' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const TVSeries = require('../models/TvSeries');
const TvSeriesDetails = require('../models/TvseriesDetails');
const MoviesDetails = require('../models/MovieDetails');
const axios = require('axios');

router.get('/', async (req, res) => {
  const { search, page = 1, limit = 8 } = req.query;
  const query = search ? { name: { $regex: search, $options: 'i' } } : {};

  try {
    const totalDocuments = await TVSeries.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / limit);
    const tvSeries = await TVSeries.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json({ tvSeries, totalPages, totalDocuments, currentPage: parseInt(page) });
  } catch (error) {
    console.error('Error fetching TV series:', error);
    res.status(500).json({ message: 'Error fetching TV series from database.' });
  }
});

router.get('/details/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  console.log('Fetching TV series details for ID:', id);
  try {
    let series = await TvSeriesDetails.findOne({ 'details.id': id });
    if (!series) {
      // Check if it's a movie in MoviesDetails
      const movie = await MoviesDetails.findOne({ 'details.id': id });
      if (movie) {
        console.log('Redirecting to movie details for ID:', id);
        return res.json({
          details: movie.details,
          cast: movie.cast || [],
        });
      }
      // Try TMDb TV endpoint
      console.log('Series not found in DB, fetching from TMDb (TV)');
      try {
        const tvResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits`
        );
        const seriesData = {
          _id: id.toString(),
          details: {
            adult: tvResponse.data.adult,
            backdrop_path: tvResponse.data.backdrop_path,
            genres: tvResponse.data.genres,
            homepage: tvResponse.data.homepage,
            id: tvResponse.data.id,
            original_language: tvResponse.data.original_language,
            original_name: tvResponse.data.original_name,
            overview: tvResponse.data.overview,
            popularity: tvResponse.data.popularity,
            poster_path: tvResponse.data.poster_path,
            first_air_date: tvResponse.data.first_air_date ? new Date(tvResponse.data.first_air_date) : null,
            last_air_date: tvResponse.data.last_air_date ? new Date(tvResponse.data.last_air_date) : null,
            episode_run_time: tvResponse.data.episode_run_time,
            number_of_episodes: tvResponse.data.number_of_episodes,
            number_of_seasons: tvResponse.data.number_of_seasons,
            spoken_languages: tvResponse.data.spoken_languages,
            status: tvResponse.data.status,
            tagline: tvResponse.data.tagline,
            name: tvResponse.data.name,
            vote_average: tvResponse.data.vote_average,
            vote_count: tvResponse.data.vote_count,
          },
          cast: tvResponse.data.credits?.cast?.map(actor => ({
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
        series = await TvSeriesDetails.create(seriesData);
        console.log('Fetched TV from TMDb and saved:', series);
        return res.json({
          details: series.details,
          cast: series.cast || [],
        });
      } catch (tvError) {
        console.log('TV fetch failed, trying movie endpoint:', tvError.message);
        // Try TMDb movie endpoint
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits`
        );
        const movieData = {
          _id: id.toString(),
          details: {
            adult: movieResponse.data.adult,
            backdrop_path: movieResponse.data.backdrop_path,
            belongs_to_collection: movieResponse.data.belongs_to_collection?.id || null,
            budget: movieResponse.data.budget,
            genres: movieResponse.data.genres,
            homepage: movieResponse.data.homepage,
            id: movieResponse.data.id,
            imdb_id: movieResponse.data.imdb_id,
            original_language: movieResponse.data.original_language,
            original_title: movieResponse.data.original_title,
            overview: movieResponse.data.overview,
            popularity: movieResponse.data.popularity,
            poster_path: movieResponse.data.poster_path,
            production_companies: movieResponse.data.production_companies,
            production_countries: movieResponse.data.production_countries,
            release_date: movieResponse.data.release_date ? new Date(movieResponse.data.release_date) : null,
            revenue: movieResponse.data.revenue,
            runtime: movieResponse.data.runtime,
            spoken_languages: movieResponse.data.spoken_languages,
            status: movieResponse.data.status,
            tagline: movieResponse.data.tagline,
            title: movieResponse.data.title,
            video: movieResponse.data.video,
            vote_average: movieResponse.data.vote_average,
            vote_count: movieResponse.data.vote_count,
          },
          cast: movieResponse.data.credits?.cast?.map(actor => ({
            adult: actor.adult,
            gender: actor.gender,
            id: actor.id,
            known_for_department: actor.known_for_department,
            name: actor.name,
            original_name: actor.name,
            popularity: actor.popularity,
            profile_path: actor.profile_path,
            cast_id: actor.cast_id,
            character: actor.character,
            credit_id: actor.credit_id,
            order: actor.order,
          })) || [],
        };
        const movie = await MoviesDetails.create(movieData);
        console.log('Fetched movie from TMDb and saved:', movie);
        return res.json({
          details: movie.details,
          cast: movie.cast || [],
        });
      }
    }
    res.json({
      details: series.details,
      cast: series.cast || [],
    });
  } catch (error) {
    console.error('Error fetching TV series details:', error);
    res.status(404).json({ message: 'Media not found' });
  }
});

module.exports = router;