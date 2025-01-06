const UserModel = require("../models/userModel");
const MovieModel = require("../models/movieModel");

// Відображення адмінської панелі (список користувачів)
exports.getDashboard = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.render("admin_dashboard", { users, title: "Про проект!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Помилка під час завантаження панелі адміністратора");
  }
};

// Додавання нового фільму
exports.addMovie = async (req, res) => {
  const { title, description, releaseDate } = req.body;
  try {
    await MovieModel.addMovie(
      title,
      description,
      parseInt(releaseDate.split("-")[0]),
    );
    res.redirect("/admin");
  } catch (error) {
    console.error(error);
    res.status(500).send("Помилка при додаванні фільму");
  }
};
