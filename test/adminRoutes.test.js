const request = require("supertest");
const express = require("express");
const adminRoutes = require("../routes/adminRoutes");

// Mock Middleware and Controller
jest.mock("../middleware/isAdmin", () => jest.fn((req, res, next) => next()));
jest.mock("../controllers/adminController", () => ({
  getDashboard: jest.fn((req, res) => res.status(200).send("Admin Dashboard")),
  addMovie: jest.fn((req, res) => res.status(201).send("Movie added")),
}));

const app = express();
app.use(express.json());
app.use("/admin", adminRoutes);

describe("Admin Routes", () => {
  it("GET /admin/ should return admin dashboard", async () => {
    const res = await request(app).get("/admin/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Admin Dashboard");
  });

  it("POST /admin/add-movie should add a movie", async () => {
    const res = await request(app)
      .post("/admin/add-movie")
      .send({ title: "New Movie" });
    expect(res.statusCode).toBe(201);
    expect(res.text).toBe("Movie added");
  });
});
