import { useEffect } from 'react'
import io from 'socket.io-client'
import uuid from 'uuid/v4'
import { logger } from '../helpers/util'

export function useTabVisibility(cb: any) {
    useEffect(() => {
        document.addEventListener('visibilitychange', cb)

        return () => document.removeEventListener('visibilitychange', cb)
    })
}
