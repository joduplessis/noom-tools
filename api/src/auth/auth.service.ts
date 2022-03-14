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

    verifyScopes: (fastify: any, scope: string, scopes: string[]) => {
        try {
            if (scopes.indexOf(scope) == -1) {
                throw Error('Not allowed to this tenant')
            } else {
                return true
            }
        } catch (e) {
            throw e
        }
    },

    getScopes: async (fastify: any, userId: string) => {
        try {
            const user = new User()
            user.id = userId
            return ['team', 'ids']
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

    getExternalToken: (fastify: any, email: string, scope: string) => {
        try {
            return fastify.jwt.external.sign({ email, scope })
        } catch (e) {
            throw e
        }
    },

    getToken: (fastify: any, userId: string, email: string, scopes: any) => {
        try {
            return fastify.jwt.internal.sign({ sub: userId, email, scopes })
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

    validateScope: async (fastify: any, userId: string, scope: any) => {
        try {
            let scopes = await fastify.redis['invalidate'].get(userId)

            if (!scopes) {
                scopes = [scope]
            } else {
                scopes = [...scopes, scope]
            }

            await fastify.redis['invalidate'].set(userId, scopes)
        } catch (error) {
            throw Error(error)
        }
    },

    getInvalidScopes: async (fastify: any, userId: string) => {
        try {
            const scopes = await fastify.redis['invalidate'].get(userId)
            return scopes || []
        } catch (error) {
            throw Error(error)
        }
    },

    invalidateScope: async (fastify: any, userId: string, scope: any) => {
        try {
            let scopes = await fastify.redis['invalidate'].get(userId)

            if (!scopes) {
                scopes = [scope]
            } else {
                scopes = [...scopes, scope]
            }

            await fastify.redis['invalidate'].set(userId, scopes)
        } catch (error) {
            throw Error(error)
        }
    },
}
