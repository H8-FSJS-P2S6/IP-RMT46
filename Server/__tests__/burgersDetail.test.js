const app = require("../app.js");
const request = require("supertest");
const { sequelize } = require("../models/index.js");
const { queryInterface } = sequelize;

describe("get /burgers/1", () => {
    beforeAll(async () => {
        await queryInterface.bulkInsert("Burgers", require("../data/burgersWithoutIngredients.json").map((el) => {
            el.createdAt = el.updatedAt = new Date();
            return el;
        }))
    })

    describe("Success", () => {
        test("should return status 200 and object of burgers", async () => {
            let { status, body } = await request(app)
                .get("/burgers/1")
            expect(status).toBe(200);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("name", expect.any(String));
            expect(body).toHaveProperty("desc", expect.any(String));
            expect(body).toHaveProperty("price", expect.any(Number));
            expect(body).toHaveProperty("veg", expect.any(Boolean));
            expect(body).toHaveProperty("images", expect.any(String));
            expect(body).toHaveProperty("createdAt", expect.any(String));
            expect(body).toHaveProperty("updatedAt", expect.any(String));
        })
    })

    describe("Failed", () => {
        test("should return status 404 and burger not available", async () => {
            let { status, body } = await request(app)
                .get("/burgers/30")
                
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", "Data not found");
        })
    })

    afterAll(async () => {
        await queryInterface.bulkDelete("Burgers", null, {
            truncate: true,
            restartIdentity: true,
            cascade: true
        })
    })
})
