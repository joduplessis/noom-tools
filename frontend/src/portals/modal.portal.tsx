import React, { Component } from 'react'
import ReactDOM from 'react-dom'

interface IModalPortal {
    children: any
}

export class ModalPortal extends Component<IModalPortal> {
    modalRoot: HTMLElement
    el: HTMLElement

    constructor(props: IModalPortal) {
        super(props)

        this.modalRoot = document.getElementById('modal-root')
        this.el = document.createElement('div')
    }

    componentDidMount() {
        this.modalRoot.appendChild(this.el)
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.el)
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el)
    }
}
