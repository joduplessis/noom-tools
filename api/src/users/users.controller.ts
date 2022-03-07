import { UsersService } from '../users/users.service'

export default async function (fastify, opts) {
    fastify.put(
        '/users',
        {
            preValidation: [fastify.authenticate],
            schema: {
                descrition: 'Updates a user',
                tags: ['user'],
                summary: 'Updates a user',
                body: {
                    type: 'object',
                    required: ['name', 'image', 'email', 'password'],
                    properties: {
                        name: { type: 'string' },
                        image: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                    },
                },
                response: {
                  201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                      user: { name: 'string', image: 'string' }
                    }
                  },
                },
                security: [
                  {
                    "apiKey": []
                  }
                ]
            },
        },
        async (request, reply) => {
            try {
                const { sub } = request.user
                const { name, image, email, password } = request.body

                return UsersService.update(fastify, { id: sub, name, image, email, password })
            } catch (error) {
                throw Error(error)
            }
        }
    )

    fastify.get('/users', { preValidation: [fastify.authenticate] }, async (request, reply) => {
        try {
            const { sub, email } = request.user

            return await UsersService.findOne(fastify, sub)
        } catch (error) {
            throw Error(error)
        }
    })
}
