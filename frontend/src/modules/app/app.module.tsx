import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { WS_URL } from '../../constants'
import { AppContext } from '../../contexts/app.context'
import { WebsocketProvider } from '../../contexts/websocket.context'
import { redirectForbidden } from '../../helpers/util'
import { useAuth } from '../../hooks/auth.hook'
import { useSubscription, useWebsocket } from '../../hooks/websocket.hook'
import { AuthService } from '../../modules/auth/services/auth.service'
import { IRoute } from '../../types/IRoute'
import './app.module.sass'
import { AppRoutes } from './app.routes'

const App = (props: any) => {
    const history = useHistory()
    const app = useContext(AppContext)
    const { getToken } = useAuth()
    const { error, disconnected, connected } = useWebsocket()
    const user = useQuery(['AuthService.me'], async () => await AuthService.me(getToken()), {
        initialData: {},
        onError: (error: any) => redirectForbidden(history, error),
    }) 

    useEffect(() => {
        const { messageListener } = useSubscription()

        messageListener('user-007', (message) => {
            // Do something here with the message
        })
    }, [connected])
    
    return (
        <div className="app-module">
            <div className="app-module__container">
                <div className="app-module__padding">
                    <Router>
                        {AppRoutes.generate().map((route: IRoute, index: number) => (
                            <Route exact path={route.path.split('?')[0]} component={route.component} key={index} />
                        ))}
                    </Router>
                </div>
            </div>
        </div>
    )
}

export const AppModule = (props: any) => {
    const history = useHistory()
    const { getToken } = useAuth()

    useEffect(() => {
        if (!getToken()) return history.push('/auth')
    }, [])

    return (
        <WebsocketProvider url={WS_URL}>
            <App />
        </WebsocketProvider>
    )
}
