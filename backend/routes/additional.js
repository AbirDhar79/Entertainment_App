const express = require("express");
const router = express.Router();
const Trending = require("../models/Trending");
const Recommended = require('../models/Recommended')
router.get("/trending", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 16;
    const totalDocuments = await Trending.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    try {
        const trending = await Trending.find()
            .skip((page - 1) * limit)
            .limit(limit);
        // console.log("Trending Data:", trending);
        res.json({ trending, totalPages, totalDocuments, currentPage: page });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ message: "Error fetching movies from database." });
    }
});

router.get("/recommended", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const totalDocuments = await Recommended.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    try {
        const recommended = await Recommended.find()
            .skip((page - 1) * limit)
            .limit(limit);
        // console.log("Trending Data:", trending);
        res.json({ recommended, totalPages, totalDocuments, currentPage: page });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ message: "Error fetching movies from database." });
    }
});
module.exports = router;
