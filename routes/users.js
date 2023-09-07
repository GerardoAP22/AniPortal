var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users')
const ensureLoggedIn = require('../config/ensureLoggedIn');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', ensureLoggedIn, usersCtrl.index);

module.exports = router;
