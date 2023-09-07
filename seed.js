const mongoose = require('mongoose');
const Anime = require('./models/anime');
const animeData = require('./anime_data.json');
require('dotenv').config();
const db = require('./config/database');

async function seedAnimes() {
    try {
        await Anime.deleteMany();
        const aniData = animeData.data.map(item => {
            const image = item.images.jpg.image_url;
            const title = (item.title_english !== null) ? item.title_english : item.title;
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

        for (const anime of aniData) {
            try {
            // Insert each anime document individually into MongoDB
            await Anime.create(anime);
            console.log(`Anime "${anime.title}" seeded successfully`);
        } catch (insertionError) {
            console.error(`Error seeding anime "${anime.title}":`, insertionError);
        }
    }

        console.log('Animes have been seeded successfully');
    } catch (error) {
        console.error('Error seeding Animes:', error);
    } finally {
        mongoose.connection.close();
    }
}
seedAnimes();