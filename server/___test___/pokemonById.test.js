const app = require('../app.js');
const request = require('supertest');

const { hashPassword } = require('../helpers/bcrypt.js');
const { signToken } = require('../helpers/jwt.js');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let access_token_user_1;
let access_token_user_2;

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

describe("GET /pokedex/:id", () => {
    describe("Success", () => {
        test("should return status 200 and array of product", async () => {
            let { status, body } = await request(app)
                .get("/pokedex/" + 1)
                .set("Authorization", "Bearer " + access_token_user_1)

            expect(status).toBe(200)
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("name", expect.any(String));
        })
    })

    describe("Failed", () => {
        test("should return status 500 and internal server error", async () => {
            let { status, body } = await request(app)
                .get("/pokedex/" + 1)

            expect(status).toBe(500)
            expect(body).toHaveProperty("message", "Internal server error");
        })

        test("should return status 401 and unauthenticated", async () => {
            let { status, body } = await request(app)
                .get("/pokedex/" + 1)
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
            "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
            "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
            "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/3.gif",
            "UserId": 1,
            "createdAt": new Date(),
            "updatedAt": new Date()
        }
        ], {});

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