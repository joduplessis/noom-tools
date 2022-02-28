import { v4 as uuidv4 } from 'uuid'
import { MailService } from '../mail/mail.service'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'

export default async (fastify, opts) => {
    const options = { preValidation: [fastify.authenticate] }

    fastify.post('/auth/login', {}, async (request, reply) => {
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
    })

    fastify.post('/auth/signup', {}, async (request, reply) => {
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
    })

    fastify.put('/auth/reset-password', {}, async (request, reply) => {
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
    })

    fastify.put('/auth/update-password', {}, async (request, reply) => {
        try {
            const { email, resetToken, password } = request.body
            const user: User = await UsersService.findOneWithEmailAndResetToken(fastify, email, resetToken)

            if (!user) throw 'Not found'

            return await UsersService.update(fastify, { id: user.id, password, resetToken: null })
        } catch (error) {
            throw Error(error)
        }
    })

    // These require an auth token

    fastify.get('/auth/re-issue-jwt', options, async (request, reply) => {
        try {
            const { sub, email } = request.user
            const claims = AuthService.getClaims(fastify, sub)
            const token = AuthService.getToken(fastify, sub, email, claims)
            
            return { token }
        } catch (error) {
            throw Error(error)
        }
    })

    fastify.put('/auth/update-me', options, async (request, reply) => {
        try {
            const { sub } = request.user
            const { name, image, email, password } = request.body

            return UsersService.update(fastify, { id: sub, name, image, email, password })
        } catch (error) {
            throw Error(error)
        }
    })

    fastify.get('/auth/me', options, async (request, reply) => {
        try {
            const { sub, email } = request.user

            return await UsersService.findOne(fastify, sub)
        } catch (error) {
            throw Error(error)
        }
    })
}
