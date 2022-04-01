export function useStorage() {
    return {
        setStorage: (name: string, val: string): void => {
            localStorage.setItem(name, val)
        },
        getStorage: (name: string): string => {
            return localStorage.getItem(name)
        },
        deleteStorage: (name: string): void => {
            localStorage.removeItem(name)
        },
    }
}
