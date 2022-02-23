import React, { useEffect, useState } from 'react'
import { ScrollView } from '../'
import '../../dist/index.css'
import { Flexer, View } from './view'

export default {
    title: 'Design System/View',
    component: View,
}

export const Default = () => (
    <>
        <View row class="bg-color-blue p-20">
            <p>One</p>
            <Flexer />
            <p>Two</p>
            <p>Three</p>
        </View>
        <View column>
            <p>One</p>
            <Flexer />
            <p>Two</p>
            <p>Three</p>
        </View>
    </>
)

export const WithScrollView = () => {
    const [kids, setKids] = useState([...new Array(10)])

    useEffect(() => {
        setInterval(() => {
            setKids([...kids, 101])
        }, 1000)
    }, [])

    return (
        <div>
            <View width={500} height={300}>
                <ScrollView
                    controlled
                    stickToTop={false}
                    stickToBottom={true}
                    onScrollToBottom={() => console.log('Reacted bottom')}
                    onScrollToTop={() => console.log('Reacted top')}
                    class="bg-cl-gray-100"
                >
                    <h1>two</h1>
                    {kids.map((kid: number, index: number) => {
                        return <p key={index}>{index}</p>
                    })}
                    <h1>one</h1>
                </ScrollView>
            </View>
        </div>
    )
}
