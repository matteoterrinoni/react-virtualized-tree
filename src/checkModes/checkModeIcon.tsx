import * as React from 'react'

import './style.scss'

import {
    CheckModeIconType
} from './model'

type Props = {
    children,
    type?:CheckModeIconType
}

export const CheckModeIcon = (p:Props)=>(
    <div className={`checkmode-icon ${p.type?CheckModeIconType[p.type]:''}`}>
        
        {p.type == CheckModeIconType.add && <small>+</small>}
        {p.type == CheckModeIconType.remove && <small>-</small>}
        {p.type == CheckModeIconType.force && <small>!</small>}

        {p.children}
    </div>
)

export default CheckModeIcon