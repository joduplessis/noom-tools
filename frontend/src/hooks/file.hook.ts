import { CDN } from '../constants'
import { logger } from '../helpers/util'
import { FilesService } from '../services/files.service'
import { useAuth } from './auth.hook'

export function useFile() {
    const { getToken } = useAuth()

    const uploadFile = async (folder: string, file: File, secure: boolean): Promise<string> => {
        try {
            const { name, type, size } = file

            // Get the signed URL so we can upload
            const { signedUrl } = await FilesService.getUploadUrl(getToken(), folder, name, type, secure)
            logger(`uploadFile:signedUrl: ${signedUrl}`)

            // Now upload the file with the signed URL
            const { url } = await FilesService.upload(signedUrl, file, type, secure)
            logger(`uploadFile:url: ${url}`)

            // If we want a secure upload, then return a URL signed to GET the object
            // Otherwise strip any query strings away & return the URL
            // Always use CDN
            if (secure) {
                const secureUrl = await getSecureUrl(url)
                return secureUrl.replace(CDN.ORIGIN, CDN.CDN)
            } else {
                const insecureUrl = url.split('?')[0]
                return insecureUrl.replace(CDN.ORIGIN, CDN.CDN)
            }
        } catch (error) {
            throw Error(error)
        }
    }

    const deleteFile = async (filename: string): Promise<any> => {
        try {
            await FilesService.delete(getToken(), filename)
            return true
        } catch (error) {
            throw Error(error)
        }
    }

    const downloadFile = async (filename: string): Promise<any> => {
        try {
            await FilesService.download(getToken(), filename)
            return true
        } catch (error) {
            throw Error(error)
        }
    }

    const getSecureUrl = async (filename: string): Promise<any> => {
        try {
            const { url } = await FilesService.getSignedUrl(getToken(), filename)
            logger(`getSecureUrl: ${url}`)
            return url
        } catch (error) {
            throw Error(error)
        }
    }

    return {
        uploadFile,
        deleteFile,
        downloadFile,
        getSecureUrl,
    }
}
