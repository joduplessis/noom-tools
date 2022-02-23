import { Dayjs } from 'dayjs'
import { NODE_ENV, DATE_FORMAT_API, ERROR } from '../constants'

export const highestZIndex = (): number => {
    return Array.from(document.querySelectorAll('body *'))
        .map((a) => parseFloat(window.getComputedStyle(a).zIndex))
        .filter((a) => !isNaN(a))
        .sort()
        .pop()
}

export const logger = function (a?): void {
    if (NODE_ENV == 'development') {
        for (const argument of arguments) {
            console.log(argument)
        }
    }
}

export const classNames = (object: any, classes: string = ''): string => {
    const classArray = []

    for (const property in object) {
        if (object[property]) classArray.push(property)
    }

    if (classArray.length == 0) return classes

    const allClasses = classArray.join(' ')

    return classes ? allClasses + ' ' + classes : allClasses
}