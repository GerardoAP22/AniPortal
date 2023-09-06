const express = require('express');
const router = express.Router();
const Anime = require('../models/anime');
const animesCtrl = require('../controllers/animes');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const anime = require('../models/anime');

router.get('/', async function (req, res, next) {
    try {
        const response = await fetch('https://api.jikan.moe/v4/anime');
        if (response.ok) {
            const apiData = await response.json();
            const animeData = apiData.data.map(item => {
                const image = item.images.jpg.image_url;
                const title = item.title;
                const type = item.type;
                const synopsis = item.synopsis;
                const episodeCount = item.episodes;
                const releaseSeason = item.season;
                const releaseYear = item.year;
                const genre = item.genres.map(g => g.name); // Use map to create an array of genre names
                const rating = item.rating;
                const currentlyAiring = item.airing;
                return { image, title, type, synopsis, episodeCount, releaseSeason, releaseYear, genre, rating, currentlyAiring };
            });

            await Anime.deleteMany();

            for (const anime of animeData) {
                // Insert each anime document individually into MongoDB
                await Anime.create(anime);
            }

            // res.render('animes/index', { title: 'All Animes', anime });
            next();
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/', animesCtrl.index);
router.get('/:id', animesCtrl.show);

module.exports = router;
