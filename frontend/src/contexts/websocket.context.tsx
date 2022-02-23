import React, { createContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { logger } from '../helpers/util'
import { useAuth } from '../hooks/auth.hook'
import { usePubsub } from '../hooks/pubsub.hook'

const defaultWebsocketContext = {
    connected: false,
    disconnected: null,
    error: null,
    publish: (eventName: string, payload: any) => null,
    join: (room: string) => null,
    leave: (room: string) => null,
}

export const WebsocketContext = createContext(defaultWebsocketContext)

export const WebsocketProvider = (props) => {
    const [state, setState] = useState(defaultWebsocketContext)
    const { getToken } = useAuth()
    const { publish } = usePubsub()

    const handleConnect = () => {
        logger('WS CONTEXT: CONNECTED')
        setState({
            ...state,
            connected: true,
            disconnected: false,
            error: null,
            publish: (eventName: string, payload: any) => WebsocketService.getInstance().emit(eventName, payload),
            leave: (room: string) => WebsocketService.getInstance().emit('leave', room),
            join: (room: string) => {
                logger('WS JOIN: ' + room + ' - ' + getToken())
                WebsocketService.getInstance().emit('join', { token: getToken(), room })
            },
        })
    }

    const handleDisconnect = (error: string) => {
        logger('WS CONTEXT: DISCONNECTED')
        setState({ ...state, connected: false, disconnected: error, error: null })
    }

    const handleError = (error: any) => {
        logger('WS CONTEXT: ERROR')
        setState({ ...state, connected: false, disconnected: false, error })
    }

    const handleEvent = (eventName: string, data: any) => {
        logger(`WS CONTEXT: RECEIVED RAW: ${eventName} ${data}`)
        publish(eventName, data)
    }

    useEffect(() => {
        WebsocketService.getInstance().connect({
            url: props.url,
            token: getToken(),
            handleConnect,
            handleDisconnect,
            handleError,
            handleEvent,
        })

        return () => {
            WebsocketService.getInstance().disconnect()
        }
    }, [])

    return <WebsocketContext.Provider value={state}>{props.children}</WebsocketContext.Provider>
}

export class WebsocketService {
    static instance
    socket
    listeners = {}

    constructor() {}

    static getInstance() {
        if (this.instance) return this.instance
        this.instance = new WebsocketService()
        return this.instance
    }

    emit(eventName: string, payload: any) {
        this.socket.emit(eventName, payload)
    }

    disconnect() {
        this.socket.disconnect()
    }

    connect({ token, url, handleConnect, handleError, handleDisconnect, handleEvent }) {
        this.socket = io(url, {
            autoConnect: false,
            transports: ['websocket', 'polling'],
            auth: { token },
        })
        this.socket.connect()
        this.socket.on('connect', handleConnect)
        this.socket.on('connect_error', handleError)
        this.socket.on('disconnect', handleDisconnect)
        this.socket.onAny(handleEvent)
    }
}
