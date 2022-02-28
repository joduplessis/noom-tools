import { API_HOST } from '../../../constants'
import { returnParser } from '../../../helpers/util'

export class UsersService {
    static async update(token: string, values: any): Promise<any> {
        try {
            const result: any = await fetch(`${API_HOST}/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(values),
            })
            return await returnParser(result)
        } catch (error) {
            throw Error(error)
        }
    }

    static async get(token: string): Promise<any> {
        try {
            const result: any = await fetch(API_HOST + '/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
            return await returnParser(result)
        } catch (error) {
            throw Error(error)
        }
    }
}
