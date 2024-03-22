const app = require("../app")
const request = require('supertest')

const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { hashPasswd } = require("../helpers/bcrypt")

const data1 = {
    username: 'admin1',
    email: 'admin1@mail.com',
    password: '123456',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
}

const data2 = {
    username: 'user1',
    email: 'user1@mail.com',
    password: '123456',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
}

describe('POST /auth/register', () => {
    describe('Success', () => {
        test('Should return 201 when success register', async () => {
            let { status, body } = await request(app).post('/auth/register').send(data1)

            expect(status).toBe(201)
        })
    })

    describe('Failure', () => {
        test('Should return 400 when username/ email/ password blank', async () => {
            let { status, body } = await request(app).post('/auth/register').send({
                username: '',
                email: '',
                password: '1234'
            })

            expect(status).toBe(400)
            expect(body).toHaveProperty('message', expect.any(String))
        })
    })
})

describe('POST /auth/login', () => {
    describe('Success', () => {
        test('Should return 200 when success login', async () => {
            let { status, body } = await request(app).post('/auth/login').send(data2)

            expect(status).toBe(200)
        })
    })

    describe('Failure', () => {
        test('Should return 401 when email/password invalid', async () => {
            let {status, body} = await request(app).post('/auth/login').send({
                email: 'useeeerrrr@mail.com',
                password: '123'
            })

            expect(status).toBe(401)
        }),
        test('Should return 401 when email is blank', async () => {
            let {status, body} = await request(app).post('/auth/login').send({
                email: '',
                password: '123'
            })

            expect(status).toBe(400)
        }),
        test('Should return 401 when password is blank', async () => {
            let {status, body} = await request(app).post('/auth/login').send({
                email: 'user1@mail.com',
                password: ''
            })

            expect(status).toBe(400)
        })
    })
})

beforeAll(async () => {
    let data = [
        {
            username: data1.username,
            email: data1.email,
            password: hashPasswd(data1.password),
            role: data1.role,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            username: data2.username,
            email: data2.email,
            password: hashPasswd(data2.password),
            role: data2.role,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ].map(each => { return each })

    await queryInterface.bulkInsert('Users', data)
})


afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})