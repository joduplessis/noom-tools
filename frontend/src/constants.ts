import * as environment from './environment'

export const API_HOST: string = environment.API_HOST
export const NODE_ENV: string = environment.NODE_ENV
export const SENTRY_DSN: string = environment.SENTRY_DSN
export const WS_URL: string = environment.WS_URL
export const NOOM_JWT: string = 'NOOM_JWT'
export const DATE_FORMAT_API: string = 'YYYY-MM-DD'
export const DATE_FORMAT_METRIC: string = 'MMM D, YYYY'
export const SUCCESS: any = {}
export const ERROR: any = {
    API: {
        GENERAL: 'There has been an error.',
    },
}
export const COLOR: any = {}
export const CHUNK_SIZE: number = 5
export const MESSAGE_TIMEOUT: number = 5000
export const THEME: any = {}
export const SIZE: any = {}
export const VIEW = {
    EMAIL: 'EMAIL',
    SETUP: 'SETUP',
    LOGIN: 'LOGIN',
    SIGNUP: 'SIGNUP',
    RESET: 'RESET',
    UPDATE: 'UPDATE',
    ALL: 'ALL',
    BUG: 'BUG',
    FEATURE: 'FEATURE',
    GENERAL: 'GENERAL',
    ASSIGNED: 'ASSIGNED',
    LABEL: 'LABEL',
    INBOX: 'INBOX',
    TYPE: 'TYPE',
}
export const CDN: any = environment.CDN
