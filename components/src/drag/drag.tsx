
import React, { useRef } from 'react'

export const Draggable = (props: any) => {
    const counterRef = useRef(0)

    const handleDragStart = (e) => {
        const { clientY, clientX } = e
        const draggedEl = e.target
        const boundingBox = draggedEl.getBoundingClientRect()
        const { x, y, top, right, bottom, left, width, height } = boundingBox
        const draggedElCopy = draggedEl.cloneNode(true)
        const div = document.createElement('div')
        const xOffset = clientY - left
        const yOffset = clientY - top
        const draggedObject = { el: draggedEl, height, id: props.id }

        // Save it on the window
        window['DRAGGED'] = draggedObject

        // Hide it for now
        draggedEl.style.opacity = 0.4

        // Set the container dimensions
        div.style.width = width + 'px'
        div.style.height = height + 'px'
        div.setAttribute('data-drag-id', props.id)

        // Create the element& append the cloned tag
        div.appendChild(draggedElCopy)

        // Append our new DIV to the doc, so we can use it
        document.body.appendChild(div)

        // Set the drag element
        e.dataTransfer.setDragImage(div, xOffset, yOffset)

        // Send this to bottom on the event loop
        // So that the draggable element is already set
        // But so we can hide the one added to the page
        setTimeout(() => (div.style.visibility = 'hidden'), 0)
    }

    const handleDrop = (e) => {
        counterRef.current = 0

        props.onOut()
        props.onDrop(window['DRAGGED'].id)
    }

    const handleDragEnd = (e) => {
        const draggedEl = e.target
        draggedEl.style.opacity = 1
        props.onOut()
        counterRef.current = 0
    }

    const handleDrag = (e) => {
        if (e.clientY < 100) window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDragOver = (e) => {
        e.preventDefault()

        // Get the curently over target (native DOM el)
        const draggedEl = e.currentTarget

        // Get the number ID
        const id = Number(draggedEl.getAttribute('data-drag-id'))

        // Ignore our own dragOver
        if (window['DRAGGED']?.id == id) return

        const { clientY } = e
        const { top, height } = draggedEl.getBoundingClientRect()
        const above = clientY > top && clientY < top + height / 2
        const below = clientY > top + height / 2 && clientY < top + height

        props.onOver({ above, below })
    }

    const handleDragEnter = (e) => {
        e.preventDefault()

        counterRef.current = counterRef.current + 1
    }

    const handleDragLeave = (e) => {
        counterRef.current = counterRef.current - 1

        if (counterRef.current === 0) props.onOut()
    }

    // If it's disabled, then simply return the
    // children (disabled the drag and drop)
    if (props.disabled) return props.children

    return (
        <div
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            draggable
            data-drag-id={props.id}
        >
            <div>{props.children}</div>
        </div>
    )
}

export const Droppable = (props: any) => {
    const ref = useRef(null)

    const handleDrop = (e) => {
        e.stopPropagation()
        e.preventDefault()

        const el = window['DRAGGED']?.el
        const files = Array.from(e.nativeEvent.dataTransfer.files)

        props.onDrop({ el, files })

        setTimeout(() => (window['DRAGGED'] = null), 1000)
    }

    return (
        <div
            onDragEnter={(e) => props.onDragEnter()}
            onDragLeave={(e) => props.onDragLeave()}
            onDragEnd={(e) => props.onDragLeave()}
            onDragOver={(e) => {
                e.stopPropagation()
                e.preventDefault()
            }}
            onDrop={handleDrop}
            ref={ref}
        >
            {props.children}
        </div>
    )
}
