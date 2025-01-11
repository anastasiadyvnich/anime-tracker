const request = require("supertest");
const express = require("express");
const userRoutes = require("../routes/userRoutes");

// Mock Controller
jest.mock("../controllers/userController", () => ({
  getProfilePage: jest.fn((req, res) =>
    res.status(200).send(`Profile page for user ${req.params.id}`),
  ),
}));

const app = express();
app.use(express.json());
app.use("/user", userRoutes);

describe("User Routes", () => {
  it("GET /user/profile/:id should return profile page", async () => {
    const res = await request(app).get("/user/profile/1");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Profile page for user 1");
  });
});
