const mongoose = require('mongoose');

// Define the movie details schema
const moviedetailsSchema = new mongoose.Schema({
    _id: String,
    details: {
        adult: Boolean,
        backdrop_path: String,
        belongs_to_collection: String,
        budget: Number,
        genres: [{
            id: Number,
            name: String
        }],
        homepage: String,
        id: Number,
        imdb_id: String,
        original_language: String,
        original_title: String,
        overview: String,
        popularity: Number,
        poster_path: String,
        production_companies: [{
            id: Number,
            name: String
        }],
        production_countries: [{
            iso_3166_1: String,
            name: String
        }],
        release_date: Date,
        revenue: Number,
        runtime: Number,
        spoken_languages: [{
            iso_639_1: String,
            name: String
        }],
        status: String,
        tagline: String,
        title: String,
        video: Boolean,
        vote_average: Number,
        vote_count: Number,
    },
    cast: [{
        adult: Boolean,
        gender: Number,
        id: Number,
        known_for_department: String,
        name: String,
        original_name: String,
        popularity: Number,
        profile_path: String,
        cast_id: Number,
        character: String,
        credit_id: String,
        order: Number
    }]
});

// Create the MovieDetails model
const MoviesDetails = mongoose.model('MoviesDetails', moviedetailsSchema);
module.exports = MoviesDetails; 