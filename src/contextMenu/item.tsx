import * as React from 'react'

import {
    ContextMenuProps,
    ContextMenuItem
} from './model'

type Props = {
    item: ContextMenuItem,
    onClose
}

const Item = (p:Props) => {
    return (
        <li className="context-menu-item" onClick={(e)=>p.onClose().then(p.item.onClick)}>
            <div className="context-menu-item-icon">{p.item.icon}</div>
            <div className="context-menu-item-title">{p.item.title}</div>
            <div className="context-menu-item-shortcut">{p.item.shortcut}</div>
        </li>            
    )
}

export default Item