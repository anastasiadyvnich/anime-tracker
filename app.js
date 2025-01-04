const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const mainRoutes = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Конфігурація EJS
app.engine("ejs", require("ejs").__express);

// Налаштування сесій
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 600 * 600,
    },
  }),
);

// Налаштування middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
  } else {
    req.user = null;
  }

  res.locals.user = req.user;

  next();
});

app.use((req, res, next) => {
  req.isAuthenticated = () => !!req.user;
  next();
});

app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
