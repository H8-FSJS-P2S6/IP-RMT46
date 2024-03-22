const app = require('../app')
const request = require('supertest')

const { sequelize } = require('../models')
const { signToken } = require('../helpers/jwt')
const { hashPasswd } = require('../helpers/bcrypt')
const { queryInterface } = sequelize

let category = {
    name: 'Hadith',
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

const data1 = {
    title: 'Islamic Education',
    description: "In Arabic three terms are used for education. The most common term is ta'līm, from the root 'alima, which means knowing...",
    CategoryId: 1,
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
}

const data2 = {
    title: 'Education',
    description: "In Arabic three terms are used for education. The most common term is ta'līm, from the root 'alima, which means knowing...",
    CategoryId: 1,
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
}

let access_token
let idParams = 1
let wrongId = 99

describe('GET /contents', () => {
    describe('Success', () => {
        test('Should return status 200 and return data', async () => {
            let { status, body } = await request(app).get('/contents').set('Authorization', `Bearer ${access_token}`).send(data2)

            // console.log(status)
            // console.log(body)
            expect(status).toBe(200)
        })
    })
})

describe('POST /contents', () => {
    describe('Success', () => {
        test('Should return status 201 when success create content', async () => {
            let { status, body } = await request(app).post('/contents').set('Authorization', `Bearer ${access_token}`).send(data1)

            // console.log(status)
            // console.log(body)
            expect(status).toBe(201)
        })
    })
})

describe('PUT /contents/:id', () => {
    describe('Success', () => {
        test('Should return status 201 when success create content', async () => {
            let { status, body } = await request(app).put(`/contents/${idParams}`).set('Authorization', `Bearer ${access_token}`).send({
                title: 'New',
                description: 'Test'
            })

            console.log(status)
            console.log(body)
            expect(status).toBe(200)
        })
    })
})

describe('DELETE /contents/:id', () => {
    describe('Success', () => {
        test('Should return status 201 when success delete content', async () => {
            let { status, body } = await request(app).delete(`/contents/${idParams}`).set('Authorization', `Bearer ${access_token}`).send(data1)

            // console.log(status)
            // console.log(body)
            expect(status).toBe(200)
        })
    })

    describe('Failure', () => {
        test('Should return status 404 when delete id and its not found', async () => {
            let {status, body} = await request(app).delete(`/contents/${wrongId}`).set('Authorization', `Bearer ${access_token}`).send(data1)

            expect(status).toBe(404)
        })
    })
})

beforeAll(async () => {
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

    await queryInterface.bulkInsert('Categories', [
        {
            name: category.name,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }
    ])

    let data = [
        {
            title: data1.title,
            description: data1.description,
            CategoryId: data1.CategoryId,
            UserId: data1.UserId,
            createdAt: data1.createdAt,
            updatedAt: data1.updatedAt
        },
        {
            title: data2.title,
            description: data2.description,
            CategoryId: data2.CategoryId,
            UserId: data2.UserId,
            createdAt: data2.createdAt,
            updatedAt: data2.updatedAt
        }
    ].map(each => { return each })

    await queryInterface.bulkInsert('Contents', data)



    access_token = signToken({
        id: user.id
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete('Contents', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await queryInterface.bulkDelete('Categories', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})