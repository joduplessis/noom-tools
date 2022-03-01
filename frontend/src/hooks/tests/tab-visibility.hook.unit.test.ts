import { renderHook, act } from '@testing-library/react-hooks'
import { useTabVisibility } from '../tab-visibility.hook'

describe('tab-visibility.hook', () => {
    test('should trigger callback function', () => {
        let inc = 0
        const { result } = renderHook(() => useTabVisibility(() => (inc += 1)))
        document.dispatchEvent(new Event('visibilitychange'))
        expect(inc).toBe(1)
    })
})