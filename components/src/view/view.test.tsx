import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { View } from './view'
import { ScrollView } from '..'

const WithScrollView = () => (
    <div style={{ width: 500, height: 500, position: 'relative' }}>
        <ScrollView
            controlled
            stickToTop={false}
            stickToBottom={true}
            onScrollToBottom={() => console.log('Reacted bottom')}
            onScrollToTop={() => console.log('Reacted top')}
            class="bg-cl-gray-100"
        >
            <h1>one</h1>
            <h1>two</h1>
            <h1>three</h1>
        </ScrollView>
    </div>
)

describe('View', () => {
    test('renders a <View />', () => {
    const { container, getByText } = render(<View />)
    expect(container.getElementsByClassName('view').length).toBe(1)
    })

    test('renders a <ScrollView />', () => {
        const { container, getByText } = render(<WithScrollView />)
        const el = container.firstChild as HTMLDivElement
        expect(container.getElementsByClassName('view').length).toBe(1)
        expect(el.style.width).toBe("500px")
        expect(el.style.height).toBe("500px")
    })
})