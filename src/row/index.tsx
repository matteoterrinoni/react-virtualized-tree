import * as React from 'react'

import CP, {
	Item,
	Given,
	RowItem
} from 'src/model'

import Checkbox from 'src/checkbox'

import {
	Status
} from 'src/checkbox/model'

import TreeLevelSpaces from './treeLevelSpaces'

import ToggleButton from './toggleButton'

import ItemRenderer from './item'

import ContextMenu from 'src/contextMenu'

type Props<T> = {
	item: RowItem<T>
	expanded: boolean
	onToggleExpand?,
	selected: boolean
	status?: Status
	onToggleSelect?,
	onRender?,
	height?,
	shiftLength?
	last?
	hideToggleButton?
}

type State = {
    contextMenu:boolean
}

export type RenderItemProps<T> = {
	item: Item<T>,
	canToggle:boolean,
	expanded:boolean,
	onToggle:Function
}

class Row<T> extends React.Component<Props<T>, State> {
    state = {
        contextMenu: false
    }

    constructor(p){
        super(p)

        this.toggleContextMenu = this.toggleContextMenu.bind(this)
    }

    toggleContextMenu = (toggle?)=>{
        return new Promise((resolve)=>{
            this.setState({
                contextMenu: toggle!=undefined?toggle:!this.state.contextMenu
            }, ()=>resolve())
        })
    }

    render(){
        const p = this.props
        const s = this.state
        const gi = Given.item(p.item.item);
        const canToggle = !gi.leaf() && gi.hasVisibleChildren()

        const renderObj = {
            item:p.item.item,
            canToggle,
            expanded:p.expanded,
            onToggle:canToggle ? p.onToggleExpand : ()=>null
        }

        return p.item ? (
            <div
            onBlur={e=>this.toggleContextMenu(false)}
            onContextMenu={e=>{e.preventDefault(); this.toggleContextMenu(true)}}
            className={`list-item ${p.last?'last':''} level-${p.item.level}`}
            style={{
                height:p.height || CP.list.row_height
            }}>
            
                <TreeLevelSpaces
                level={p.item.level || 0}
                shiftLength={p.shiftLength || 25}/>

                {
                    !p.hideToggleButton &&
                    <ToggleButton
                    canExpand={canToggle}
                    onToggleExpand={p.onToggleExpand}
                    expanded={p.expanded}/>
                }
                
                <div className="selected-button">
                    <Checkbox checked={p.selected} status={p.status} onChange={p.onToggleSelect}/>
                </div>

                <ItemRenderer
                onRender={p.onRender}
                renderObj={renderObj}
                id={p.item.item.id}/>

                {
                    s.contextMenu && canToggle &&
                    <ContextMenu
                        onClose={()=>this.toggleContextMenu(false)}
                        onPick={(e, state)=>p.onToggleSelect(e, state)}/>
                }
                
            </div>
        ) : null
    }
}

export default Row