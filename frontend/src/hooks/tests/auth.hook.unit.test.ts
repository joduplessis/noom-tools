import { renderHook, act } from '@testing-library/react-hooks'
import { useAuth } from '../auth.hook'

test('should increment counter', () => {
  const { result } = renderHook(() => useAuth())
  const { 
    saveToken,
    getUserId,
    getUserEmail,
    getToken,
    deleteToken,
    parseJwt,
    login,
    createAccount,
    resetPassword,
    updatePassword,
    reIssueToken,
    updateMe,
    getMe,
  } = result.current

  act(() => {
    //result.current.increment()
  })

  //expect(1).toBe(1)
})