import { UsersService } from '../users/users.service'

export default async function (fastify, opts) {
    const options = { preValidation: [fastify.authenticate] }

    fastify.put('/users', options, async (request, reply) => {
        try {
            const { sub } = request.user
            const { name, image, email, password } = request.body

            return UsersService.update(fastify, { id: sub, name, image, email, password })
        } catch (error) {
            throw Error(error)
        }
    })

    fastify.get('/users', options, async (request, reply) => {
        try {
            const { sub, email } = request.user

            return await UsersService.findOne(fastify, sub)
        } catch (error) {
            throw Error(error)
        }
    })

}
