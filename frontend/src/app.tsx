import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AppProvider } from './contexts/app.context'
import { AppModule } from './modules/app/app.module'
import { AuthModule } from './modules/auth/auth.module'

const queryClient = new QueryClient()

export const App = (props) => {
    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <AppProvider>
                    <Switch>
                        <Route path="/app/:accountId" component={AppModule} />
                        <Route path="/auth" component={AuthModule} />
                    </Switch>
                </AppProvider>
            </QueryClientProvider>
        </Router>
    )
}
