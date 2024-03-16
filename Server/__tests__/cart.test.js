const app = require("../app.js");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");
const { User } = require("../models");

let user_1 = {
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin",
    role: "Admin"
}

let access_token_user_1;

describe("get /mycart", () => {
    describe("Success", () => {
        test("should return status 200 and object of burger", async () => {
            let { status, body } = await request(app)
            .get("/mycart")
            .set("Authorization", `Bearer ${access_token_user_1}`)
            console.log(body[0], "<<<")
            expect(status).toBe(200);
            expect(body).not.toHaveLength(0);
            expect(body[0]).toHaveProperty("quantity", expect.any(Number));
            expect(body[0]).toHaveProperty("UserId", expect.any(Number));
            expect(body[0]).toHaveProperty("BurgerId", expect.any(Number));
            expect(body[0]).toHaveProperty("purchased", expect.any(Boolean));
            expect(body[0]).toHaveProperty("purchasedAt", expect.any(String));
            expect(body[0]).toHaveProperty("createdAt", expect.any(String));
            expect(body[0]).toHaveProperty("updatedAt", expect.any(String));
        })
    })
    describe("Failed", () => {
        test("should return status 401 and invalid token", async () => {
            let { status, body } = await request(app)
                .get("/mycart")
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
        })
        test("should return status 401 and token is required", async () => {
            let { status, body } = await request(app)
                .get("/mycart")
                .set("Authorization", `Bearer ${damaged_token_user_1}`)
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
        })
        test("should return status 401 and invalid token", async () => {
            let { status, body } = await request(app)
                .get("/mycart")
                .set("Authorization", `Beare ${access_token_user_1}`)
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
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
    }
    ])

    const admin = await User.findOne({ where: { email: user_1.email } });
    access_token_user_1 = signToken({ id: admin.id });
    damaged_token_user_1 = signToken({ id: admin.id });
    damaged_token_user_1 += "i";

    await queryInterface.bulkInsert("Burgers", require("../data/burgersWithoutIngredients.json").map((el) => {
        el.createdAt = el.updatedAt = new Date();
        return el;
    }))

    await queryInterface.bulkInsert("Carts", require("../data/cart.json").map((el) => {
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

    await queryInterface.bulkDelete("Carts", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})