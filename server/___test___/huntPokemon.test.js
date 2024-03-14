const app = require('../app.js');
const request = require('supertest');

const { hashPassword } = require('../helpers/bcrypt.js');
const { signToken } = require('../helpers/jwt.js');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let access_token_user_1;

const user_test_1 = {
    username: "kocak",
    email: "yakali@gmail.com",
    password: "testazah",
    role: "Admin",
    gender: "female",
    age: 25,
}

const user_test_2 = {
    username: "kocakbener",
    email: "yakaligagal@gmail.com",
    password: "testskuy",
    role: "Trainer",
    gender: "male",
    age: 18,
}

const pokemon_test_1 = {
    "name": "pokemon 1",
    "type": "water",
    "pokedex": 4,
    "attack": 90,
    "hp": 70,
    "weight": 67,
    "height": 4,
    "captureRate": 136,
    "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif",
    "UserId": 1
}

describe("POST /hunt", () => {
    describe("Success", () => {
        test("should return status 201 and object create new pokemon", async () => {
            let { status, body } = await request(app)
                .post("/hunt?type=water")
                .set("Authorization", "Bearer " + access_token_user_1)

            if (status === 201) {
                expect(status).toBe(201)
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("name", expect.any(String));
                expect(body).toHaveProperty("type", expect.any(String));
                expect(body).toHaveProperty("pokedex", expect.any(Number));
                expect(body).toHaveProperty("attack", expect.any(Number));
                expect(body).toHaveProperty("hp", expect.any(Number));
                expect(body).toHaveProperty("weight", expect.any(Number));
                expect(body).toHaveProperty("height", expect.any(Number));
                expect(body).toHaveProperty("captureRate", expect.any(Number));
                expect(body).toHaveProperty("imagePokedex", expect.any(String));
                expect(body).toHaveProperty("imageBattleFront", expect.any(String));
                expect(body).toHaveProperty("imageBattleBack", expect.any(String));
                expect(body).toHaveProperty("UserId", expect.any(Number));
            }else{
                expect(status).toBe(200)
                expect(body).toHaveProperty("message", "Pokemon escaped. Find again!");
}

        })

    })

    describe("Failed", () => {
        test("should return status 500 and internal server error", async () => {
            let { status, body } = await request(app)
                .post("/hunt?type=water")

            expect(status).toBe(500)
            expect(body).toHaveProperty("message", "Internal server error");
        })

        test("should return status 401 and invalid token", async () => {
            let { status, body } = await request(app)
                .post("/hunt?type=water")
                .set("Authorization", "Bearer " + "randomtokensalah")

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid Token");
        })

    })
});

beforeAll(async () => {
    await queryInterface.bulkInsert('Users', [{
        username: user_test_1.username,
        email: user_test_1.email,
        password: hashPassword(user_test_1.password),
        role: user_test_1.role,
        gender: user_test_1.gender,
        age: user_test_1.age,
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        username: user_test_2.username,
        email: user_test_2.email,
        password: hashPassword(user_test_2.password),
        role: user_test_2.role,
        gender: user_test_2.gender,
        age: user_test_2.age,
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});

    access_token_user_1 = signToken({ id: 1 });
    access_token_user_2 = signToken({ id: 2 });

    await queryInterface.bulkInsert('Pokemons',
        [{
            "name": "pokemon 1",
            "type": "water",
            "pokedex": 1,
            "attack": 48,
            "hp": 44,
            "weight": 90,
            "height": 9,
            "captureRate": 190,
            "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
            "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/1.gif",
            "UserId": 1,
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "name": "pokemon 2",
            "type": "fire",
            "pokedex": 2,
            "attack": 60,
            "hp": 60,
            "weight": 62,
            "height": 12,
            "captureRate": 120,
            "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
            "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
            "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/2.gif",
            "UserId": 1,
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "name": "pokemon 3",
            "type": "ground",
            "pokedex": 3,
            "attack": 72,
            "hp": 98,
            "weight": 24,
            "height": 6,
            "captureRate": 76,
            "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
            "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
            "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/3.gif",
            "UserId": 1,
            "createdAt": new Date(),
            "updatedAt": new Date()
        }], {});

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