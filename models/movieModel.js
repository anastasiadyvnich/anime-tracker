const dbProvider = require('./dbProvider');
const db = dbProvider.getSQLiteConnection();

class MovieModel {
    static createTable() {
        db.run(`
            CREATE TABLE IF NOT EXISTS movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                releaseYear INTEGER
            )
        `, (err) => {
            if (err) {
                console.error('Error creating movies table:', err.message);
            } else {
                console.log('Movies table ready.');
            }
        });
    }

    static addMovie(title, description, releaseYear) {
		if (typeof title !== "string" || typeof description !== "string" || typeof releaseYear !== "number") {
			return Promise.reject(new Error("Некоректні дані додавання фільму."));
		}

		const query = `INSERT INTO movies (title, description, releaseYear) VALUES (?, ?, ?)`;
		return new Promise((resolve, reject) => {
			db.run(query, [title, description, releaseYear], function (err) {
				if (err) {
					return reject(err);
				}
				resolve(this.lastID);
			});
		});
	}

    static getAllMovies() {
        const query = `SELECT * FROM movies`;
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
	
	static createWatchedTable() {
        db.run(`
            CREATE TABLE IF NOT EXISTS watched_movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                movie_id INTEGER NOT NULL,
				UNIQUE(user_id, movie_id),
                FOREIGN KEY (movie_id) REFERENCES movies (id)
            )
        `, (err) => {
            if (err) {
                console.error('Error creating watched_movies table:', err.message);
            } else {
                console.log('Watched movies table ready.');
            }
        });
    }
	
	static markAsWatched(userId, movieId) {
        const query = `INSERT INTO watched_movies (user_id, movie_id) VALUES (?, ?)`;
        return new Promise((resolve, reject) => {
            db.run(query, [userId, movieId], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }

    static unmarkAsWatched(userId, movieId) {
        const query = `DELETE FROM watched_movies WHERE user_id = ? AND movie_id = ?`;
        return new Promise((resolve, reject) => {
            db.run(query, [userId, movieId], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }

    static getWatchedMovies(userId) {
        const query = `SELECT movie_id FROM watched_movies WHERE user_id = ?`;
        return new Promise((resolve, reject) => {
            db.all(query, [userId], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows.map(row => row.movie_id));
            });
        });
    }
}

module.exports = MovieModel;
