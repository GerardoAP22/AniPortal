const Anime = require('../models/anime');
const User = require('../models/user');

module.exports = {
    index,
    show,
    addToList,
    deleteFromList,
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

async function addToList(req, res) {
    const anime = await Anime.findById(req.params.id);
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user.mylist.includes(anime._id)) {
        user.mylist.push(anime._id);
        await user.save();
    }
    res.render('animes/show', { title: 'Anime Detail', anime });
}

async function deleteFromList(req, res) {
    const animeId = req.params.id;
    const userId = req.user.id;
    let user = await User.findById(userId);
    user.mylist.remove(animeId);
    await user.save();
    res.redirect('/users');
};
