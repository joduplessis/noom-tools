import { renderHook, act } from '@testing-library/react-hooks'
import { usePubsub } from '../pubsub.hook'

test('should subscribe, publish & receive a value', () => {
    const { result } = renderHook(() => usePubsub())
    const { subscribe, unsubscribe, publish } = result.current
    let val = null

    act(() => {
        subscribe('event-name', (newVal) => {
            val = newVal
        })

        publish('event-name', 'noom-tools')
    })

    expect(val).toBe('noom-tools')
})
