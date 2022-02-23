import { WS_EVENT_TYPE } from '../constants'

export const WebsocketService = {
    getRoomName: (rooms: string[]) => {
        return rooms.join('+')
    },

    pong: async function (fastify: any, userId: string) {
        const room = this.getRoomName([userId])
        fastify.io.to(room).emit(room, {
            type: WS_EVENT_TYPE.PONG,
            payload: 'pong',
        })
    },

    teamLeave: async function (fastify: any, userId: string, teamId: string) {
        const room = this.getRoomName([userId])
        fastify.io.to(room).emit(room, {
            type: WS_EVENT_TYPE.TEAM.LEAVE,
            payload: teamId,
        })
    },

    teamDelete: async function (fastify: any, teamId: string) {
        const room = this.getRoomName([teamId])
        fastify.io.to(room).emit(room, {
            type: WS_EVENT_TYPE.TEAM.DELETE,
            payload: true,
        })
    },

    issueCreate: async function (fastify: any, teamId: string, inboxId: string, payload: any) {
        const room = this.getRoomName([teamId, inboxId])
        fastify.io.to(room).emit(room, {
            type: WS_EVENT_TYPE.ISSUE.CREATE,
            payload,
        })
    },

    // Not yet implemented anywhere

    issueDelete: async function (fastify: any, teamId: string, inboxId: string, issueId: string) {
        const room = this.getRoomName([teamId, inboxId])
        fastify.io.to(room).emit(WS_EVENT_TYPE.ISSUE.DELETE, issueId)
    },

    issueUpdate: async function (fastify: any, teamId: string, inboxId: string, payload: any) {
        const room = this.getRoomName([teamId, inboxId])
        fastify.io.to(room).emit(WS_EVENT_TYPE.ISSUE.UPDATE, payload)
    },

    comment: async function (fastify: any, teamId: string, issueId: string, payload: any) {
        const room = this.getRoomName([teamId, issueId])
        fastify.io.to(room).emit(WS_EVENT_TYPE.COMMENT, payload)
    },

    attachmentComment: async function (fastify: any, teamId: string, attachmentId: string, payload: any) {
        const room = this.getRoomName([teamId, attachmentId])
        fastify.io.to(room).emit(WS_EVENT_TYPE.ATTACHMENT_COMMENT, payload)
    },
}
