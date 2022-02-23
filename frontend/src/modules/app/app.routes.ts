import React from 'react'
import { IRoute } from '../../types/IRoute'

export class AppRoutes {
    static generate(): IRoute[] {
        return [
            {
                path: `/app/home`,
                icon: '',
                label: '',
                component: () => React.createElement('div', {}, 'A component'),
            },
        ]
    }
}
