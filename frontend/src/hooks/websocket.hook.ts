import { logger } from '../helpers/util'
import { useContext, useEffect, useRef, useState } from 'react'
import uuid from 'uuid/v4'
import { WebsocketContext } from '../contexts/websocket.context'
import { usePubsub } from './pubsub.hook'

export function useWebsocket() {
    const { error, disconnected, connected, join, leave } = useContext(WebsocketContext)

    const createRoomName = (rooms: string[]) => {
        return rooms.join('+')
    }

    return {
        error,
        connected,
        disconnected,
        join,
        leave,
        createRoomName,
    }
}

export function useSubscription() {
    const { join, leave, connected } = useContext(WebsocketContext)
    const { subscribe, unsubscribe } = usePubsub()
    const eventNameCache = useRef(null)

    useEffect(() => {
        return () => {
            if (!eventNameCache.current) return

            logger('Leave & sunsubscribe from: ' + eventNameCache.current)
            leave(eventNameCache.current)
            unsubscribe(eventNameCache.current)
        }
    }, [])

    return {
        messageListener: (eventName: string, callback: any) => {
            eventNameCache.current = eventName

            logger('Join & subscribe to: ' + eventName)
            join(eventName)
            subscribe(eventName, callback)
        },
    }
}
