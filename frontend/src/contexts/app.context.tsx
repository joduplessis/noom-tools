import React, { createContext, useState } from 'react'
import { IAppContext } from '../types/IAppContext'

const defaultAppContext: IAppContext = {
    setApp: (appState: IAppContext) => {},
}

export const AppContext = createContext(defaultAppContext)

export const AppProvider = (props) => {
    const setApp = (appState: IAppContext) => {
        setState({ ...state, ...appState })
    }
    const initialState: IAppContext = {
        ...defaultAppContext,
        setApp,
    }
    const [state, setState] = useState(initialState)

    return <AppContext.Provider value={state}>{props.children}</AppContext.Provider>
}
