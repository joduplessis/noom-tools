import { createAdapter } from '@socket.io/redis-adapter'
import fp from 'fastify-plugin'
import { AuthService } from '../auth/auth.service'
import { WebsocketService } from '../websocket/websocket.service'

module.exports = fp(async function (fastify: any, options) {
    try {
        const { redis } = fastify
        const pubClient = redis['socket-io-pub']
        const subClient = redis['socket-io-sub']

        fastify.io.adapter(createAdapter(pubClient, subClient))

        fastify.io.on('connection', (socket) => {
            const { sub, email, iss, iat, claims } = AuthService.verifyToken(fastify, socket.handshake.auth.token)
            const { id, rooms } = socket

            // Always join their username
            socket.join(sub)

            console.log('Joined room ' + sub)

            socket.on('disconnecting', () => {
                console.log(socket.id + ' disconnected')
            })

            socket.on('disconnect', () => {
                console.log(socket.id + ' disconnect')
            })

            socket.on('leave', (room) => {
                socket.leave(room)
                console.log(socket.id, ' just left room: ', room)
            })

            socket.on('join', ({ room, token }) => {
                const {
                    payload: { sub, claims },
                } = AuthService.decodeToken(fastify, token)

                // Test message
                setTimeout(() => WebsocketService.pong(fastify, sub), 2000)

                // Don't let them do this
                // They already are part of their own room
                if (sub == room) return

                // This is the team ID
                const claim = room.split('+')[0]

                // Verify that they are allowed to this team
                // claims are a list of team IDs
                if (AuthService.verifyClaims(fastify, claim, claims)) {
                    socket.join(room)
                    fastify.log.info(socket.id, ' just joined room: ', room)
                } else {
                    throw Error('Not allowed to this tenant')
                }
            })
        })

        // JWT authentication
        fastify.io.use((socket, next) => {
            if (AuthService.verifyToken(fastify, socket.handshake.auth.token)) {
                next()
            } else {
                next(new Error('Authentication error'))
            }
        })
    } catch (error) {
        fastify.log.error(error)
    }
})
