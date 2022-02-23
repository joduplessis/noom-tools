import { Dayjs } from 'dayjs'
import { NODE_ENV, DATE_FORMAT_API, ERROR } from '../constants'

export const routeIsActive = (path: string): boolean => {
    const { pathname } = window.location
    return path == pathname
}

export const redirectForbidden = (history: any, statusCode: number | null | unknown) => {
    if (statusCode) {
        if (statusCode == 403) history.push(`/auth`)
    }
}

export const returnParser = async (result: any): Promise<any> => {
    try {
        if (result.status != 200) {
            throw result.status
        } else {
            if (result.headers.get('content-type')) {
                return result.json()
            } else {
                return result
            }
        }
    } catch (e) {
        throw result.status
    }
}

export const formatDateForAPI = (dayjs: Dayjs): string => {
    return dayjs.format(DATE_FORMAT_API)
}

export const nFormatter = (num: number, digits: number): string => {
    const si = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    let i
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
}

export const createURLQueryString = (parameters: string[]): string => {
    const params = []
    for (const parameter in parameters) {
        params.push(parameter + '=' + parameters[parameter])
    }
    return params.join('&')
}

export const getQueryStringValue = (name: string): string => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    const results = regex.exec(location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export const bytesToSize = (bytes: number): string => {
    const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb']
    if (bytes == 0) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)) + '', 10)
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

export const urlParser = (url: string): string[] => {
    if (!url) return []
    if (typeof url != 'string') return []

    const match = url.match(/(http[s]?:\/\/.*)/i)
    return match ? match[0].split(' ') : []
}

export const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

export const showLocalPushNotification = (title: string, body: string): void => {
    navigator.serviceWorker.ready.then((register) => {
        const serviceWorkerRegistration = register

        if (serviceWorkerRegistration) {
            serviceWorkerRegistration.showNotification(title, {
                body,
                icon: '',
                image: '',
            })
        }
    })
}

export const copyToClipboard = (value: string): void => {
    const tempInput: any = document.createElement('input')
    tempInput.style = 'position: absolute; left: -1000px; top: -1000px;'
    tempInput.value = value
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
}

export const logger = function (a?): void {
    if (NODE_ENV == 'development') {
        for (const argument of arguments) {
            console.log(argument)
        }
    }
}

export const isValidEmail = (email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

export const decimalToMinutes = (minutes: number): string => {
    const sign = minutes < 0 ? '-' : ''
    const min = Math.floor(Math.abs(minutes))
    const sec = Math.floor((Math.abs(minutes) * 60) % 60)
    return sign + (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec
}

export const stripSpecialChars = (text: string): string => {
    return text ? text.replace(/[`~!@#$%^&*()|+\= ?;:'",.<>\{\}\[\]\\\/]/gi, '') : ''
}

export const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

export const classNames = (object: any): string => {
    const classArray = []

    for (const property in object) {
        if (object[property]) classArray.push(property)
    }

    return classArray.join(' ')
}

export const findRoleTypeWithRoleId = (roles: any[], roleId: string): string => {
    return roles.reduce((acc, val) => {
        if (val.id == roleId) {
            return acc + val.type
        } else {
            return acc + ''
        }
    }, '')
}
