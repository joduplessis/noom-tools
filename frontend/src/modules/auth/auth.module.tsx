import queryString from 'query-string'
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { ERROR, VIEW } from '../../constants'
import { logger } from '../../helpers/util'
import { useAuth } from '../../hooks/auth.hook'
import './auth.module.sass'

interface IAuthModule {
    children?: any
}

export const AuthModule: FunctionComponent = (props: IAuthModule): ReactElement => {
    const history = useHistory()
    const { accountId } = useParams()
    const [view, setdiv] = useState(VIEW.LOGIN)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [name, setName] = useState('')
    const [resetToken, setResetToken] = useState('')
    const [error, setError] = useState(null)
    const { search } = useLocation()
    const { login, createAccount, resetPassword, updatePassword } = useAuth()

    const resetFields = () => {
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
        setName('')
        setResetToken('')
    }

    const handleLogin = async () => {
        setError(null)
        try {
            await login(email, password)

            const parsed: any = queryString.parse(search)
            const { returnUrl } = parsed

            history.push(returnUrl ? returnUrl.replaceAll('+', '?') : '/app')
        } catch (error: any) {
            logger(error)
            setError(ERROR.API.GENERAL)
        }
    }

    const handleSignup = async () => {
        setError(null)
        try {
            await createAccount(email, name, password)
            resetFields()
            setdiv(VIEW.LOGIN)
        } catch (error: any) {
            logger(error)
            setError(ERROR.API.GENERAL)
        }
    }

    const handleReset = async () => {
        setError(null)
        try {
            await resetPassword(email)
            resetFields()
            setdiv(VIEW.RESET)
        } catch (error: any) {
            logger(error)
            setError(ERROR.API.GENERAL)
        }
    }

    const handleUpdate = async () => {
        setError(null)
        try {
            await updatePassword(email, resetToken, password)
            resetFields()
            setdiv(VIEW.UPDATE)
        } catch (error: any) {
            logger(error)
            setError(ERROR.API.GENERAL)
        }
    }

    useEffect(() => {
        setError(null)
    }, [view])

    return (
        <div className="app-module">
            <div className="h-100 bg-cl-gray-200">
                <div className="ml-auto mr-auto bg-cl-white bdr-r-900" style={{ padding: '5rem', paddingRight: '3rem', paddingLeft: '3rem' }}>
                    {!!error && (
                        <p className="uppercase cl-red fw-900 mb-900 ta-center w-100">
                            {error}
                        </p>
                    )}

                    {view == VIEW.LOGIN && (
                        <div className="column">
                            <input name="email" className="mb-500" type="text" value={email} placeholder="Email" onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} />
                            <input name="password" className="mb-500" type="password" value={password} placeholder="Password" onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} />
                            <div className="mt-900">
                                <button className="pl-900 pr-900" onClick={() => handleLogin()}>
                                    Login
                                </button>
                            </div>
                            <div className="mt-500 row">
                                <p className="cl-gray-500 m-300 cursor-pointer buttonize fw-700 fs-400" onClick={() => setdiv(VIEW.SIGNUP)}>
                                    Create an account
                                </p>
                                <p className="cl-gray-500 m-300 cursor-pointer buttonize fw-700 fs-400" onClick={() => setdiv(VIEW.RESET)}>
                                    Reset my password
                                </p>
                            </div>
                        </div>
                    )}

                    {view == VIEW.SIGNUP && (
                        <div className="column">
                            <h1 className="ta-center w-100 mb-900 cl-yellow">
                                create an account
                            </h1>
                            <input className="mb-500" type="text" value={email} placeholder="Email" onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} />
                            <input className="mb-500" type="text" value={name} placeholder="Full name" onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)} />
                            <input className="mb-500" type="password" value={password} placeholder="Password" onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} />
                            <input
                                className="mb-500"
                                type="password"
                                value={passwordConfirm}
                                placeholder="Confirm password"
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setPasswordConfirm(e.currentTarget.value)}
                            />
                            <div className="mt-900">
                                <button className="pl-900 pr-900" onClick={() => handleSignup()}>
                                    Signup
                                </button>
                            </div>
                            <div className="mt-500 row">
                                <p className="cl-gray-500 m-300 cursor-pointer buttonize fw-700 fs-400" onClick={() => setdiv(VIEW.LOGIN)}>
                                    ← Go back
                                </p>
                            </div>
                        </div>
                    )}

                    {view == VIEW.RESET && (
                        <div className="column">
                            <h1 className="ta-center w-100 mb-900 cl-yellow">
                                reset password
                            </h1>
                            <input className="mb-500" type="text" value={email} placeholder="Email" onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} />
                            <div className="mt-900">
                                <button className="pl-900 pr-900" onClick={() => handleReset()}>
                                    Send reset email
                                </button>
                            </div>
                            <div className="mt-500 row">
                                <p className="cl-gray-500 m-300 cursor-pointer buttonize fw-700 fs-400" onClick={() => setdiv(VIEW.LOGIN)}>
                                    ← Go back
                                </p>
                                <p className="cl-gray-500 m-300 cursor-pointer buttonize fw-700 fs-400" onClick={() => setdiv(VIEW.UPDATE)}>
                                    I have a reset code →
                                </p>
                            </div>
                        </div>
                    )}

                    {view == VIEW.UPDATE && (
                        <div className="column">
                            <h1 className="ta-center w-100 mb-900 cl-yellow">
                                update password
                            </h1>
                            <input className="mb-500" type="text" value={resetToken} placeholder="Token" onChange={(e: React.FormEvent<HTMLInputElement>) => setResetToken(e.currentTarget.value)} />
                            <input className="mb-500" type="text" value={email} placeholder="Email" onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} />
                            <input className="mb-500" type="password" value={password} placeholder="Password" onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} />
                            <input
                                className="mb-500"
                                type="password"
                                value={passwordConfirm}
                                placeholder="Confirm password"
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setPasswordConfirm(e.currentTarget.value)}
                            />
                            <div className="mt-900">
                                <button className="bg-clr-black pl-900 pr-900" onClick={() => handleUpdate()}>
                                    Update
                                </button>
                            </div>
                            <div className="mt-500 row">
                                <p className="cl-gray-500 m-300 cursor-pointer buttonize fw-700 fs-400" onClick={() => setdiv(VIEW.RESET)}>
                                    ← Go back
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
