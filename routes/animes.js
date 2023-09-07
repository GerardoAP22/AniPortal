const express = require('express');
const router = express.Router();
const animesCtrl = require('../controllers/animes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', animesCtrl.index);
router.get('/:id', animesCtrl.show);
router.post('/:id', animesCtrl.addToList);
router.delete('/:id', animesCtrl.deleteFromList);

module.exports = router;
