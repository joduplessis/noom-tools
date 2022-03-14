import fp from 'fastify-plugin'
import { AuthService } from '../auth/auth.service'

module.exports = fp(async function (fastify: any, options) {
    fastify.decorate('security', async function (request, reply, next) {
        try {
            const { sub, scopes } = await request.jwtVerify()
            const scope = request.params.teamId
            const invalidScopes = await AuthService.getInvalidScopes(fastify, sub)

            if (invalidScopes.indexOf(scope) != -1) throw Error('Not allowed to this tenant')
            if (!AuthService.verifyScopes(fastify, scope, scopes)) throw Error('Not allowed to this tenant')
        } catch (error) {
            reply.code(403).send(error)
        }
    })
})
