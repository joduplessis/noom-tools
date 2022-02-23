import { v4 as uuidv4 } from 'uuid'
import { EMAIL_TYPE } from './constants'

export const getDataFromAddress = (email: string) => {
    if (!email) {
        return {
            type: EMAIL_TYPE.ISSUE,
            id: null,
        }
    } else {
        const parts = email.split('@')[0].split('-')
        return {
            type: parts[0].toUpperCase(),
            id: parts[1],
        }
    }
}

export const toSentenceCase = function (str: string) {
    return str
        .split(' ')
        .map((s) => s.toLowerCase())
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
}

export const getOrder = (sort: string): any => {
    switch (sort) {
        case 'DATE':
            return { 'issues.created_at': 'DESC' }
        case 'NAME':
            return { 'issues.title': 'DESC' }
        case 'TYPE':
            return { 'issues.type': 'DESC' }
    }
}

export const getKey = (url: string) => {
    return url.replace('https://', '').split('/').slice(1).join('/')
}

export const getValueFromMailHeaders = (headers: string, key: string) => {
    // Get the right value/key line
    const lines = headers.split('\n')
    const value = lines.filter((line: string) => line.split(':')[0].toUpperCase() == key.toUpperCase())[0]

    // If it's not there return null
    if (!value) return null

    // Mkae it into an array
    let valueArray = value.split(':')

    // Remove the fist value
    valueArray.shift()

    // Remove the key name
    return valueArray.join(':').trim()
}

export const createSlugFromName = (str: string) => {
    str = str.replace(/^\s+|\s+$/g, '') // trim
    str = str.toLowerCase()

    // remove accents, swap ñ for n, etc
    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
    const to = 'aaaaeeeeiiiioooouuuunc------'

    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    str = str
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-') // collapse dashes

    return str
}
