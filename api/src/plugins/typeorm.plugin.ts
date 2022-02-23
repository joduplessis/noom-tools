import fp from 'fastify-plugin'
const { createConnection } = require('typeorm')

module.exports = fp(async function (fastify, options: any) {
    try {
        const connection = await options.connection
        fastify.decorate('orm', connection).addHook('onClose', async (instance: any, done: any) => {
            await instance.orm.close()
            done()
        })
    } catch (error) {
        throw Error(error)
    }
})
