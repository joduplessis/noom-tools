import { v4 as uuidv4 } from 'uuid'
import { MailService } from '../mail/mail.service'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'

export default async (fastify, opts) => {
    fastify.post(
        '/auth/login',
        {
            schema: {
                body: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string' },
                        password: { type: 'string' },
                    },
                },
            },
        },
        async (request, reply) => {
            try {
                const { email, password } = request.body
                const user: User = await AuthService.validateUser(fastify, email, password)

                if (!user) throw Error('not found')

                const userId = user.id
                const claims = await AuthService.getClaims(fastify, userId)

                // The claims object above will always have the most up to date claims
                // So safe for us to clear their cache
                await AuthService.clearInvalidations(fastify, userId)

                // Return the token containing the claims
                const token = AuthService.getToken(fastify, userId, email, claims)

                return { token }
            } catch (error) {
                throw Error(error)
            }
        }
    )

    fastify.post(
        '/auth/signup',
        {
            schema: {
                body: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                    },
                },
            },
        },
        async (request, reply) => {
            try {
                const { email, name, password } = request.body
                let user: User = await UsersService.findOneWithEmail(fastify, email)
                if (user) throw Error('User exists')
                user = await UsersService.create(fastify, { email, name, password })
                MailService.sendWelcome(fastify, email)
                return user
            } catch (error) {
                throw Error(error)
            }
        }
    )

    fastify.put(
        '/auth/reset-password',
        {
            schema: {
                body: {
                    type: 'object',
                    required: ['email'],
                    properties: {
                        email: { type: 'string' },
                    },
                },
            },
        },
        async (request, reply) => {
            try {
                const { email } = request.body
                const token = uuidv4()
                const user: any = await UsersService.findOneWithEmail(fastify, email)

                if (!user) throw 'Not found'

                await UsersService.update(fastify, { id: user.id, resetToken: token })
                await MailService.sendPasswordReset(fastify, email, token)

                return { success: true, token }
            } catch (error) {
                throw Error(error)
            }
        }
    )

    fastify.put(
        '/auth/update-password',
        {
            schema: {
                body: {
                    type: 'object',
                    required: ['resetToken', 'email', 'password'],
                    properties: {
                        resetToken: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                    },
                },
            },
        },
        async (request, reply) => {
            try {
                const { email, resetToken, password } = request.body
                const user: User = await UsersService.findOneWithEmailAndResetToken(fastify, email, resetToken)

                if (!user) throw 'Not found'

                return await UsersService.update(fastify, { id: user.id, password, resetToken: null })
            } catch (error) {
                throw Error(error)
            }
        }
    )
}
