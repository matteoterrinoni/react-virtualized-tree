import * as React from 'react'

import M, {
    ContextMenuProps
} from './model'


type Props = ContextMenuProps

import './style.scss'

import ClickOutside from 'src/clickOutside'

import Item from './item'

const ContextMenu = (p:Props) => {
    return (
        <ClickOutside onClickOutside={p.onClose}>
            <ul className="context-menu">
            {
                Object.keys(M.checkModes)
                .map(k=>M.checkModes[k])
                .map((cm, i)=><Item
                    key={`contenxt-menu-item-${i}`}
                    item={cm} {...p}/>
                )
            }
            </ul>
        </ClickOutside>
    )
}

export default ContextMenu