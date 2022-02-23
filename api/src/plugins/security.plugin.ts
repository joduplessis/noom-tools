import fp from 'fastify-plugin'
import { AuthService } from '../auth/auth.service'

module.exports = fp(async function (fastify: any, options) {
    fastify.decorate('security', async function (request, reply, next) {
        try {
            const { sub, claims } = await request.jwtVerify()
            const claim = request.params.teamId
            const invalidClaims = await AuthService.getInvalidClaims(fastify, sub)

            if (invalidClaims.indexOf(claim) != -1) throw Error('Not allowed to this tenant')
            if (!AuthService.verifyClaims(fastify, claim, claims)) throw Error('Not allowed to this tenant')
        } catch (error) {
            reply.code(403).send(error)
        }
    })
})
