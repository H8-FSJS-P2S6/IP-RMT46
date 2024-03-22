const app = require('../app.js');
const request = require('supertest');

const { hashPassword } = require('../helpers/bcrypt.js');
const { signToken } = require('../helpers/jwt.js');
const { sequelize } = require('../models/index.js');
const { queryInterface } = sequelize;

let access_token_user_1;
let access_token_user_2;

const user_test_1 = {
    username: "kocak",
    email: "yakali@gmail.com",
    password: "testazah",
    role: "Admin",
    coins: 1000,
    gender: "female",
    age: 25,
}

const user_test_2 = {
    username: "kocakbener",
    email: "yakaligagal@gmail.com",
    password: "testskuy",
    gender: "male",
    age: 18,
}

describe("POST /shop", () => {
    describe("Success", () => {
        test("should return status 201 and object create new pokemon", async () => {
            let { status, body } = await request(app)
                .post("/shop?quantity=1")
                .set("Authorization", "Bearer " + access_token_user_1)

            expect(status).toBe(201)
            expect(body).toEqual(expect.any(Object));
            expect(body[0]).toHaveProperty("id", expect.any(Number));
            expect(body[0]).toHaveProperty("name", expect.any(String));
            expect(body[0]).toHaveProperty("type", expect.any(String));
            expect(body[0]).toHaveProperty("pokedex", expect.any(Number));
            expect(body[0]).toHaveProperty("attack", expect.any(Number));
            expect(body[0]).toHaveProperty("hp", expect.any(Number));
            expect(body[0]).toHaveProperty("weight", expect.any(Number));
            expect(body[0]).toHaveProperty("height", expect.any(Number));
            expect(body[0]).toHaveProperty("captureRate", expect.any(Number));
            expect(body[0]).toHaveProperty("imagePokedex", expect.any(String));
            expect(body[0]).toHaveProperty("imageBattleFront", expect.any(String));
            expect(body[0]).toHaveProperty("imageBattleBack", expect.any(String));
            expect(body[0]).toHaveProperty("UserId", expect.any(Number));
        })

    })

    describe("Failed", () => {
        test("should return status 500 and internal server error", async () => {
            let { status, body } = await request(app)
                .post("/shop?quantity=1")

            expect(status).toBe(500)
            expect(body).toHaveProperty("message", "Internal server error");
        })

        test("should return status 401 and invalid token", async () => {
            let { status, body } = await request(app)
                .post("/shop?quantity=1")
                .set("Authorization", "Bearer " + "randomtokensalah")

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid Token");
        })

        test("should return status 400 and error message anc user need more coins", async () => {
            let { status, body } = await request(app)
                .post("/shop?quantity=1")
                .set("Authorization", "Bearer " + access_token_user_2)

            expect(status).toBe(400);
            expect(body).toHaveProperty("message", `Sorry ${user_test_2.username}, you need more coins.`);
        });

    })
});

beforeAll(async () => {
    await queryInterface.bulkInsert('Users', [{
        username: user_test_1.username,
        email: user_test_1.email,
        password: hashPassword(user_test_1.password),
        role: user_test_1.role,
        coins: user_test_1.coins,
        gender: user_test_1.gender,
        age: user_test_1.age,
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        username: user_test_2.username,
        email: user_test_2.email,
        password: hashPassword(user_test_2.password),
        gender: user_test_2.gender,
        age: user_test_2.age,
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});

    access_token_user_1 = signToken({ id: 1 });
    access_token_user_2 = signToken({ id: 2 });

});

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });

    await queryInterface.bulkDelete('Pokemons', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });

});