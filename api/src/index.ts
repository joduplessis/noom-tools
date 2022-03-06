require('dotenv').config()

import * as Sentry from '@sentry/node'
import app from './app'

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
})

const port = +process.env.PORT || 5000
const server = app({
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

server.listen(port, (err, address) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    } else {
        server.log.info(`Server listening on ${address}`)
    }
})
