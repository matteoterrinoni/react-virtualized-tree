import * as React from 'react'

import {
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
                p.items.map((item, i)=><Item
                    key={`contenxt-menu-item-${i}`}
                    onClose={p.onClose}
                    item={item} />
                )
            }
            </ul>
        </ClickOutside>
    )
}

export default ContextMenu