import React, { ReactChild } from 'react'
import { classNames } from '../helpers/util'

interface IImage {
    src?: string
    width: string | number
    height: string | number
    circle?: boolean
    contain?: boolean
    cover?: boolean
    onClick?: any
    class?: string
    style?: any
    children?: ReactChild | ReactChild[]
}

export const Image = (props: IImage) => {
    const classes = classNames(
        {
            image: true,
            circle: props.circle,
            contain: props.contain,
            cover: props.cover,
        },
        props.class
    )
    return (
        <img
            style={props.style}
            width={props.width}
            height={props.height}
            src={props.src}
            onClick={props.onClick}
            className={classes}
        />
    )
}
