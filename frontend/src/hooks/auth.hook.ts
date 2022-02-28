import { NOOM_JWT } from '../constants'
import { AuthService } from '../modules/auth/services/auth.service'
import { useStorage } from './storage.hook'

export function useAuth() {
    const { setStorage, getStorage, deleteStorage } = useStorage()
    const token = getStorage(NOOM_JWT)

    const parseJwt = (token: string): any => {
        const base64Url: string = token.split('.')[1]
        const base64: string = base64Url.replace('-', '+').replace('_', '/')
        return JSON.parse(window.atob(base64))
    }

    const saveToken = (token: string): void => {
        setStorage(NOOM_JWT, token)
    }

    const getUserEmail = () => {
        if (!token) return null
        return parseJwt(token).email
    }

    const getUserId = () => {
        if (!token) return null
        return parseJwt(token).sub
    }

    const getToken = (): string => {
        if (!token) return null
        const expiry = parseJwt(token).exp
        const epoch = Math.floor(new Date().getTime() / 1000)
        return expiry < epoch ? null : token
    }

    const deleteToken = (): void => {
        deleteStorage(NOOM_JWT)
    }

    // These are API driven hooks

    const login = async (email: string, password: string): Promise<any> => {
        try {
            const { token } = await AuthService.login(email, password)
            saveToken(token)
            return true
        } catch (error) {
            throw Error(error)
        }
    }

    const createAccount = async (email: string, name: string, password: string): Promise<any> => {
        try {
            await AuthService.signup(email, name, password)
            return true
        } catch (error) {
            throw Error(error)
        }
    }

    const resetPassword = async (email: string): Promise<any> => {
        try {
            await AuthService.resetPassword(email)
            return true
        } catch (error) {
            throw Error(error)
        }
    }

    const updatePassword = async (email: string, resetToken: string, password: string): Promise<any> => {
        try {
            await AuthService.updatePassword(email, resetToken, password)
            return true
        } catch (error) {
            throw Error(error)
        }
    }

    const reIssueToken = async (): Promise<string> => {
        try {
            const { token } = await AuthService.reIssueToken(getToken())
            saveToken(token)
            return token
        } catch (error) {
            throw Error(error)
        }
    }

    const updateMe = async (values: any): Promise<any> => {
        try {
            await AuthService.updateMe(getToken(), values)
            return true
        } catch (error) {
            throw Error(error)
        }
    }

    const getMe = async () => {
        try {
            return await AuthService.me(getToken())
        } catch (error) {
            throw Error(error)
        }
    }

    return {
        saveToken,
        getUserId,
        getUserEmail,
        getToken,
        deleteToken,
        parseJwt,
        login,
        createAccount,
        resetPassword,
        updatePassword,
        reIssueToken,
        updateMe,
        getMe,
    }
}
