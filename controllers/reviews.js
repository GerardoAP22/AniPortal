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
    res.status(404).send('An error occurred while Adding the review');
  }
}

async function deleteReview(req, res) {
  try {
    const anime = await Anime.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
    if (!anime) return res.redirect('/animes');
    anime.reviews.remove(req.params.id);
    await anime.save();
    res.redirect(`/animes/${anime._id}`);
    } catch(err) {
    console.log(err);
    res.status(404).send('An error occurred while Deleting the review');
  }
}

async function editReview(req, res) {
    try {
        const reviewId = req.params.id; 
        console.log(reviewId);
        const anime = await Anime.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
        if (!anime) {
            return res.status(404).send('Anime not found');
        };
        const reviewToUpdate = anime.reviews.find((review) =>
            review._id.equals(reviewId)
        );
        if (!reviewToUpdate) {
            return res.status(404).send('Review not found');
        }
        reviewToUpdate.content = req.body.content;
        reviewToUpdate.rating = req.body.rating;
        await anime.save();
        res.redirect(`/animes/${anime._id}`);
        } catch(err) {
        console.error(err);
        res.status(500).send('An error occurred while updating the review');
      }
}