const UserModel = require("../models/UserModel");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Усі поля є обов язковими для заповнення.");
  }

  try {
    await UserModel.createUser({ name, email, password });
    res.redirect("/auth/login");
  } catch (error) {
    res.status(500).send("Помилка під час реєстрації");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.authenticate(email, password);
    if (user) {
      req.session.user = user;
      res.redirect(`/user/profile/${user.id}`);
    } else {
      console.warn(
        "Невірний email або пароль для користувача:",
        password + " .... " + email,
      );
      res.status(401).send("Невірний email або пароль");
    }
  } catch (error) {
    console.error("Помилка при авторизації:", error);
    res.status(500).send("Помилка на вході!");
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
