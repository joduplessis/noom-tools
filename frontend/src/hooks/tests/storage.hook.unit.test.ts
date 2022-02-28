import { renderHook, act } from '@testing-library/react-hooks'
import { useStorage } from '../storage.hook'

test('should set & get storage value', () => {
  const { result } = renderHook(() => useStorage())
  const { setStorage, getStorage, deleteStorage } = result.current

  act(() => {
    setStorage('testing', 'orange')
  })  

  expect(getStorage('testing')).toBe('orange')
})