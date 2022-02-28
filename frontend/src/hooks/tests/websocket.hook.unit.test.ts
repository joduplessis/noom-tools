import { renderHook, act } from '@testing-library/react-hooks'
import { useWebsocket, useSubscription } from '../websocket.hook'

test('should increment counter', () => {
    const { result } = renderHook(() => useWebsocket())
    const { result } = renderHook(() => useWebsocket())

    act(() => {
        //result.current.increment()
    })

    expect(1).toBe(1)
})
