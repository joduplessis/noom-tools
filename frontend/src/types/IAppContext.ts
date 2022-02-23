import { Dayjs } from 'dayjs'

export interface IAppContext {
    country?: string
    brand?: string
    fromDate?: Dayjs
    toDate?: Dayjs
    setApp?: any
}
