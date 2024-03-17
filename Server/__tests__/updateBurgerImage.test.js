const app = require("../app.js");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");
const { User } = require("../models");
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, "../data/burger.png");
const image = fs.createReadStream(filePath);

let user_1 = {
    name: "admin",
    email: "admin@gmail.com",
    password: "admin",
    role: "Admin",
}

let user_2 = {
    name: "user",
    email: "user@gmail.com",
    password: "user",
    role: "User",
}

let access_token_user_1;
let access_token_user_2;

describe("patch /burgers/1/image", () => {
    beforeAll(async () => {
        
        await queryInterface.bulkInsert("Users", [{
            name: user_1.name,
            email: user_1.email,
            password: hashPassword(user_1.password),
            role: user_1.role,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);

       
        await queryInterface.bulkInsert("Users", [{
            name: user_2.name,
            email: user_2.email,
            password: hashPassword(user_2.password),
            role: user_2.role,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);

        
        const admin = await User.findOne({ where: { email: user_1.email } });
        access_token_user_1 = signToken({ id: admin.id });

        const user = await User.findOne({ where: { email: user_2.email } });
        access_token_user_2 = signToken({ id: user.id });
    });

    describe("Success", () => {
        test("should return status 200 and message that the image has been updated", async () => {
            let { status, body } = await request(app)
                .patch("/burgers/1/image")
                .set("Authorization", `Bearer ${access_token_user_1}`)
                .attach("image", image, "burger.png");
            expect(status).toBe(200);
            expect(body).toHaveProperty("message", "Image successfully updated");
        })
    })

    describe("Failed", () => {
        test("should return status 401 and invalid token", async () => {
            let { status, body } = await request(app)
                .patch("/burgers/1/image")
                .attach("image", image, "burger.png");
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
        })

        test("should return status 400 and image file is required", async () => {
            let { status, body } = await request(app)
                .patch("/burgers/1/image")
                .set("Authorization", `Bearer ${access_token_user_1}`)
                
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Image file is required");
        })

        test("should return status 404 and burger not available", async () => {
            let { status, body } = await request(app)
                .patch("/burgers/30/image")
                .set("Authorization", `Bearer ${access_token_user_1}`)
                .attach("image", image, "burger.png");
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", "Data not found");
        })

        test("should return status 403 and forbidden", async () => {
            let { status, body } = await request(app)
                .patch("/burgers/5/image")
                .set("Authorization", `Bearer ${access_token_user_2}`)
                .attach("image", image, "burger.png");
            expect(status).toBe(403);
            expect(body).toHaveProperty("message", "Forbidden");
        })
    })

    afterAll(async () => {
        
        await queryInterface.bulkDelete("Users", null, {
            truncate: true,
            restartIdentity: true,
            cascade: true
        });
    });
});
