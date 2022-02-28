import { Repository, UpdateResult, DeleteResult, MoreThan, LessThan } from 'typeorm'
import { User } from './user.entity'
import { hash, compare } from 'bcryptjs'

export const UsersService = {
    update: async (fastify: any, user: any): Promise<any> => {
        if (user.password) user.password = await hash(user.password, 10)

        return await fastify.orm.getRepository(User).update(user.id, user)
    },

    findOne: async (fastify: any, id: string): Promise<User> => {
        return await fastify.orm.getRepository(User).findOne(id)
    },

    findOneWithEmail: async (fastify: any, email: string): Promise<User> => {
        return await fastify.orm.getRepository(User).findOne({ where: { email } })
    },

    findOneWithEmailAndResetToken: async (fastify: any, email: string, resetToken: string): Promise<User> => {
        return await fastify.orm.getRepository(User).findOne({ where: { email, resetToken } })
    },

    create: async (fastify: any, user: any): Promise<User> => {
        try {
            user.password = await hash(user.password, 10)
            return await fastify.orm.getRepository(User).save(user)
        } catch (e) {
            throw e
        }
    },
}
