const mongoose = require('mongoose');

const tvSeriesSchema = new mongoose.Schema({
    _id: String,
    adult: Boolean,
    backdrop_path: String,
    genre_ids: [Number],
    id: Number,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number
});

const TVSeries = mongoose.model('TVSeries', tvSeriesSchema);

module.exports = TVSeries;



