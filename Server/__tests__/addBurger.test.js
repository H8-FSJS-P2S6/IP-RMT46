const app = require("../app.js");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");
const { User } = require("../models");

describe("post /burgers/add", () => {
    describe("Success", () => {
        test("should return status 201 and burgers data", async () => {
            const burgerData = {
                name: "Test",
                desc: "sit amet justo morbi ut odio cras mi pede malesuada in imperdiet",
                price: 50000,
                veg: false,
                images: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Bacon-Egg-Cheese-Biscuit-Regular-Size-Biscuit-1:product-header-desktop?wid=829&hei=455&dpr=off"
            }
            let { status, body } = await request(app)
                .post("/burgers/add")
                .set("Authorization", `Bearer ${access_token}`)
                .send(burgerData)
            console.log(body.burgerData, "<<<<<<")
            expect(status).toBe(201);
            expect(body.burgerData).toHaveProperty("name", burgerData.name);
            expect(body.burgerData).toHaveProperty("desc", burgerData.desc);
            expect(body.burgerData).toHaveProperty("price", burgerData.price);
            expect(body.burgerData).toHaveProperty("veg", burgerData.veg);
            expect(body.burgerData).toHaveProperty("images", burgerData.images);
            expect(body.burgerData).toHaveProperty("createdAt", expect.any(String));
            expect(body.burgerData).toHaveProperty("updatedAt", expect.any(String));
        })
    })
    describe("Failed", () => {
        test("should return status 401 and invalid token", async () => {
            let { status, body } = await request(app)
                .post("/burgers/add")
                .send({
                    name: "Test",
                    desc: "sit amet justo morbi ut odio cras mi pede malesuada in imperdiet",
                    price: 50000,
                    veg: false,
                    images: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Bacon-Egg-Cheese-Biscuit-Regular-Size-Biscuit-1:product-header-desktop?wid=829&hei=455&dpr=off"
                })
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
        })
        test("should return status 400 and name is required", async () => {
            let { status, body } = await request(app)
                .post("/burgers/add")
                .set("Authorization", `Bearer ${access_token}`)
                .send({
                    name: "",
                    desc: "sit amet justo morbi ut odio cras mi pede malesuada in imperdiet",
                    price: 50000,
                    veg: false,
                    images: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Bacon-Egg-Cheese-Biscuit-Regular-Size-Biscuit-1:product-header-desktop?wid=829&hei=455&dpr=off",
                })
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Name is required");
        })
        test("should return status 401 and invalid token", async () => {
            let { status, body } = await request(app)
                .post("/burgers/add")
                .set("Authorization", `Bearer ${damaged_token}`)
                .send({
                    name: "Test",
                    desc: "sit amet justo morbi ut odio cras mi pede malesuada in imperdiet",
                    price: 50000,
                    veg: false,
                    images: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Bacon-Egg-Cheese-Biscuit-Regular-Size-Biscuit-1:product-header-desktop?wid=829&hei=455&dpr=off"
                })
                console.log(body, "<<<<< from addBurgerTest")
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
        })
        test("should return status 401 and invalid token", async () => {
            let { status, body } = await request(app)
                .post("/burgers/add")
                .set("Authorization", `Beare ${access_token}`)
                .send({
                    name: "Test",
                    desc: "sit amet justo morbi ut odio cras mi pede malesuada in imperdiet",
                    price: 50000,
                    veg: false,
                    images: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Bacon-Egg-Cheese-Biscuit-Regular-Size-Biscuit-1:product-header-desktop?wid=829&hei=455&dpr=off"
                })
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