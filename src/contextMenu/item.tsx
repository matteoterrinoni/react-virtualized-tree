import * as React from 'react'

import {
    ContextMenuProps,
    CheckModeItem
} from './model'

type Props = ContextMenuProps & {
    item: CheckModeItem
}

const Item = (p:Props) => {
    return (
        <li className="context-menu-item" onClick={(e)=>p.onClose().then(()=>p.onPick(e, p.item.checkmode))}>
            <div className="context-menu-item-title">{p.item.title}</div>
            <div className="context-menu-item-shortcut">{p.item.shortcut}</div>
        </li>            
    )
}

export default Item