import { useEffect, useState } from 'react'
import { logger } from '../helpers/util'
import { v4 as uuidv4 } from 'uuid'

export function usePubsub() {
    const [subscriptionId, setSubscriptionId] = useState(uuidv4())

    const subscribe = (eventName: string, callback: any) => {
        PubsubService.getInstance().subscribe(eventName, subscriptionId, callback)
    }

    const unsubscribe = (eventName: string) => {
        PubsubService.getInstance().unsubscribe(eventName, subscriptionId)
    }

    const publish = (eventName: string, payload: any) => {
        PubsubService.getInstance().publish(eventName, payload)
    }

    return {
        subscribe,
        unsubscribe,
        publish,
    }
}

export class PubsubService {
    static instance
    socket
    listeners = {}

    constructor() {}

    static getInstance() {
        if (this.instance) return this.instance
        this.instance = new PubsubService()
        return this.instance
    }

    publish(eventName: string, payload: any) {
        if (this.listeners[eventName]) {
            if (Object.keys(this.listeners[eventName]).length != 0) {
                for (const [key, value] of Object.entries(this.listeners[eventName])) {
                    const cb = this.listeners[eventName][key]
                    cb(payload)
                }
            }
        }
    }

    subscribe(eventName: string, subscriptionId: string, cb: any) {
        if (!eventName) return
        if (!this.listeners[eventName]) this.listeners[eventName] = {}
        this.listeners[eventName][subscriptionId] = cb
        logger(`PUBSUB MSG SUB: ${eventName} - unique sub key ${subscriptionId}`)
        logger(this.listeners)
    }

    unsubscribe(eventName: string, subscriptionId: string) {
        if (!eventName) return
        if (!this.listeners[eventName]) this.listeners[eventName] = {}
        delete this.listeners[eventName][subscriptionId]
        logger(`PUBSUB MSG UNSUB: ${eventName} - unique sub key ${subscriptionId}`)
        logger(this.listeners)
    }
}
