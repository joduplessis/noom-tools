import { API_HOST } from '../../../constants'
import { returnParser } from '../../../helpers/util'

export class ApiService {
    static async get(token: string): Promise<any> {
        const result: any = await fetch(`${API_HOST}/accounts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
        return await returnParser(result)
    }
}
