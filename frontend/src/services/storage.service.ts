export class StorageService {
    static setStorage(name: string, val: string): void {
        localStorage.setItem(name, val)
    }

    static getStorage(name: string): string {
        return localStorage.getItem(name)
    }

    static deleteStorage(name: string): void {
        localStorage.removeItem(name)
    }
}
