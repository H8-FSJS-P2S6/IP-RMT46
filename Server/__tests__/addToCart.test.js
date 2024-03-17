const app = require("../app.js");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");
const { User } = require("../models");

let access_token;
let damaged_token;

describe("post /cart/:burgerId", () => {
    beforeAll(async () => {
        await queryInterface.bulkInsert("Users", [{
            name: "test",
            email: "test@gmail.com",
            password: hashPassword("admin"),
            role: "Admin",
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
        
        const admin = await User.findOne({ where: { email: "test@gmail.com" } });
        access_token = signToken({ id: admin.id });
        damaged_token = signToken({ id: admin.id }) + "i";
    });

    afterAll(async () => {
        await queryInterface.bulkDelete("Users", null, {
            truncate: true,
            restartIdentity: true,
            cascade: true
        });
    });

    describe("Success", () => {
        test("should return status 201 and message with burgerData", async () => {
            
            const { status, body } = await request(app)
                .post(`/cart/1`)
                .set("Authorization", `Bearer ${access_token}`)
                .send({ quantity });
            expect(status).toBe(201);
            expect(body).toHaveProperty("message", "Burger successfully added to cart");
            
        });
    });

    describe("Failed", () => {
        test("should return status 401 and invalid token", async () => {
            const { status, body } = await request(app)
                .post("/cart/1") 
                .send({ quantity: 1 }); 
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
        });

        test("should return status 401 and invalid token", async () => {
            const { status, body } = await request(app)
                .post("/cart/1") 
                .set("Authorization", "Bearer ") 
                .send({ quantity: 1 }); 
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
        });

        test("should return status 401 and invalid token when token is malformed", async () => {
            const { status, body } = await request(app)
                .post("/cart/1") 
                .set("Authorization", "Bearer randomtokenwithoutbearer") 
                .send({ quantity: 1 }); 
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
        });
    
    });
});
