const mongoose = require('mongoose');

// Define the schema
const recommendedSchema = new mongoose.Schema({
    _id: String,
    adult: Boolean,
    backdrop_path: String,
    id: Number,
    name: String,
    original_language: String,
    original_name: String,
    overview: String,
    poster_path: String,
    media_type: String,
    genre_ids: [Number],
    popularity: Number,
    first_air_date: Date,
    vote_average: Number,
    vote_count: Number,
    origin_country: [String]
});
const Recommended = mongoose.model('Recommended', recommendedSchema);
module.exports = Recommended;