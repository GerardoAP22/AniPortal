const Anime = require('../models/anime');
const ANIME_URL = 'https://api.jikan.moe/v4/anime';

module.exports = {
    index,
    show,
};

async function index(req, res) {
    const animes = await Anime.find({});
    res.render('animes/index', { title: 'All Animes', animes });
}

async function show(req, res) {
    const anime = await Anime.findById(req.params.id);
    console.log(req.params.id);
    console.log(anime);
    res.render('animes/show', { title: 'Anime Detail', anime }); 
}