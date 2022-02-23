import React, { useState } from 'react'
import '../../dist/index.css'
import { If } from '../if/if'

export default {
    title: 'Components/If',
    component: If,
}

export const Default = () => {
    const thisIsTrue = true

    return <If if={thisIsTrue}>Shows this</If>
}
