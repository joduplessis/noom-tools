import { test } from 'tap'
import app from '../app'
import supertest from 'supertest'

const fastify = app({})

test('Auth', async (t) => {
    const email = 'jo@joduplessis.com'
    const password = 'jo'
    const name = 'Johannes'
    const image = ''

    t.teardown(() => fastify.close())

    await fastify.ready()

    t.test('User update & get', async (t) => {
        const result = await supertest(fastify.server).post('/auth/login').send({ email, password }).expect(200).expect('Content-Type', 'application/json; charset=utf-8')

        const token = result.body.token
        const Authorization = `Bearer ` + token

        await supertest(fastify.server).put('/users').set({ Authorization }).send({ email, password, name, image }).expect(200).expect('Content-Type', 'application/json; charset=utf-8')

        await supertest(fastify.server).get('/users').set({ Authorization }).send().expect(200).expect('Content-Type', 'application/json; charset=utf-8')
    })
})
