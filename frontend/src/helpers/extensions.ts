interface String {
    toTitleCase(this: string): string
    timeToDecimal(this: string): number
    toSentenceCase(this: string): string
}

interface Number {
    numberShorthand(this: number): string
}

interface Array<T> {
    flatten(this: Array<T>): any
    last(this: Array<T>): any
}

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

String.prototype.timeToDecimal = function () {
    const arr: any = Number(this.split(':'))
    const dec = parseInt((arr[1] / 6) * 10 + '', 10)

    return parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec)
}

String.prototype.toSentenceCase = function () {
    return this.split(' ')
        .map((s) => s.toLowerCase())
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
}

Number.prototype.numberShorthand = function () {
    const num = parseInt(this + '', 10)

    if (num < 1000) return num.toString()
    if (num >= 1000 && num < 1000000) return num.toString().substring(0, num.toString().length - 3) + 'k'
    if (num >= 1000000) return num.toString().substring(0, num.toString().length - 6) + 'm'

    return num.toString()
}

Array.prototype.flatten = function () {
    return this.length == 0 ? null : this[0]
}

Array.prototype.last = function () {
    return this[this.length - 1]
}
