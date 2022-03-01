import { renderHook, act } from '@testing-library/react-hooks'
import { useFile } from '../file.hook'

describe('file.hook', () => {
    test('upload & download files', () => {
        const { result } = renderHook(() => useFile())
        const { uploadFile, deleteFile, downloadFile, getSecureUrl } = result.current

        // TODO (need to get S3 up & running)
    })
})