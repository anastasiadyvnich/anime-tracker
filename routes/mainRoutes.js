const express = require('express');
const router = express.Router();
const MainController = require('../controllers/MainController');
const MoviesController = require('../controllers/MoviesController');

router.get('/', MainController.getHomePage);
router.get('/about', MainController.getAboutPage);
router.post('/api/movies/watched', MoviesController.toggleWatchedStatus);

module.exports = router;
