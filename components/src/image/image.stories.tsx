import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Image } from '../'
import '../../dist/index.css'

export default {
    title: 'Design System/Image',
    component: Image,
}

export const Default = () => {
    return (
        <Image circle cover src="https://randomuser.me/api/portraits/men/62.jpg" width={250} height={250} />
    )
}
