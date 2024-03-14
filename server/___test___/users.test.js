const app = require('../app.js');
const request = require('supertest');

const { hashPassword } = require('../helpers/bcrypt.js');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

const user_test_1 = {
    username: "kocak",
    email: "yakali@gmail.com",
    password: "testazah",
    role: "Admin",
    coins: 10,
    gender: "male",
    age: 123,
}

const new_user_test = {
    username: "kocakluh",
    email: "yakaligagal@gmail.com",
    password: "testazahkale",
    gender: "male",
    age: 123,
}

const new_user_test_2 = {
    username: "kocakluhbro",
    email: "yakaligagalterus@gmail.com",
    password: "terserahgue",
    gender: "female",
    age: 123,
}

describe("POST /login", () => {
    describe("Success", () => {
        test("should return status 200 and object of access_token", async () => {
            let { status, body } = await request(app)
                .post("/login")
                .send({
                    credential: user_test_1.username,
                    password: user_test_1.password
                })

            expect(status).toBe(200)
            expect(body).toHaveProperty("access_token", expect.any(String));
        })

        test("should return status 200 and object of access_token", async () => {
            let { status, body } = await request(app)
                .post("/login")
                .send({
                    credential: user_test_1.email,
                    password: user_test_1.password
                })

            expect(status).toBe(200)
            expect(body).toHaveProperty("access_token", expect.any(String));
        })
    })

    describe("Failed", () => {
        test("should return status 400 and required a username/email", async () => {
            let { status, body } = await request(app)
                .post("/login")
                .send({
                    credential: "",
                    password: user_test_1.password
                })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "email/username is required");
        })

        test("should return status 400 and required a password", async () => {
            let { status, body } = await request(app)
                .post("/login")
                .send({
                    credential: user_test_1.email,
                    password: ""
                })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Password is required");
        })

        test("should return status 401 and invalid email/password", async () => {
            let { status, body } = await request(app)
                .post("/login")
                .send({
                    credential: "emailsalah",
                    password: user_test_1.password
                })

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid email/password");
        })

        test("should return status 401 and invalid email/password", async () => {
            let { status, body } = await request(app)
                .post("/login")
                .send({
                    credential: user_test_1.email,
                    password: "passwordsalah"
                })

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid email/password");
        })

    })
});

describe("POST /register", () => {
    describe("Success", () => {
        test("should return status 201 and object of register", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send(new_user_test)

            expect(status).toBe(201)
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("username", new_user_test.username);
            expect(body).toHaveProperty("email", new_user_test.email);
            expect(body).toHaveProperty("gender", new_user_test.gender);
            expect(body).toHaveProperty("age", new_user_test.age);
        })
    })

    describe("Failed", () => {
        test("should return status 400 and required an email", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send({
                    username: new_user_test_2.username,
                    email: "",
                    password: new_user_test_2.password,
                    gender: new_user_test_2.gender,
                    age: new_user_test_2.age,
                })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Email is required");
        })

        test("should return status 400 and required an username", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send({
                    username: "",
                    email: new_user_test_2.email,
                    password: new_user_test_2.password,
                    gender: new_user_test_2.gender,
                    age: new_user_test_2.age,
                })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Username is required");
        })

        test("should return status 400 and required a password", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send({
                    username: new_user_test_2.username,
                    email: new_user_test_2.email,
                    password: "",
                    gender: new_user_test_2.gender,
                    age: new_user_test_2.age,
                })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Password is required");
        })

        test("should return status 400 and required a gender", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send({
                    username: new_user_test_2.username,
                    email: new_user_test_2.email,
                    password: new_user_test_2.password,
                    gender: "",
                    age: new_user_test_2.age,
                })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Gender is required");
        })

        test("should return status 400 and required a age", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send({
                    username: new_user_test_2.username,
                    email: new_user_test_2.email,
                    password: new_user_test_2.password,
                    gender: new_user_test_2.gender,
                    age: "",
                })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Age is required");
        })

        test("should return status 400 and email must be unique", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send({
                    username: new_user_test_2.username,
                    email: new_user_test.email,
                    password: new_user_test_2.password,
                    gender: new_user_test_2.gender,
                    age: new_user_test_2.age,
                })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Email must be unique");
        })

        test("should return status 400 and username must be unique", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send({
                    username: new_user_test.username,
                    email: new_user_test_2.email,
                    password: new_user_test_2.password,
                    gender: new_user_test_2.gender,
                    age: new_user_test_2.age,
                })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Username must be unique");
        })

        test("should return status 400 and invalid email format", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send({
                    username: new_user_test_2.username,
                    email: "bukanemail",
                    password: new_user_test_2.password,
                    gender: new_user_test_2.gender,
                    age: new_user_test_2.age,
                })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Invalid email format");
        })

        test("should return status 500 and internal server error", async () => {
            let { status, body } = await request(app)
                .post("/registe")

            expect(status).toBe(500)
            expect(body).toHaveProperty("message", "Internal server error");
        })
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
    }], {});
});

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });
});

