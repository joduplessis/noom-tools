import React, { useEffect, useRef, useState } from 'react'
import { classNames } from '../helpers/util'

interface IFlexerProps {
    style?: any
    children?: any
}

export const Flexer = (props: IFlexerProps) => <div style={{ flex: 1 }} />

interface IScrollViewProps {
    controlled?: boolean
    stickToTop?: boolean
    stickToBottom?: boolean
    onScrollToBottom?: any
    onScrollToTop?: any
    class?: string
    style?: any
    children?: any
}

export const ScrollView = (props: IScrollViewProps) => {
    const scrollRef = useRef(null)
    const [manually, setManually] = useState(false)
    const [mounted, setMounted] = useState(false)
    let marginTop = 0

    const scrollToTop = () => {
        // If the user is scrolling
        if (manually) return

        // If there is no scroll ref
        if (!scrollRef.current) return

        // Move it right up
        scrollRef.current.scrollTop = 0
    }

    const scrollToBottom = () => {
        // If the user is scrolling
        if (manually) return

        // If there is no scroll ref
        if (!scrollRef.current) return

        // Move it right down
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }

    const handleScrollEvent = (e: any) => {
        const offsetHeight = scrollRef.current.scrollHeight - scrollRef.current.scrollTop
        const isBottom = scrollRef.current.offsetHeight >= offsetHeight
        const isTop = scrollRef.current.scrollTop == 0

        // If the user scrolls to the bottom or top
        if (isBottom && props.onScrollToBottom) props.onScrollToBottom()
        if (isTop && props.onScrollToTop) props.onScrollToTop()

        // If it's the bottom/top & it's sticky then set this
        if (isBottom && props.stickToBottom) setManually(false)
        if (isTop && props.stickToTop) setManually(false)

        // Otherwise let the user scroll
        if (!isBottom && !isTop) setManually(true)
    }

    useEffect(() => {
        if (props.controlled) {
            if (props.stickToBottom) scrollToBottom()
            if (props.stickToTop) scrollToTop()
        }
    }, [props.children])

    useEffect(() => {
        if (props.controlled) {
            if (props.stickToBottom) scrollToBottom()
            if (props.stickToTop) scrollToTop()
        }

        setMounted(true)
    }, [])

    useEffect(() => {
        if (props.controlled) {
            if (scrollRef.current) scrollRef.current.addEventListener('scroll', handleScrollEvent)

            return () => {
                if (scrollRef.current) scrollRef.current.removeEventListener('scroll', handleScrollEvent)
            }
        } else {
            return () => {}
        }
    })

    if (scrollRef.current) {
        const { lastChild } = scrollRef.current

        if (lastChild) {
            const { height } = lastChild.getBoundingClientRect()
            const scrollHeightOfContent = lastChild.offsetTop + height
            const { scrollHeight } = scrollRef.current

            if (!manually && props.stickToBottom && scrollHeightOfContent < scrollHeight) {
                marginTop = scrollHeight - scrollHeightOfContent
            }
        }
    }

    return (
        <View
            style={props.style}
            class={
                props.class
                    ? props.class + ' w-100 h-100 flex-1 p-relative o-hidden'
                    : 'flex-1 w-100 h-100 p-relative o-hidden'
            }
        >
            <div
                ref={scrollRef}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    overflow: 'scroll',
                    marginTop,
                }}
            >
                {props.children}
            </div>
        </View>
    )
}

interface IViewProps {
    width?: string | number
    height?: string | number
    row?: boolean
    column?: boolean
    displayFlex?: boolean
    align?: string
    basis?: string
    direction?: string
    grow?: string
    justify?: string
    shrink?: string
    wrap?: string
    flex?: number | string
    display?: string
    class?: string
    onClick?: any
    onMouseOver?: any
    onMouseEnter?: any
    onMouseLeave?: any
    onMouseOut?: any
    style?: any
    children?: any
}

export const View = (props: IViewProps) => {
    let styles = props.style || {}

    if (props.width) styles.width = props.width
    if (props.height) styles.height = props.height
    if (props.align) styles.alignItems = props.align
    if (props.basis) styles.flexBasis = props.basis
    if (props.direction) styles.flexDirection = props.direction
    if (props.grow) styles.flexGrow = props.grow
    if (props.justify) styles.justifyContent = props.justify
    if (props.shrink) styles.flexShrink = props.shrink
    if (props.wrap) styles.flexWrap = props.wrap
    if (props.flex) styles.flex = props.flex
    if (props.display) styles.display = props.display

    const classes = classNames(
        {
            view: true,
            row: props.row,
            flex: props.displayFlex,
            column: props.column,
        },
        props.class
    )

    return (
        <div
            className={classes}
            style={styles}
            onMouseOver={props.onMouseOver}
            onMouseOut={props.onMouseOut}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    )
}
