import fp from 'fastify-plugin'

const messages = {
    badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
    noAuthorizationInHeaderMessage: 'Autorization header is missing!',
    authorizationTokenExpiredMessage: 'Authorization token expired',
    authorizationTokenInvalid: (err) => {
        return `Authorization token is invalid: ${err.message}`
    },
}

module.exports = fp(async function (fastify, options) {
    fastify.register(require('fastify-jwt'), {
        secret: process.env.SECRET,
        decode: { complete: true },
        namespace: 'internal',
        jwtVerify: 'jwtVerify',
        jwtSign: 'jwtSign',
        messages,
        verify: { allowedIss: 'noomtools' },
        sign: {
            iss: 'noomtools',
            expiresIn: '14d',
        },
    })

    fastify.register(require('fastify-jwt'), {
        secret: process.env.SECRET,
        decode: { complete: true },
        namespace: 'external',
        jwtVerify: 'jwtExternalVerify',
        jwtSign: 'jwtExternalSign',
        messages,
        verify: { allowedIss: 'noomtools' },
        sign: {
            iss: 'noomtools',
            expiresIn: '24h',
        },
    })

    fastify.decorate('authenticate', async function (request, reply) {
        try {
            await request.jwtVerify()
        } catch (error) {
            reply.code(403).send('Not allowed')
        }
    })
})
