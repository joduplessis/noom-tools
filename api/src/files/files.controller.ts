import { v4 as uuidv4 } from 'uuid'
import { FilesService } from './files.service'
import { extname } from 'path'
import { getKey } from '../util'
import { S3 } from '../constants'

export default async (fastify, opts) => {
    const options = {}

    fastify.delete(
        '/files/delete',
        {
            preValidation: [fastify.authenticate],
            schema: {
                querystring: {
                    type: 'object',
                    required: ['filename'],
                    properties: {
                        filename: {
                            type: 'string',
                        },
                    },
                },
            },
        },
        async (request, reply) => {
            try {
                const file: string = request.query.filename
                const key: string = getKey(file)

                await FilesService.delete(fastify, key)

                return { success: true }
            } catch (e) {
                return null
            }
        }
    )

    fastify.post(
        '/files/delete-all',
        {
            preValidation: [fastify.authenticate],
            schema: {
                body: {
                    type: 'object',
                    required: ['filenames'],
                    properties: {
                        filenames: {
                            type: 'array',
                            default: [],
                        },
                    },
                },
            },
        },
        async (request, reply) => {
            try {
                const { filenames } = request.body
                const keys: string[] = filenames.map((file: string) => getKey(file))

                await FilesService.deleteAll(fastify, keys)

                return { success: true }
            } catch (e) {
                return null
            }
        }
    )

    fastify.post(
        '/files/download',
        {
            preValidation: [fastify.authenticate],
            schema: {
                querystring: {
                    type: 'object',
                    required: ['file'],
                    properties: {
                        file: { type: 'string' },
                    },
                },
            },
        },
        async (request, reply) => {
            try {
                const url = await FilesService.getSignedUrl(fastify, request.query.file)

                reply.redirect(url)
            } catch (e) {
                return null
            }
        }
    )

    fastify.get(
        '/files/get-signed-url',
        {
            preValidation: [fastify.authenticate],
            schema: {
                querystring: {
                    type: 'object',
                    required: ['file'],
                    properties: {
                        file: { type: 'string' },
                    },
                },
            },
        },
        async (request, reply) => {
            try {
                const url = await FilesService.getSignedUrl(fastify, request.query.file)

                return { url }
            } catch (e) {
                return null
            }
        }
    )

    fastify.post(
        '/files/get-upload-url',
        {
            schema: {
                preValidation: [fastify.authenticate],
                body: {
                    type: 'object',
                    required: ['folder', ' filename', 'mime', 'secure'],
                    properties: {
                        folder: { type: 'string' },
                        filename: { type: 'string' },
                        mime: { type: 'string' },
                        secure: { type: 'boolean' },
                    },
                },
            },
        },
        async (request, reply) => {
            try {
                const Expires = S3.EXPIRES
                const Bucket = process.env.AWS_S3_BUCKET
                const { folder, filename, mime, secure } = request.body
                const Key = folder + '/' + uuidv4() + '.' + filename
                const ACL = secure ? 'private' : 'public-read'
                const ContentType = mime
                const params = { Bucket, Key, Expires, ACL, ContentType }
                const signedUrl = fastify.s3.getSignedUrl('putObject', params)

                return { signedUrl }
            } catch (error) {
                reply.code(error.statusCode).send(error)
            }
        }
    )
}
