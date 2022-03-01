import { renderHook, act } from '@testing-library/react-hooks'
import { waitForState } from '../../helpers/util'
import { useAuth } from '../auth.hook'
import { validate as uuidValidate } from 'uuid'

const email = 'jo@joduplessis.com'
const password = 'jo'

describe('auth.hook', () => {
    test('login', async () => {
        const { result } = renderHook(() => useAuth())
        
        const {
            parseJwt,
            login,
        } = result.current

        const { token } = await login(email, password)
        expect(token).not.toBe(null)

        const parsedToken = parseJwt(token)
        expect(parsedToken.email).toBe(email)
    })

    test('save & retreive token', async () => {
        const { result } = renderHook(() => useAuth())
        
        const {
            saveToken,
            getUserId,
            getUserEmail,
            getToken,
            deleteToken,
            parseJwt,
            login,
        } = result.current

        const { token } = await login(email, password)

        expect(token).not.toBe(null)
        expect(parseJwt(token).email).toBe(email)
        expect(uuidValidate(getUserId())).toBe(true)
        expect(getUserEmail()).toBe(email)
        expect(getToken()).not.toBe(null)
    })

    test('logout', async () => {
        const { result } = renderHook(() => useAuth())
        
        const {
            saveToken,
            getUserId,
            getUserEmail,
            getToken,
            deleteToken,
            parseJwt,
            login,
        } = result.current

        await login(email, password)
        deleteToken()

        waitForState(() => {
            expect(getToken()).toBe(null)
        })

    })

    test('create account', async () => {
        // TODO
        // Ideally this should be mockup at a DB level (mock create)
        // So that we don't create more accounts
    })

    test('reset password & update password', async () => {
        // TODO
        // resetPassword will return a token (like login)
        // but a UUID token to use for the update
    })
})