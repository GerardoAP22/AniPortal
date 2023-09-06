const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: 5,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    userAvatar: String, 
}, {
    timestamps: true
});

const animeSchema = new Schema({
    image: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    synopsis: {
        type: String,
    },
    episodeCount: {
        type: Number,
    },
    releaseSeason: {
        type: String,
    },
    releaseYear: {
        type: Number,
        min: 1917,
    },
    genre: {
        type: Array,
    },
    rating: {
        type: String,
    },
    currentlyAiring: {
        type: Boolean,
        defualt: false
    },
    reviews: [reviewSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Anime', animeSchema);