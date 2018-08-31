import * as React from 'react'
import { checkModesToContextmenuItems } from 'src/checkModes/model';
import ContextMenu from 'src/contextMenu';

type Props = {
    level:number,
    shiftLength: number,
    showContextMenu: boolean,
    onToggleSelect,
    onToggleContextMenu
}

export default (p:Props)=>{
    const left = `${(p.shiftLength*p.level)+25}px`
    const width= `calc(100% - ${left})`

    return (
    <div
        style={{
            left,
            width
        }}
        className="contextmenu-wrapper">
        {
            p.showContextMenu &&
            <ContextMenu
            items={checkModesToContextmenuItems(p.onToggleSelect)}
            onClose={()=>p.onToggleContextMenu(false)}/>
        }
	</div>
    )
}