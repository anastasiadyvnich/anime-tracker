const UserModel = require("../models/UserModel");

exports.getRegisterPage = (req, res) => {
  res.render("register", { title: "Реєстрація" });
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await UserModel.createUser(name, email, password);
    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Помилка під час реєстрації");
  }
};

exports.getLoginPage = (req, res) => {
  res.render("login", { title: "Авторизація" });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.authenticate(email, password);
    if (user) {
      req.session.user = user;
      res.redirect(`/profile/${user.id}`);
    } else {
      res.status(401).send("Невірний логін або пароль");
    }
  } catch (error) {
    res.status(500).send("Помилка авторизації");
  }
};

exports.getProfilePage = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.getUserById(userId);

    if (!user) {
      return res.status(404).send("Користувач не знайдено");
    }

    res.render("profile", { title: "Профіль користувача", user });
  } catch (error) {
    res.status(500).send("Помилка під час завантаження профілю");
  }
};
