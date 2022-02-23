import fp from 'fastify-plugin'
import * as postmark from 'postmark'

module.exports = fp(async function (fastify, options: any) {
    const client = new postmark.ServerClient(process.env.POSTMARK_TOKEN)

    fastify.decorate('mail', client).addHook('onClose', async (instance: any, done: any) => {
        done()
    })
})
