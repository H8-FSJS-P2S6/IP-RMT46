const app = require("../app.js");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");
const { User } = require("../models");

describe("get /users", () => {
    describe("Success", () => {
        test("should return status 200 and object of user", async () => {
            let { status, body } = await request(app)
                .get("/users")
                .set("Authorization", `Bearer ${access_token}`)
            expect(status).toBe(200);
            expect(body).toHaveProperty("name", expect.any(String));
            expect(body).toHaveProperty("email", expect.any(String));
            expect(body).toHaveProperty("role", expect.any(String));
            expect(body).toHaveProperty("imageUrl", expect.any(String));
        })
    })
    describe("Failed", () => {
        test("should return status 401 and token is required", async () => {
            let { status, body } = await request(app)
            .get("/users")
                .set("Authorization", `Bearer ${damaged_token}`)
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
        })
        test("should return status 400 and invalid token", async () => {
            let { status, body } = await request(app)
            .get("/users")
                
                .set("Authorization", `Beare ${access_token}`)
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
        })
    })
})

beforeAll(async () => {
    await queryInterface.bulkInsert("Users", [{
        name: "test",
    email: "test@gmail.com",
    password: hashPassword("admin"),
    role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date()
    }])
    const admin = await User.findOne({ where: { email: "test@gmail.com" } });
    access_token = signToken({ id: admin.id });
    damaged_token = signToken({ id: admin.id });
    damaged_token += "i";

})

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})