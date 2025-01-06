const MovieModel = require("../models/movieModel");

exports.toggleWatchedStatus = async (req, res) => {
  const { movieId, isWatched } = req.body;

  if (!req.isAuthenticated || !req.user) {
    return res.status(401).send("Користувач не авторизований.");
  }

  try {
    const userId = req.user.id;

    if (isWatched === "true") {
      await MovieModel.markAsWatched(userId, movieId);
    } else {
      await MovieModel.unmarkAsWatched(userId, movieId);
    }

    res.status(200).send("Статус оновлено.");
  } catch (error) {
    res.status(500).send("Помилка при оновленні статусу.");
  }
};
