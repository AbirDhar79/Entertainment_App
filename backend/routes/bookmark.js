const express = require('express');
const Bookmark = require('../models/Bookmark')
const decode = require('../middleware/index');
const Movie = require('../models/Movies')
const TvSeries = require('../models/TvSeries')
const Trendings = require('../models/Trending');
const Recommended = require('../models/Recommended');


const router = express.Router();
router.post('/', decode, async (req, res) => {
    const userId = req.body.firebaseId;

    try {
        const userBookmarks = await Bookmark.findOne({ firebaseId: userId });

        if (!userBookmarks) {
            return res.status(404).json([{ message: 'User not found or has no bookmarks' }]);
        }

        const movieBookmarkIds = new Set(userBookmarks.bookmark
            .filter(item => item.mediatype === 'movies')
            .map(item => item.id));
        const tvSeriesBookmarkIds = new Set(userBookmarks.bookmark
            .filter(item => item.mediatype === 'tvseries')
            .map(item => item.id));

        // Find movies in Movie schema
        let movies = await Movie.find({ id: { $in: [...movieBookmarkIds] } });
        // If some movies are not found, look for them in Trending and Recommended schemas
        const missingMovieIds = [...movieBookmarkIds].filter(id => !movies.map(movie => movie.id).includes(id));
        if (missingMovieIds.length > 0) {
            const trendingMovies = await Trendings.find({ id: { $in: missingMovieIds } });
            const recommendedMovies = await Recommended.find({ id: { $in: missingMovieIds } });
            movies = [...movies, ...trendingMovies, ...recommendedMovies];
        }

        // Find TV series in TVSeries schema
        let tvSeries = await TVSeries.find({ id: { $in: [...tvSeriesBookmarkIds] } });
        // If some TV series are not found, look for them in Trending and Recommended schemas
        const missingTvSeriesIds = [...tvSeriesBookmarkIds].filter(id => !tvSeries.map(series => series.id).includes(id));
        if (missingTvSeriesIds.length > 0) {
            const trendingTvSeries = await Trendings.find({ id: { $in: missingTvSeriesIds } });
            const recommendedTvSeries = await Recommended.find({ id: { $in: missingTvSeriesIds } });
            tvSeries = [...tvSeries, ...trendingTvSeries, ...recommendedTvSeries];
        }

        // Send the combined results
        res.status(200).json([...movies, ...tvSeries]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to load bookmarks' });
    }
});


router.post('/add', decode, async (req, res) => {
    const { movieId, firebaseId, email, mediaType } = req.body;

    try {
        let user = await Bookmark.findOne({ firebaseId });

        if (!user) {
            user = await Bookmark.create({ firebaseId, email, bookmark: [] });
        }

        const bookmarkExists = user.bookmark.some(item =>
            item.id === movieId && item.mediatype.toLowerCase() === mediaType.toLowerCase()
        );

        if (!bookmarkExists) {
            user.bookmark.push({ id: movieId, mediatype: mediaType });
            await user.save();
            res.status(200).json({ message: "Added bookmark Successfully" });
        } else {
            res.status(200).json({ message: "Bookmark already exists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add bookmark' }); // Handle errors properly
    }
});

router.post('/remove', decode, async (req, res) => {
    const { movieId, firebaseId, mediaType } = req.body;

    try {
        // Find the user
        const user = await Bookmark.findOne({ firebaseId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove the bookmark matching both movieId and mediaType
        user.bookmark = user.bookmark.filter(item => item.id !== movieId || item.mediatype !== mediaType);

        // Save the updated user
        await user.save();

        res.status(200).json({ message: "Removed bookmark Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to remove bookmark' });
    }
});



module.exports = router;


