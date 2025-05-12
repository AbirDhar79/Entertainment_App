
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const Movie = require('../models/Movies');
const MoviesDetails = require('../models/MovieDetails');
const TVSeries = require('../models/TvSeries');
const TvSeriesDetails = require('../models/TvseriesDetails');
const Trendings = require('../models/Trending');
const Recommended = require('../models/Recommended');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  importData();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

async function importData() {
  try {
    // Specific IDs to ensure coverage
    const specificMovieIds = [1151039, 499255];

    // Fetch Movies
    for (let page = 1; page <= 3; page++) {
      const movieResponse = await axios.get(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`);
      const movies = movieResponse.data.results;
      for (const movie of movies) {
        await Movie.findOneAndUpdate(
          { id: movie.id },
          {
            _id: movie.id.toString(),
            adult: movie.adult,
            backdrop_path: movie.backdrop_path,
            genre_ids: movie.genre_ids,
            id: movie.id,
            original_language: movie.original_language,
            original_title: movie.original_title,
            overview: movie.overview,
            popularity: movie.popularity,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            title: movie.title,
            video: movie.video,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
          },
          { upsert: true, new: true }
        );

        const movieDetailsResponse = await axios.get(`${BASE_URL}/movie/${movie.id}?api_key=${TMDB_API_KEY}&append_to_response=credits`);
        const movieDetails = movieDetailsResponse.data;
        await MoviesDetails.findOneAndUpdate(
          { 'details.id': movie.id },
          {
            _id: movie.id.toString(),
            details: {
              adult: movieDetails.adult,
              backdrop_path: movieDetails.backdrop_path,
              belongs_to_collection: movieDetails.belongs_to_collection ? movieDetails.belongs_to_collection.id : null,
              budget: movieDetails.budget,
              genres: movieDetails.genres,
              homepage: movieDetails.homepage,
              id: movieDetails.id,
              imdb_id: movieDetails.imdb_id,
              original_language: movieDetails.original_language,
              original_title: movieDetails.original_title,
              overview: movieDetails.overview,
              popularity: movieDetails.popularity,
              poster_path: movieDetails.poster_path,
              production_companies: movieDetails.production_companies.map(c => ({ id: c.id, name: c.name })),
              production_countries: movieDetails.production_countries,
              release_date: movieDetails.release_date ? new Date(movieDetails.release_date) : null,
              revenue: movieDetails.revenue,
              runtime: movieDetails.runtime,
              spoken_languages: movieDetails.spoken_languages,
              status: movieDetails.status,
              tagline: movieDetails.tagline,
              title: movieDetails.title,
              video: movieDetails.video,
              vote_average: movieDetails.vote_average,
              vote_count: movieDetails.vote_count,
            },
            cast: movieDetails.credits.cast.slice(0, 5).map(c => ({
              adult: c.adult,
              gender: c.gender,
              id: c.id,
              known_for_department: c.known_for_department,
              name: c.name,
              original_name: c.original_name,
              popularity: c.popularity,
              profile_path: c.profile_path,
              cast_id: c.cast_id,
              character: c.character,
              credit_id: c.credit_id,
              order: c.order,
            })),
          },
          { upsert: true, new: true }
        );
      }
    }

    // Fetch specific movie IDs
    for (const id of specificMovieIds) {
      try {
        const movieDetailsResponse = await axios.get(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits`);
        const movieDetails = movieDetailsResponse.data;
        await MoviesDetails.findOneAndUpdate(
          { 'details.id': id },
          {
            _id: id.toString(),
            details: {
              adult: movieDetails.adult,
              backdrop_path: movieDetails.backdrop_path,
              belongs_to_collection: movieDetails.belongs_to_collection ? movieDetails.belongs_to_collection.id : null,
              budget: movieDetails.budget,
              genres: movieDetails.genres,
              homepage: movieDetails.homepage,
              id: movieDetails.id,
              imdb_id: movieDetails.imdb_id,
              original_language: movieDetails.original_language,
              original_title: movieDetails.original_title,
              overview: movieDetails.overview,
              popularity: movieDetails.popularity,
              poster_path: movieDetails.poster_path,
              production_companies: movieDetails.production_companies.map(c => ({ id: c.id, name: c.name })),
              production_countries: movieDetails.production_countries,
              release_date: movieDetails.release_date ? new Date(movieDetails.release_date) : null,
              revenue: movieDetails.revenue,
              runtime: movieDetails.runtime,
              spoken_languages: movieDetails.spoken_languages,
              status: movieDetails.status,
              tagline: movieDetails.tagline,
              title: movieDetails.title,
              video: movieDetails.video,
              vote_average: movieDetails.vote_average,
              vote_count: movieDetails.vote_count,
            },
            cast: movieDetails.credits.cast.slice(0, 5).map(c => ({
              adult: c.adult,
              gender: c.gender,
              id: c.id,
              known_for_department: c.known_for_department,
              name: c.name,
              original_name: c.original_name,
              popularity: c.popularity,
              profile_path: c.profile_path,
              cast_id: c.cast_id,
              character: c.character,
              credit_id: c.credit_id,
              order: c.order,
            })),
          },
          { upsert: true, new: true }
        );
      } catch (error) {
        console.error(`Error importing movie ${id}:`, error.message);
      }
    }
    console.log('Movies and details imported');

    // Fetch TV Shows
    for (let page = 1; page <= 3; page++) {
      const tvResponse = await axios.get(`${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&page=${page}`);
      const tvShows = tvResponse.data.results;
      for (const show of tvShows) {
        await TVSeries.findOneAndUpdate(
          { id: show.id },
          {
            _id: show.id.toString(),
            adult: show.adult,
            backdrop_path: show.backdrop_path,
            genre_ids: show.genre_ids,
            id: show.id,
            original_language: show.original_language,
            original_title: show.original_name,
            overview: show.overview,
            popularity: show.popularity,
            poster_path: show.poster_path,
            first_air_date: show.first_air_date,
            title: show.name,
            video: false,
            vote_average: show.vote_average,
            vote_count: show.vote_count,
          },
          { upsert: true, new: true }
        );

        const tvDetailsResponse = await axios.get(`${BASE_URL}/tv/${show.id}?api_key=${TMDB_API_KEY}&append_to_response=credits`);
        const tvDetails = tvDetailsResponse.data;
        await TvSeriesDetails.findOneAndUpdate(
          { 'details.id': show.id },
          {
            _id: show.id.toString(),
            details: {
              adult: tvDetails.adult,
              backdrop_path: tvDetails.backdrop_path,
              created_by: tvDetails.created_by,
              episode_run_time: tvDetails.episode_run_time,
              first_air_date: tvDetails.first_air_date ? new Date(tvDetails.first_air_date) : null,
              genres: tvDetails.genres,
              homepage: tvDetails.homepage,
              id: tvDetails.id,
              in_production: tvDetails.in_production,
              languages: tvDetails.languages,
              last_air_date: tvDetails.last_air_date ? new Date(tvDetails.last_air_date) : null,
              last_episode_to_air: tvDetails.last_episode_to_air,
              name: tvDetails.name,
              networks: tvDetails.networks,
              number_of_episodes: tvDetails.number_of_episodes,
              number_of_seasons: tvDetails.number_of_seasons,
              origin_country: tvDetails.origin_country,
              original_language: tvDetails.original_language,
              original_name: tvDetails.original_name,
              overview: tvDetails.overview,
              popularity: tvDetails.popularity,
              poster_path: tvDetails.poster_path,
              production_companies: tvDetails.production_companies,
              production_countries: tvDetails.production_countries,
              seasons: tvDetails.seasons,
              spoken_languages: tvDetails.spoken_languages,
              status: tvDetails.status,
              tagline: tvDetails.tagline,
              vote_average: tvDetails.vote_average,
              vote_count: tvDetails.vote_count,
            },
            cast: tvDetails.credits.cast.slice(0, 5).map(c => ({
              adult: c.adult,
              gender: c.gender,
              id: c.id,
              known_for_department: c.known_for_department,
              name: c.name,
              original_name: c.original_name,
              popularity: c.popularity,
              profile_path: c.profile_path,
              character: c.character,
              credit_id: c.credit_id,
              order: c.order,
            })),
          },
          { upsert: true, new: true }
        );
      }
    }
    console.log('TV series and details imported');

    // Fetch Trending
    // const trendingResponse = await axios.get(`${BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`);
    // const trendingItems = trendingResponse.data.results;
    // for (const item of trendingItems) {
    //   await Trendings.findOneAndUpdate(
    //     { id: item.id },
    //     {
    //       _id: item.id.toString(),
    //       adult: item.adult,
    //       backdrop_path: item.backdrop_path,
    //       id: item.id,
    //       name: item.name || item.title,
    //       original_language: item.original_language,
    //       original_name: item.original_name || item.original_title,
    //       overview: item.overview,
    //       poster_path: item.poster_path,
    //       media_type: item.media_type,
    //       genre_ids: item.genre_ids,
    //       popularity: item.popularity,
    //       release_date: item.media_type === 'movie' ? item.release_date : null,
    //       first_air_date: item.media_type === 'tv' ? item.first_air_date : null,
    //       vote_average: item.vote_average,
    //       vote_count: item.vote_count,
    //       origin_country: item.origin_country || [],
    //     },
    //     { upsert: true, new: true }
    //   );
    // }
    // console.log('Trending content imported');
    await Trendings.deleteMany({}); // Clear existing data
    const trendingResponse = await axios.get(`${BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`);
    const trendingItems = trendingResponse.data.results;
    for (const item of trendingItems) {
      await Trendings.findOneAndUpdate(
        { id: item.id },
        {
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
        },
        { upsert: true, new: true }
      );
    }

    // Add specific trending items
    const specificTrendingIds = [1151039, 499255];
    for (const id of specificTrendingIds) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`
        );
        const item = response.data;
        await Trendings.findOneAndUpdate(
          { id: item.id },
          {
            _id: item.id.toString(),
            adult: item.adult,
            backdrop_path: item.backdrop_path,
            id: item.id,
            name: item.title,
            original_language: item.original_language,
            original_name: item.original_title,
            overview: item.overview,
            poster_path: item.poster_path,
            media_type: 'movie',
            genre_ids: item.genre_ids,
            popularity: item.popularity,
            release_date: item.release_date,
            first_air_date: null,
            vote_average: item.vote_average,
            vote_count: item.vote_count,
            origin_country: [],
          },
          { upsert: true, new: true }
        );
      } catch (error) {
        console.error(`Error importing trending movie ${id}:`, error.message);
      }
    }
    console.log('Trending content imported');

    // Fetch Recommended
    const sampleIds = [
      movies[0]?.id,
      movies[1]?.id,
      tvShows[0]?.id,
      tvShows[1]?.id,
    ].filter(Boolean);
    for (const sampleId of sampleIds) {
      const mediaType = movies.find(m => m.id === sampleId) ? 'movie' : 'tv';
      const recommendedResponse = await axios.get(`${BASE_URL}/${mediaType}/${sampleId}/recommendations?api_key=${TMDB_API_KEY}`);
      const recommendedItems = recommendedResponse.data.results;
      for (const item of recommendedItems) {
        await Recommended.findOneAndUpdate(
          { id: item.id },
          {
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
          },
          { upsert: true, new: true }
        );
      }
    }
    console.log('Recommended content imported');

    console.log('Data import completed');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error importing data:', error);
    mongoose.connection.close();
  }
}