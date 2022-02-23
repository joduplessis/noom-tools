import React from 'react'

interface IIf {
    if: boolean
    style?: any
    children?: any
}

export const If = (props: IIf) => {
    if (!!props.if) {
        return props.children
    } else {
        return null
    }
}
