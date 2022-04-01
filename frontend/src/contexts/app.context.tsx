import React, { createContext, useReducer } from 'react'

export const defaultAppState: any = { theme: null }

export enum AppActions {
    Theme = 'Theme',
}

const appReducer: any = (state, action) => {
    switch (action.type) {
        case AppActions.Theme:
            return { ...state, theme: action.payload }
        default:
            return state
    }
}

export const AppContext = createContext(defaultAppState)

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(appReducer, { ...defaultAppState, ...props.value })

    return <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>
}
