const request = require("supertest");
const express = require("express");
const mainRoutes = require("../routes/mainRoutes");

// Mock Controllers
jest.mock("../controllers/mainController", () => ({
  getHomePage: jest.fn((req, res) => res.status(200).send("Home Page")),
  getAboutPage: jest.fn((req, res) => res.status(200).send("About Page")),
}));

jest.mock("../controllers/moviesController", () => ({
  toggleWatchedStatus: jest.fn((req, res) =>
    res.status(200).send("Watched status toggled"),
  ),
}));

const app = express();
app.use(express.json());
app.use("/", mainRoutes);

describe("Main Routes", () => {
  it("GET / should return home page", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Home Page");
  });

  it("GET /about should return about page", async () => {
    const res = await request(app).get("/about");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("About Page");
  });

  it("POST /api/movies/watched should toggle watched status", async () => {
    const res = await request(app)
      .post("/api/movies/watched")
      .send({ movieId: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Watched status toggled");
  });
});
