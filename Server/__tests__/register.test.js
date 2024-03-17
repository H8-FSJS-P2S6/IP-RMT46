const app = require("../app.js");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");
const { User } = require("../models");

let access_token;
let damaged_token;

let user_1 = {
    name: "Admin1",
    email: "admin1@gmail.com",
    password: "admin",
    role: "Admin"
}

describe("post /register", () => {
    describe("Success", () => {
        test("should return status 201 and object of new user", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send(user_1)
            expect(status).toBe(201);
            expect(body).toHaveProperty("name", user_1.name);
            expect(body).toHaveProperty("email", user_1.email);
            expect(body).toHaveProperty("role", user_1.role);
        })
    })
    describe("Failed", () => {
        test("should return status 400 and email is required", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send({
                    name: "Admin1",
                    password: "admin",
                    role: "Admin"
                })
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Email is required");
        })
        test("should return status 400 and password is required", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send({
                    name: "Admin1",
    email: "admin1@gmail.com",
    role: "Admin"
                })
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Password is required");
        })
        test("should return status 400 and email is already registered", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send({
                    name: "Admin1",
    email: "admin1@gmail.com",
    password: "admin",
    role: "Admin"
                })
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Email is already registered");
        })
        test("should return status 400 and invalid email format", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send({
                    name: "Admin1",
    email: "admin1",
    password: "admin",
    role: "Admin"
                })
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Invalid email format");
        })
    })
})

beforeAll(async () => {
    await queryInterface.bulkInsert("Users", [{
        name: "test",
    email: "test@gmail.com",
    password: "admin",
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