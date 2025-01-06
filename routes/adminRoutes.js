const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const isAdmin = require("../middleware/isAdmin");

router.get("/", isAdmin, AdminController.getDashboard);

router.post("/add-movie", isAdmin, AdminController.addMovie);

module.exports = router;
