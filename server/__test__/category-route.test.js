const app = require('../app')
const request = require('supertest')

const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { Category } = require('../models')
const { hashPasswd } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

let data1 = {
    name: 'Hadith',
    createdAt: new Date(),
    updatedAt: new Date()
}

let data2 = {
    name: 'Akhlaq',
    createdAt: new Date(),
    updatedAt: new Date()
}

let user = {
    id: 1,
    username: 'admin',
    email: 'admin@mail.com',
    password: '12345',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
}

let access_token
let idParams = 2

describe('GET /categories ', () => {
    describe('Success', () => {
        test('Should return 200 and return data', async () => {
            let { status, body } = await request(app).get('/categories').set('Authorization', `Bearer ${access_token}`).send(data1)

            // console.log(status)
            // console.log(body)
            expect(status).toBe(200)
        })
    })
})

describe('GET /categories/:id ', () => {
    describe('Success', () => {
        test('Should return 200 and return data', async () => {
            let { status, body } = await request(app).get(`/categories/${idParams}`).set('Authorization', `Bearer ${access_token}`).send(data1)

            // console.log(status)
            // console.log(body)
            expect(status).toBe(200)
        })
    })
})

describe('POST /categories ', () => {
    describe('Success', () => {
        test('Should return 200 and return data', async () => {
            let { status, body } = await request(app).post(`/categories`).set('Authorization', `Bearer ${access_token}`).send({
                name: 'New Category'
            })

            // console.log(status)
            // console.log(body)
            expect(status).toBe(201)
        })
    })
})

describe('PUT /categories/:id ', () => {
    describe('Success', () => {
        test('Should return 200 when success update', async () => {
            let { status, body } = await request(app).put(`/categories/${idParams}`).set('Authorization', `Bearer ${access_token}`).send({
                name: 'New Other Category'
            })

            // console.log(status)
            // console.log(body)
            expect(status).toBe(200)
        })
    })
})

describe('DELETE /categories/:id ', () => {
    describe('Success', () => {
        test('Should return 200 when success update', async () => {
            let { status, body } = await request(app).delete(`/categories/${idParams}`).set('Authorization', `Bearer ${access_token}`).send(data1)

            // console.log(status)
            // console.log(body)
            expect(status).toBe(200)
        })
    })
})


beforeAll(async () => {
    let data = [
        {
            name: data1.name,
            createdAt: data1.createdAt,
            updatedAt: data1.updatedAt
        },
        {
            name: data2.name,
            createdAt: data2.createdAt,
            updatedAt: data2.updatedAt
        }
    ].map(each => { return each })

    await queryInterface.bulkInsert('Categories', data)

    await queryInterface.bulkInsert('Users', [
        {
            username: user.username,
            role: user.role,
            email: user.email,
            password: hashPasswd(user.password),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    ])

    access_token = signToken({
        id: user.id
    })
})


afterAll(async () => {
    await queryInterface.bulkDelete('Categories', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})