import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { App } from '../../app'
import { AuthModule } from './auth.module'
import { AppProvider } from '../../contexts/app.context'
import '@testing-library/jest-dom/extend-expect'
import { act } from 'react-dom/test-utils'
import { waitForState } from '../../helpers/util'

const queryClient = new QueryClient()

const Auth = () => (
    <Router>
        <QueryClientProvider client={queryClient}>
            <AppProvider>
                <Route path="/" component={AuthModule} />
            </AppProvider>
        </QueryClientProvider>
    </Router>
)

describe('AuthModule', () => {
    test('initial state', () => {
        render(<Auth />)

        expect(screen.getByPlaceholderText('Email')).toHaveValue('')
        expect(screen.getByPlaceholderText('Password')).toHaveValue('')
    })

    // why not jest.spyOn(window, 'fetch').mockResolvedValue({ json: () => ({ error: '' }) })?
    // because testing against a real API is valuable so you are burdoned with keeping 2 API specs in sync
    test('successful login', async () => {
        render(<Auth />)

        const email = screen.getByPlaceholderText('Email')
        const password = screen.getByPlaceholderText('Password')
        const button = screen.getByRole('button')

        fireEvent.change(email, { target: { value: 'jo@joduplessis.com' } })
        fireEvent.change(password, { target: { value: 'jo' } })

        waitForState(async () => {
            fireEvent.click(button)

            await waitFor(() => {
                expect(button).not.toBeInTheDocument()
                expect(email).not.toBeInTheDocument()
                expect(password).not.toBeInTheDocument()
            })
        })
    })

    test('successful password reset', async () => {
        // TODO
    })

    test('successful password update', async () => {
        // TODO
    })

    test('successful signup', async () => {
        // TODO
    })
})
