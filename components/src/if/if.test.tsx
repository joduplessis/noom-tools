import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { If } from './if'

describe('If', () => {
    test('render content inside a <If />', () => {
        const { container, getByText } = render(<If if={true}><p>Show this</p></If>)
        expect(getByText('Show this')).toBeInTheDocument()
    })

    test('do not render content inside a <If />', () => {
        const { container, getByText, queryByText } = render(<If if={false}><p>Show this</p></If>)
        const el = queryByText('Show this')
        expect(el).toBeNull()
    })
})