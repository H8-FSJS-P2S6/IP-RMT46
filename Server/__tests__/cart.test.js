const app = require("../app.js");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");
const { User, Cart } = require("../models");

let user_1 = {
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin",
    role: "Admin"
}

let access_token_user_1;

describe("GET /cart", () => {
    beforeAll(async () => {
        await queryInterface.bulkInsert("Users", [{
            name: user_1.name,
            email: user_1.email,
            password: hashPassword(user_1.password),
            role: user_1.role,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);

        const admin = await User.findOne({ where: { email: user_1.email } });
        access_token_user_1 = signToken({ id: admin.id });
    });

    afterAll(async () => {
        await queryInterface.bulkDelete("Users", null, {
            truncate: true,
            restartIdentity: true,
            cascade: true
        });
    });
    describe("Success", () => {
        test("should return status 200 and object of cart", async () => {
            const response = await request(app)
                .get("/cart")
                .set("Authorization", `Bearer ${access_token_user_1}`);
    
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThanOrEqual(0); 
            if (response.body.length > 0) {
                
                expect(response.body[0]).toHaveProperty("quantity", expect.any(Number));
                expect(response.body[0]).toHaveProperty("UserId", expect.any(Number));
                expect(response.body[0]).toHaveProperty("BurgerId", expect.any(Number));
                expect(response.body[0]).toHaveProperty("purchased", expect.any(Boolean));
                expect(response.body[0]).toHaveProperty("purchasedAt", expect.any(String));
                expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
                expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
            }
        });
    });
    

    describe("Failed", () => {
        test("should return status 401 and invalid token", async () => {
            const response = await request(app)
                .get("/cart");

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message", "Invalid token");
        });

        test("should return status 401 and token is required", async () => {
            const response = await request(app)
                .get("/cart")
                .set("Authorization", `Bearer ${access_token_user_1.slice(0, -5)}`);

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message", "Invalid token");
        });
    });
});
