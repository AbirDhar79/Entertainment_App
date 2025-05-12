const express = require('express');
const router = express.Router();
const MoviesDetails = require('../models/MovieDetails');
const TvSeriesDetails = require('../models/TvseriesDetails');
const axios = require('axios');

router.get('/details/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  console.log('Fetching person details for ID:', id);
  try {
    // Check if it's a movie
    let media = await MoviesDetails.findOne({ 'details.id': id });
    if (media) {
      console.log('Redirecting to movie details for ID:', id);
      return res.json({
        details: media.details,
        cast: media.cast || [],
      });
    }

    // Check if it's a TV series
    media = await TvSeriesDetails.findOne({ 'details.id': id });
    if (media) {
      console.log('Redirecting to TV series details for ID:', id);
      return res.json({
        details: media.details,
        cast: media.cast || [],
      });
    }

    // Try TMDb movie endpoint
    console.log('Not found in DB, fetching from TMDb (movie)');
    try {
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
          original_name: actor.original_name,
          popularity: actor.popularity,
          profile_path: actor.profile_path,
          cast_id: actor.cast_id,
          character: actor.character,
          credit_id: actor.credit_id,
          order: actor.order,
        })) || [],
      };
      await MoviesDetails.create(movieData);
      console.log('Fetched movie from TMDb and saved:', id);
      return res.json({
        details: movieData.details,
        cast: movieData.cast,
      });
    } catch (movieError) {
      console.log('Movie fetch failed, trying TV endpoint:', movieError.message);
      // Try TMDb TV endpoint
      const tvResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits`
      );
      const tvData = {
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
          character: actor.character,
          credit_id: actor.credit_id,
          order: actor.order,
        })) || [],
      };
      await TvSeriesDetails.create(tvData);
      console.log('Fetched TV from TMDb and saved:', id);
      return res.json({
        details: tvData.details,
        cast: tvData.cast,
      });
    }
  } catch (error) {
    console.error('Error fetching details:', error.message);
    res.status(404).json({ message: 'Media not found' });
  }
});

module.exports = router;