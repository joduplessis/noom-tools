import React, { useState } from 'react'
import { If, View } from '../'
import '../../dist/index.css'
import { Draggable, Droppable } from './drag'

const list1 = [...new Array(5)]
const list2 = [...new Array(5)]

export default {
    title: 'Components/Drag',
    component: <div></div>,
}

const List = (props: any) => {
    const [over, setOver] = useState(false)
    const [above, setAbove] = useState(false)
    const [below, setBelow] = useState(false)
    const border = '2px solid white'
    const borderTop = over && above ? '2px solid red' : border
    const borderBottom = over && below ? '2px solid red' : border

    const handleDrop = (id) => {
        if (above) console.log(`${id} was dropped above ${props.id}`)
        if (below) console.log(`${id} was dropped below ${props.id}`)
    }

    return (
        <>
            <Draggable 
                id={props.id} 
                disabled={false} 
                onOver={({ above, below }) => {
                    setOver(true)
                    setAbove(above)
                    setBelow(below)
                }} 
                onOut={() => {
                    setOver(false)
                    setAbove(false)
                    setBelow(false)
                }} 
                onDrop={handleDrop}>
                <View class="bg-cl-gray-200 p-300" style={{ borderTop, borderBottom }}>
                    List item #{props.index} ({props.id})
                </View>
            </Draggable>
        </>
    )
}

export const Default = () => {
    return (
        <View class="p-900">
            <h1>Draggable blocks 1</h1>

            {list1.map((_, index) => (
                <List id={index * 6 + 7} index={index} key={index}>
                    <p>{index}</p>
                </List>
            ))}

            <br />

            <h1 className="mb-500">Draggable blocks 2</h1>

            {list2.map((_, index) => (
                <List id={index * 6 + 9} index={index} key={index}>
                    <p>{index}</p>
                </List>
            ))}

            <br />

            <h1 className="mb-500">Drop area</h1>

            <Droppable onDragLeave={() => console.log('dragged leave')} onDragEnter={() => console.log('dragged enter')} onDrop={({ el, files }) => console.log('dropped', files, el)}>
                <View class="bg-cl-gray-200 p-300">Drop here</View>
            </Droppable>
        </View>
    )
}
