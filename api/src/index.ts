require('dotenv').config()

import * as Sentry from '@sentry/node'
import fastify from 'fastify'
import cors from 'fastify-cors'
import helmet from 'fastify-helmet'
import { User } from './users/user.entity'
import { createConnection } from 'typeorm'
import { AuthService } from './auth/auth.service'
import { createAdapter } from '@socket.io/redis-adapter'

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
})

const app: any = fastify({
    logger: {
        prettyPrint:
            process.env.NODE_ENV === 'development'
                ? {
                      translateTime: 'HH:MM:ss Z',
                      ignore: 'pid,hostname',
                  }
                : false,
    },
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

app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
})

app.register(helmet)

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

app.register(require('./plugins/s3.plugin'))
app.register(require('./plugins/postmark.plugin'))
app.register(require('./plugins/authenticate.plugin'))
app.register(require('./plugins/security.plugin'))
app.register(require('./plugins/websocket.plugin'))

app.register(require('./files/files.controller'))
app.register(require('./auth/auth.controller'))
app.register(require('./users/users.controller'))

const start = async () => {
    try {
        const port = +process.env.PORT || 3000
        const address = await app.listen(port)
        await app.ready()
        console.log(`Server listening on ${address}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

start()
