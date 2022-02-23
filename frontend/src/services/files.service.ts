import { API_HOST } from '../constants'
import { returnParser } from '../helpers/util'

export class FilesService {
    static async delete(token: string, filename: string): Promise<any> {
        try {
            const result: any = await fetch(`${API_HOST}/files/delete?filename=${filename}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
            return await returnParser(result)
        } catch (error) {
            throw Error(error)
        }
    }

    static async deleteAll(token: string, filenames: string[]): Promise<any> {
        try {
            const result: any = await fetch(`${API_HOST}/files/delete-all`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({ filenames }),
            })
            return await returnParser(result)
        } catch (error) {
            throw Error(error)
        }
    }

    static async download(token: string, file: string): Promise<any> {
        try {
            let form = document.createElement('form')
            form.method = 'post'
            form.target = '_blank'
            form.action = `${API_HOST}/files/download?file=${file}`
            form.innerHTML = '<input type="hidden" name="token" value="' + token + '">'
            document.body.appendChild(form)
            form.submit()
            document.body.removeChild(form)
        } catch (error) {
            throw Error(error)
        }
    }

    static async getSignedUrl(token: string, file: string): Promise<any> {
        try {
            const result: any = await fetch(`${API_HOST}/files/get-signed-url?file=${file}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
            return await returnParser(result)
        } catch (error) {
            throw Error(error)
        }
    }

    static async getUploadUrl(folder: string, token, filename, mime, secure): Promise<any> {
        try {
            const result: any = await fetch(`${API_HOST}/files/get-upload-url`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({ folder, filename, mime, secure }),
            })
            return await returnParser(result)
        } catch (error) {
            throw Error(error)
        }
    }

    static async upload(url, file, mime, secure) {
        try {
            const result: any = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': mime,
                    'x-amz-acl': secure ? 'private' : 'public-read',
                },
                body: file,
            })
            return await returnParser(result)
        } catch (error) {
            throw Error(error)
        }
    }
}
