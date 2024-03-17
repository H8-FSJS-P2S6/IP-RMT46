const app = require("../app.js");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

describe("get /burgers", () => {
    beforeAll(async () => {
        await queryInterface.bulkInsert("Burgers", require("../data/burgersWithoutIngredients.json").map((el) => {
            el.createdAt = el.updatedAt = new Date();
            return el;
        }))
    })

    afterAll(async () => {
        await queryInterface.bulkDelete("Burgers", null, {
            truncate: true,
            restartIdentity: true,
            cascade: true
        })
    })

    describe("Success", () => {
        test("should return status 200 and object of burgers without filter", async () => {
            let { status, body } = await request(app)
                .get("/burgers")
            expect(status).toBe(200);
            expect(Array.isArray(body)).toBe(true);
            expect(body.length).toBeGreaterThan(0);
            expect(body[0]).toHaveProperty("name", expect.any(String));
            expect(body[0]).toHaveProperty("desc", expect.any(String));
            expect(body[0]).toHaveProperty("price", expect.any(Number));
            expect(body[0]).toHaveProperty("veg", expect.any(Boolean));
            expect(body[0]).toHaveProperty("images", expect.any(String));
            expect(body[0]).toHaveProperty("createdAt", expect.any(String));
            expect(body[0]).toHaveProperty("updatedAt", expect.any(String));
        })

        test("should return status 200 and object of burgers with filter", async () => {
            let { status, body } = await request(app)
                .get("/burgers?filter=1")
            expect(status).toBe(200);
            expect(Array.isArray(body)).toBe(true);
            expect(body.length).toBeGreaterThan(0);
            expect(body[0]).toHaveProperty("name", expect.any(String));
            expect(body[0]).toHaveProperty("desc", expect.any(String));
            expect(body[0]).toHaveProperty("price", expect.any(Number));
            expect(body[0]).toHaveProperty("veg", expect.any(Boolean));
            expect(body[0]).toHaveProperty("images", expect.any(String));
            expect(body[0]).toHaveProperty("createdAt", expect.any(String));
            expect(body[0]).toHaveProperty("updatedAt", expect.any(String));
        })
    })
})
