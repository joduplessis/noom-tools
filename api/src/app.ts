import fastify from 'fastify'
import { User } from './users/user.entity'
import { createConnection } from 'typeorm'
import * as dotenv from 'dotenv'

dotenv.config()

export default (opts = {}) => {
    const app: any = fastify(opts)

    app.register(require('fastify-cors'), {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    })

    app.register(require('fastify-redis'), {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        namespace: 'invalidate',
    })
        .register(require('fastify-redis'), {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            namespace: 'socket-io-pub',
        })
        .register(require('fastify-redis'), {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            namespace: 'socket-io-sub',
        })

    app.register(require('fastify-helmet'))

    app.register(require('fastify-multipart'), {
        limits: {
            fieldNameSize: 100,
            fieldSize: 100,
            fields: 10,
            fileSize: 1000000,
            files: 1,
            headerPairs: 2000,
        },
    })

    app.register(require('fastify-socket.io'), {
        pingInterval: 4000,
        pingTimeout: 10000,
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            transports: ['websocket', 'polling'],
            allowedHeaders: ['Access-Control-Allow-Origin'],
            credentials: false,
        },
    })

    app.register(require('./plugins/typeorm.plugin'), {
        connection: createConnection({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            synchronize: true,
            logging: false,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
            entities: [User],
        }),
    })

    app.register(require('fastify-swagger'), {
        routePrefix: '/documentation',
        swagger: {
            info: {
                title: 'Noom Tools swagger',
                description: 'SWagger docs for the Noom Tools api',
                version: '0.0.1',
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here',
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'user', description: 'User related end-points' },
                { name: 'auth', description: 'Auth related end-points' },
            ],
            definitions: {
                User: {
                    type: 'object',
                    required: ['id', 'email'],
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        name: { type: 'string' },
                        image: { type: 'string' },
                        active: { type: 'boolean' },
                        resetToken: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                    },
                },
            },
            securityDefinitions: {
                apiKey: {
                    type: 'apiKey',
                    name: 'apiKey',
                    in: 'header',
                },
            },
        },
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false,
        },
        uiHooks: {
            onRequest: function (request, reply, next) {
                next()
            },
            preHandler: function (request, reply, next) {
                next()
            },
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        exposeRoute: true,
    })

    app.register(require('./plugins/s3.plugin'))
    app.register(require('./plugins/postmark.plugin'))
    app.register(require('./plugins/authenticate.plugin'))
    app.register(require('./plugins/security.plugin'))
    app.register(require('./plugins/websocket.plugin'))

    app.register(require('./files/files.controller'))
    app.register(require('./auth/auth.controller'))
    app.register(require('./users/users.controller'))

    return app
}
