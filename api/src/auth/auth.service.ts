import { compare } from 'bcryptjs'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'

export const AuthService = {
    validateUser: async (fastify: any, email: string, password: string): Promise<any> => {
        try {
            const user = await UsersService.findOneWithEmail(fastify, email)
            if (!user) throw 'Not found'
            const isEqual = await compare(password, user.password)
            if (isEqual) return user
            return null
        } catch (e) {
            throw e
        }
    },

    verifyClaims: (fastify: any, claim: string, claims: string[]) => {
        try {
            if (claims.indexOf(claim) == -1) {
                throw Error('Not allowed to this tenant')
            } else {
                return true
            }
        } catch (e) {
            throw e
        }
    },

    getClaims: async (fastify: any, userId: string) => {
        try {
            const user = new User()
            user.id = userId
            return ['team','ids']
        } catch (e) {
            throw e
        }
    },

    verifyExternalToken: (fastify: any, token: string) => {
        try {
            return fastify.jwt.external.verify(token)
        } catch (e) {
            throw e
        }
    },

    verifyToken: (fastify: any, token: string) => {
        try {
            return fastify.jwt.internal.verify(token)
        } catch (e) {
            throw e
        }
    },

    decodeExternalToken: (fastify: any, token: string) => {
        try {
            return fastify.jwt.external.decode(token)
        } catch (e) {
            throw e
        }
    },

    decodeToken: (fastify: any, token: string) => {
        try {
            return fastify.jwt.internal.decode(token)
        } catch (e) {
            throw e
        }
    },

    getExternalToken: (fastify: any, email: string, claim: string) => {
        try {
            return fastify.jwt.external.sign({ email, claim })
        } catch (e) {
            throw e
        }
    },

    getToken: (fastify: any, userId: string, email: string, claims: any) => {
        try {
            return fastify.jwt.internal.sign({ sub: userId, email, claims })
        } catch (e) {
            throw e
        }
    },

    // Redis cache

    clearInvalidations: async (fastify: any, userId: string) => {
        try {
            await fastify.redis['invalidate'].del(userId)
        } catch (error) {
            throw Error(error)
        }
    },

    validateClaim: async (fastify: any, userId: string, claim: any) => {
        try {
            let claims = await fastify.redis['invalidate'].get(userId)

            if (!claims) {
                claims = [claim]
            } else {
                claims = [...claims, claim]
            }

            await fastify.redis['invalidate'].set(userId, claims)
        } catch (error) {
            throw Error(error)
        }
    },

    getInvalidClaims: async (fastify: any, userId: string) => {
        try {
            const claims = await fastify.redis['invalidate'].get(userId)
            return claims || []
        } catch (error) {
            throw Error(error)
        }
    },

    invalidateClaim: async (fastify: any, userId: string, claim: any) => {
        try {
            let claims = await fastify.redis['invalidate'].get(userId)

            if (!claims) {
                claims = [claim]
            } else {
                claims = [...claims, claim]
            }

            await fastify.redis['invalidate'].set(userId, claims)
        } catch (error) {
            throw Error(error)
        }
    },
}
