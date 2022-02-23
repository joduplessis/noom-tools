import './helpers/extensions'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'
import { NODE_ENV, SENTRY_DSN } from './constants'
import { App } from './app'
import './styles.sass'

// Set up Sentry
Sentry.init({ dsn: SENTRY_DSN })

// And now mount our app
ReactDOM.render(React.createElement(App, null), document.getElementById('root'))
