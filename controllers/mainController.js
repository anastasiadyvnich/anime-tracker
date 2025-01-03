const MovieModel = require('../models/MovieModel');

exports.getHomePage = async (req, res) => {
    try {
        const movies = await MovieModel.getAllMovies();
        let watchedMovies = [];

        if (req.isAuthenticated && req.user) {
            watchedMovies = await MovieModel.getWatchedMovies(req.user.id);
			console.log('watchedMovies:', watchedMovies);
        }

        res.render('home', {
            title: 'Головна сторінка',
            movies,
            watchedMovies,
            user: req.user
        });
    } catch (error) {
        console.error('Error rendering home page:', error.message);
        res.status(500).send('Помилка при завантаженні сторінки.');
    }
};

exports.getAboutPage = (req, res) => {
 res.render('about', {title: 'Про проект!'});
};
