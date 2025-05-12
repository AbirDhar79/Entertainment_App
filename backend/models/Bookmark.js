const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    firebaseId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
    },
    bookmark: [{
        id: Number,
        mediatype: String
    }]
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
