import { FunctionComponent } from 'react'

export interface IRoute {
    path: string
    icon: string
    label: string
    component: FunctionComponent
}
