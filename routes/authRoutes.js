const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

router.get("/register", (req, res) => {
  res.render("register", { title: "Реєстрація" });
});

router.post("/register", AuthController.register);

router.get("/login", (req, res) => {
  res.render("login", { title: "Увійти" });
});

router.post("/login", AuthController.login);

router.post("/logout", AuthController.logout);

module.exports = router;
