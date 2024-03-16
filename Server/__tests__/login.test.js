const app = require("../app.js");
const request = require("supertest");
const {sequelize} = require("../models");
const {queryInterface} = sequelize;
const {hashPassword} = require("../helpers/bcrypt.js");
const {signToken} = require("../helpers/jwt.js");

let user_1 = {
    email: "admin@gmail.com",
    password: "admin"
}

describe.skip("post /login", () => {
    describe("Success", () => {
        test("should return status 200 and access token", async () => {
            let {status, body} = await request(app)
            .post("/login")
            .send(user_1)
            expect(status).toBe(200);
            expect(body).toHaveProperty("access_token", expect.any(String));
        })
    })
    describe("Failed", () => {
        test("should return status 400 and invalid email", async() => {
            let {status, body} = await request(app)
            .post("/login")
            .send({email: "staff@gmail.com", password: user_1.password})
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid email or password");
        })
        test("should return status 400 and invalid password", async() => {
            let {status, body} = await request(app)
            .post("/login")
            .send({email: user_1.email, password: "staff"})
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid email or password");
        })
        test("should return status 400 when no email is given", async() => {
            let {status, body} = await request(app)
            .post("/login")
            .send({email: "", password: user_1.password})
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Email is required");
        })
        test("should return status 400 when no password is given", async() => {
            let {status, body} = await request(app)
            .post("/login")
            .send({email: user_1.email, password: ""})
            console.log(body, "from login.test.js")
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Password is required");
        })
    })
})

beforeAll(async() => {
        await queryInterface.bulkInsert("Users", [{
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword("admin"),
            role: "Admin",
            createdAt: new Date(),
            updatedAt: new Date()
    }])
})

afterAll(async() => {
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})