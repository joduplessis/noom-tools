import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Image } from './image'

describe('Image', () => {
    test('renders a <Image />', () => {
        const { container, getByText } = render(<Image src="" width={20} height={20} />)
        expect(container.getElementsByClassName('image').length).toBe(1)
    })
})