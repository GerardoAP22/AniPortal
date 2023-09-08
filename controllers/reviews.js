const Anime = require('../models/anime');

module.exports = {
  create,
  delete: deleteReview,
  put: editReview,
};

async function create(req, res) {
  const anime = await Anime.findById(req.params.id);
  // We can push (or unshift) subdocs into Mongoose arrays
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  anime.reviews.push(req.body);
  try {
    // Save any changes made to the movie doc
    await anime.save();
    res.redirect(`/animes/${anime._id}`);
  } catch (err) {
    console.log(err);
  }
}

async function deleteReview(req, res) {
  try {
    console.log('req.params.id');
    const anime = await Anime.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
    if (!anime) return res.redirect('/animes');
    anime.reviews.remove(req.params.id);
    await anime.save();
    res.redirect(`/animes/${anime._id}`);
    } catch(err) {
    console.log(err);
  }
}

async function editReview(req, res) {

}