import { renderHook, act } from '@testing-library/react-hooks'
import { useFile } from '../file.hook'

test('should increment counter', () => {
    const { result } = renderHook(() => useFile())
    const { uploadFile, deleteFile, downloadFile, getSecureUrl } = result.current

    act(() => {
        //result.current.increment()
    })

    expect(1).toBe(1)
})
