import { API_HOST } from '../../../constants'
import { returnParser } from '../../../helpers/util'

export class AuthService {
    static async login(email: string, password: string): Promise<any> {
        try {
            const result: any = await fetch(API_HOST + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            return await returnParser(result)
        } catch (error) {
            throw Error(error)
        }
    }

    static async signup(email: string, name: string, password: string): Promise<any> {
        try {
            const result: any = await fetch(API_HOST + '/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    name,
                    password,
                }),
            })
            return await returnParser(result)
        } catch (error) {
            throw Error(error)
        }
    }

    static async resetPassword(email: string): Promise<any> {
        try {
            const result: any = await fetch(API_HOST + '/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            return await returnParser(result)
        } catch (error) {
            throw Error(error)
        }
    }

    static async updatePassword(email: string, resetToken: string, password: string): Promise<any> {
        try {
            const result: any = await fetch(API_HOST + '/auth/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    resetToken,
                    password,
                }),
            })
            return await returnParser(result)
        } catch (error) {
            throw Error(error)
        }
    }

    // These require an auth token

    static async reIssueToken(token: string): Promise<any> {
        try {
            const result: any = await fetch(`${API_HOST}/auth/re-issue-jwt`, {
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

    static async updateMe(token: string, values: any): Promise<any> {
        try {
            const result: any = await fetch(`${API_HOST}/auth/update-me`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(values),
            })
            return await returnParser(result)
        } catch (error) {
            throw Error(error)
        }
    }

    static async me(token: string): Promise<any> {
        try {
            const result: any = await fetch(API_HOST + '/auth/me', {
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
}
