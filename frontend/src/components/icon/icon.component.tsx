import React, { FunctionComponent, ReactElement } from 'react'
import PropTypes from 'prop-types'
import {
    BiLike,
    BiChevronRight,
    BiChevronUp,
    BiChevronDown,
    BiChevronLeft,
    BiPlus,
    BiCalendar,
    BiTrendingUp,
    BiTag,
    BiCoin,
    BiX,
    BiCopy,
    BiArrowToBottom,
    BiArrowToTop,
    BiArrowToLeft,
    BiArrowToRight,
    BiCheck,
    BiRightArrowAlt,
    BiUpArrowAlt,
    BiLeftArrowAlt,
    BiPencil,
    BiDownArrowAlt,
    BiBarChartAlt2,
    BiTv,
} from 'react-icons/bi'
import { FiDatabase, FiLayers } from 'react-icons/fi'
import {
    AiOutlineCodeSandbox,
    AiOutlineSetting,
    AiOutlineInfoCircle,
    AiOutlineCalendar,
    AiOutlineLogout,
    AiOutlineTeam,
    AiOutlineFlag,
    AiOutlineMore,
    AiOutlineRise,
    AiOutlineFall,
    AiOutlineEdit,
    AiOutlineDelete,
    AiOutlineReload,
    AiOutlineDashboard,
} from 'react-icons/ai'
import { RiBubbleChartLine, RiDashboard3Line, RiHeartPulseLine } from 'react-icons/ri'
import './icon.component.sass'
import { IoSettingsOutline } from 'react-icons/io5'
import { VscSettings } from 'react-icons/vsc'

interface IIconComponent {
    size: number
    color: string
    icon: string
}

export const IconComponent: FunctionComponent<IIconComponent> = (props: IIconComponent): ReactElement => {
    const { size, color, icon } = props
    const getIcon = () => {
        switch (icon) {
            case 'reload':
                return <AiOutlineReload size={size} width={size} height={size} color={color} />
            case 'delete':
                return <AiOutlineDelete size={size} width={size} height={size} color={color} />
            case 'pen':
                return <BiPencil size={size} width={size} height={size} color={color} />
            case 'chart-rise':
                return <AiOutlineRise size={size} width={size} height={size} color={color} />
            case 'chart-fall':
                return <AiOutlineFall size={size} width={size} height={size} color={color} />
            case 'check':
                return <BiCheck size={size} width={size} height={size} color={color} />
            case 'copy':
                return <BiCopy size={size} width={size} height={size} color={color} />
            case 'health':
                return <RiHeartPulseLine size={size} width={size} height={size} color={color} />
            case 'more':
                return <AiOutlineMore size={size} width={size} height={size} color={color} />
            case 'flag':
                return <AiOutlineFlag size={size} width={size} height={size} color={color} />
            case 'logout':
                return <AiOutlineLogout size={size} width={size} height={size} color={color} />
            case 'team':
                return <AiOutlineTeam size={size} width={size} height={size} color={color} />
            case 'calendar':
                return <BiCalendar size={size} width={size} height={size} color={color} />
            case 'chevron-down':
                return <BiChevronDown size={size} width={size} height={size} color={color} />
            case 'chevron-up':
                return <BiChevronUp size={size} width={size} height={size} color={color} />
            case 'chevron-right':
                return <BiChevronRight size={size} width={size} height={size} color={color} />
            case 'chevron-left':
                return <BiChevronLeft size={size} width={size} height={size} color={color} />
            case 'like':
                return <BiLike size={size} width={size} height={size} color={color} />
            case 'plus':
                return <BiPlus size={size} width={size} height={size} color={color} />
            case 'dashboard':
                return <AiOutlineCodeSandbox size={size} width={size} height={size} color={color} />
            case 'settings':
                return <AiOutlineSetting size={size} width={size} height={size} color={color} />
            case 'info':
                return <AiOutlineInfoCircle size={size} width={size} height={size} color={color} />
            case 'arrow-left':
                return <BiLeftArrowAlt size={size} width={size} height={size} color={color} />
            case 'arrow-right':
                return <BiRightArrowAlt size={size} width={size} height={size} color={color} />
            case 'arrow-down':
                return <BiDownArrowAlt size={size} width={size} height={size} color={color} />
            case 'arrow-up':
                return <BiUpArrowAlt size={size} width={size} height={size} color={color} />
            case 'arrows-up':
                return <BiTrendingUp size={size} width={size} height={size} color={color} />
            case 'tag':
                return <BiTag size={size} width={size} height={size} color={color} />
            case 'money':
                return <BiCoin size={size} width={size} height={size} color={color} />
            case 'x':
                return <BiX size={size} width={size} height={size} color={color} />
            case 'settings':
                return <IoSettingsOutline size={size} width={size} height={size} color={color} />
            default:
                return null
        }
    }

    return getIcon()
}
