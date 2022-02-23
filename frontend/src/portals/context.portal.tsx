import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

interface IContextPortal {
    children: any
}

export class ContextPortal extends Component<IContextPortal> {
    contextRoot: HTMLElement
    el: HTMLElement

    constructor(props: IContextPortal) {
        super(props)

        this.contextRoot = document.getElementById('context-root')
        this.el = document.createElement('div')
    }

    componentDidMount() {
        this.contextRoot.appendChild(this.el)
    }

    componentWillUnmount() {
        this.contextRoot.removeChild(this.el)
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el)
    }
}
