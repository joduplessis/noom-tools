import fp from 'fastify-plugin'
import * as postmark from 'postmark'
import * as AWS from 'aws-sdk'

module.exports = fp(async function (fastify, options: any) {
    const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID
    const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY
    const endpoint = new AWS.Endpoint(process.env.AWS_S3_ENDPOINT)
    const region = process.env.AWS_S3_REGION

    const s3Instance = new AWS.S3({
        // Using Digital Ocean doesn't require these:
        // s3BucketEndpoint: true,
        // signatureVersion: 'v4',
        // region,
        endpoint,
        accessKeyId,
        secretAccessKey,
    })

    fastify.decorate('s3', s3Instance).addHook('onClose', async (instance: any, done: any) => {
        done()
    })
})
