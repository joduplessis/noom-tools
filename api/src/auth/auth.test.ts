import { test } from 'tap'
import app from '../app'
import supertest from 'supertest'

const fastify = app({})

test('POST `/auth` route', async (t) => {
    const email = 'jo@joduplessis.com'
    const password = 'jo'
    
    t.teardown(() => fastify.close())
    
    await fastify.ready()

    t.test('POST `/auth/login` route', async (t) => {
        await supertest(fastify.server)
            .post('/auth/login')
            .send({ email, password })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
    })
    
    t.test('POST `/auth/reset-password` route', async (t) => {
        const response = await supertest(fastify.server)
            .put('/auth/reset-password')
            .send({ email })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')

        await supertest(fastify.server)
            .put('/auth/update-password')
            .send({ email, resetToken: response.body.token, password })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
    })
})




