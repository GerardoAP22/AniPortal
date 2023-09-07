const User = require('../models/user');
const Anime = require('../models/anime');

module.exports = {
    index,
};

async function index(req, res) {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("mylist");
    res.render('users/index', { title: 'My Anime List', user});
}


