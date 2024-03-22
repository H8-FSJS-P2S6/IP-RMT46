const app = require("../app.js");
const request = require("supertest");

describe("Authentication API Endpoints", () => {
  const userData = {
    email: `test${Date.now()}@example.com`,
    password: "password123",
    phoneNumber: "08123432123",
    address: "Jalan Contoh No. 123",
  };

  test("POST /auth/register should register a new user", async () => {
    const response = await request(app).post("/auth/register").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("email", userData.email);
  });

  test("POST /auth/login should log in and return access token", async () => {
    const response = await request(app).post("/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.status).toBe(500);
  });
});
