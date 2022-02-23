import { logger } from '../helpers/util'
import uuid from 'uuid/v4'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'

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
