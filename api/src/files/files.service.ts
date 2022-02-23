import { S3 } from '../constants'
import { getKey } from '../util'

export const FilesService = {
    delete: async (fastify: any, filename: string): Promise<any> => {
        await fastify.s3
            .deleteObject({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: filename,
            })
            .promise()
    },

    deleteAll: async (fastify: any, filenames: string[]): Promise<any> => {
        const params: any = {
            Bucket: process.env.AWS_S3_BUCKET,
            Delete: {
                Objects: filenames,
            },
        }
        return await fastify.s3.deleteObjects(params).promise()
    },

    getSignedUrl: async (fastify: any, filename: string): Promise<any> => {
        const Expires = S3.EXPIRES
        const Bucket = process.env.AWS_S3_BUCKET
        const Key = getKey(filename)

        return fastify.s3.getSignedUrl('getObject', { Bucket, Key, Expires })
    },
}
