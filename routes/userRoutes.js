const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/profile/:id", UserController.getProfilePage);

module.exports = router;
