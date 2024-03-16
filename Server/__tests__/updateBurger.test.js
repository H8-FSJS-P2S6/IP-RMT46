const app = require("../app.js");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");
const { User } = require("../models");

let user_1 = {
    name: "Admin1",
    email: "admin1@gmail.com",
    password: "admin",
    role: "Admin"
}

let user_2 = {
    name: "Customer",
    email: "customer@gmail.com",
    password: "customer",
    role: "Customer"
}

let access_token_user_1;
let access_token_user_2;

describe("put /burgers/1", () => {
    describe("Success", () => {
        test("should return status 200 and message that the burger has been updated", async () => {
            const burgerData = {
                name: "Test",
                desc: "sit amet justo morbi ut odio cras mi pede malesuada in imperdiet",
                price: 50000,
                veg: false,
                images: "Test"
            }
            let { status, body } = await request(app)
                .put("/burgers/1")
                .set("Authorization", `Bearer ${access_token_user_1}`)
                .send(burgerData)
            expect(status).toBe(200);
            expect(body).toHaveProperty("message", "Burger has been updated");
        })
    })
    describe("Failed", () => {
        test("should return status 401 and invalid token", async () => {
            let { status, body } = await request(app)
                .put("/burgers/1")
                .send({
                    name: "Test",
                desc: "sit amet justo morbi ut odio cras mi pede malesuada in imperdiet",
                price: 50000,
                veg: false,
                images: "Test"
                })
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
        })
        test("should return status 400 and name is required", async () => {
            let { status, body } = await request(app)
                .put("/burgers/1")
                .set("Authorization", `Bearer ${access_token_user_1}`)
                .send({
                    name: "",
                desc: "sit amet justo morbi ut odio cras mi pede malesuada in imperdiet",
                price: 50000,
                veg: false,
                images: "Test"
                })
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Name is required");
        })
        test("should return status 401 and token is required", async () => {
            let { status, body } = await request(app)
                .put("/burgers/1")
                .set("Authorization", `Bearer ${damaged_token_user_1}`)
                .send({
                    name: "Test",
                desc: "sit amet justo morbi ut odio cras mi pede malesuada in imperdiet",
                price: 50000,
                veg: false,
                images: "Test"
                })
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
        })
        test("should return status 400 and invalid token", async () => {
            let { status, body } = await request(app)
                .put("/burgers/1")
                .set("Authorization", `Beare ${access_token_user_1}`)
                .send({
                    name: "Test",
                desc: "sit amet justo morbi ut odio cras mi pede malesuada in imperdiet",
                price: 50000,
                veg: false,
                images: "Test"
                })
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
        })
        test("should return status 404 and burger not available", async () => {
            let { status, body } = await request(app)
                .put("/burgers/30")
                .set("Authorization", `Bearer ${access_token_user_1}`)
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", "Data not found");
        })
        test("should return status 403 and forbidden", async () => {
            let { status, body } = await request(app)
                .put("/burgers/1")
                .set("Authorization", `Bearer ${access_token_user_2}`)
                .send({
                    name: "Test",
                desc: "sit amet justo morbi ut odio cras mi pede malesuada in imperdiet",
                price: 50000,
                veg: false,
                images: "Test"
                })
            expect(status).toBe(403);
            expect(body).toHaveProperty("message", "Forbidden");
        })
    })
})

beforeAll(async () => {
    await queryInterface.bulkInsert("Users", [{
        name: user_1.name,
        email: user_1.email,
        password: hashPassword(user_1.password),
        role: user_1.role,
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        name: user_2.name,
        email: user_2.email,
        password: hashPassword(user_2.password),
        role: user_2.role,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    ])

    const admin = await User.findOne({ where: { email: user_1.email } });
    access_token_user_1 = signToken({ id: admin.id });
    damaged_token_user_1 = signToken({ id: admin.id });
    damaged_token_user_1 += "i";

    const customer = await User.findOne({ where: { email: user_2.email } });
    access_token_user_2 = signToken({ id: customer.id });
    damaged_token_user_2 = signToken({ id: customer.id });
    damaged_token_user_2 += "i";
    
    await queryInterface.bulkInsert("burgers", require("../data/burgersWithoutIngredients.json").map((el) => {
        el.createdAt = el.updatedAt = new Date();
        el.UserId = 1
        return el;
    }))
})


afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})