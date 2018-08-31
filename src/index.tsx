import * as React from 'react'

import {
	merge, deepCopy
} from 'src/helpers'

import {
	ReactVirtualized,
	AutoSizer,
	List,
	WindowScroller
} from "react-virtualized"

import CP, {
	Item,
	Given,
	RowsMap,
	RowItem,
	clickToCheckModes,
	CheckModes
} from './model';

import RowElement from 'src/row'

import './style.scss'
import { EventEmitter } from 'events';

export type Props<T> = {
	tree:Item<T>[]
	rowRenderer?
	height?:number
	rowHeight?:number
	shiftLength?:number
	toggleExpandAll?:boolean
	onToggleExpandAllEnd?:Function,
	hideToggleButton?:boolean,
	id?:string,
	scrollElement?
}

type State<T> = {
	loading:boolean,
	rows:RowItem<T>[],
	expanded: RowsMap<T>,
	selected: RowsMap<T>
}

export class VTree<T> extends React.Component<Props<T>, State<T>>{
	_list
	constructor(p:Props<T>){
		super(p)

		this.state = {
			loading: true,
			rows: [],
			expanded: {},
			selected: {}
		}

		this.rowRenderer = this.rowRenderer.bind(this);
		this.load = this.load.bind(this);
		this.toggleExpand = this.toggleExpand.bind(this);
		this.toggleSelect = this.toggleSelect.bind(this);

		this._list = React.createRef();
	}

	updateList(){
		this._list && this._list.current && this._list.current.recomputeRowHeights() && this._list.current.forceUpdate();
	}

	componentWillMount(){
		this.load()
	}

	componentWillReceiveProps(n:Props<T>){
		this.load(n, this.shouldToggleExpandAll(this.props, n))
	}

	shouldToggleExpandAll(o:Props<T>, n:Props<T>){
		return (n.toggleExpandAll != undefined && o.toggleExpandAll !== n.toggleExpandAll) ? n.toggleExpandAll : undefined
	}

	load(_p?:Props<T>, toggleExpandAll?){
        const p = _p || this.props;

        const asyncAction = () => {
        	const s = this.state;
        	const p = this.props;
        	
        	let expanded = s.expanded
        	if(toggleExpandAll!=undefined){
        		if(toggleExpandAll){
        			Given.items(p.tree).expandAll(expanded)
        		}else{
        			Given.items(p.tree).collapseAll(expanded)
        		}
        	}
        	
        	if(p.tree.length == 1){
        		expanded[p.tree[0].id] = p.tree[0]
        	}

            const promise = new Promise(function(this, resolve, reject){
            	let map = {}
                const state = {
            		rows: Given.items(p.tree).getRows(s.expanded),
            		loading: false,
            		expanded
            	}                
                resolve(state);
            })

            return promise;
        }

        return asyncAction().then(result => {
            this.setState(result, ()=>this.updateList())
        })
    }

    toggleExpand(item:RowItem<T>, index:number){
    	const expanded = deepCopy(this.state.expanded)
    	const rows = deepCopy(this.state.rows)
    	if(expanded[item.item.id]){
    		delete expanded[item.item.id]
    		Given.rows(rows).collapseItem(item, index, expanded)
    	}else{
    		expanded[item.item.id] = item.item
    		Given.rows(rows).expandItem(item, index, expanded)
    	}
    	this.setState({
    		expanded,
    		rows
    	}, ()=>this.updateList())
	}
	
	toggleSelect(item:RowItem<T>, e, state?:CheckModes){
		const selected = deepCopy(this.state.selected)
		const _state = state==undefined?clickToCheckModes(e):state
		
		Given.item(item.item)
		.toggleSelect(selected, _state)
		
		this.setState({
    		selected,
    	}, ()=>this.updateList())
    }

	rowRenderer (a){
		const {rowRenderer, rowHeight, shiftLength, hideToggleButton, tree} = this.props
		const {expanded, selected, rows} = this.state
		const item = rows[a.index];
		const next = rows[a.index+1];
		const g = Given.item(item.item)
		return (
			<div style={a.style} key={a.key}>
				<RowElement
				shiftLength={shiftLength}
				height={rowHeight}
				onRender={rowRenderer}
				expanded={g.isExpanded(expanded)}
				onToggleExpand={()=>this.toggleExpand(item, a.index)}
				selected={g.isSelected(selected)}
				status={g.status(selected)}
				onToggleSelect={(e, state)=>this.toggleSelect(item, e, state)}
				last={!next || next.level!=item.level}
				hideToggleButton={hideToggleButton}
				item={item}/>
			</div>
		)
	}

	_windowScroller
	_container
	_setRef = windowScroller => {
		this._windowScroller = windowScroller;
	};

	render(){
		const {loading, rows} = this.state;
		const p = this.props

		const rowHeight = p.rowHeight || CP.list.row_height

		const scrollElement = ()=>p.scrollElement ? p.scrollElement : (p.height ? this._container : window)

		return loading ? <span>loading...</span> :
		(
			<div
				style={{height:p.height||'auto'}}
				className="virtualized-tree-container"
				ref={(e)=>this._container = e}>
				<WindowScroller
				ref={this._setRef}
				scrollElement={scrollElement()}>
				{({height, isScrolling, registerChild, onChildScroll, scrollTop}) => (
					<div className="virtualized-tree-wrapper">
					<div className="virtualized-tree">
					<List
					autoHeight
					isScrolling={isScrolling}
					onScroll={onChildScroll}
					scrollTop={scrollTop}
					ref={this._list}
					recomputeRowHeights={false}
					forceUpdate={false}
					height={height}
					overscanRowCount={1}
					rowHeight={rowHeight}
					rowRenderer={this.rowRenderer}
					rowCount={rows && rows.length || 0}
					width={CP.list.width}
					/>
					</div>
					</div>
					)}
				</WindowScroller>
        	</div>
        )
	}
}

export default VTree

export { 
	Item as VTreeItem,
	RowItem as VTreeRowItem,
	Given as GivenVTree
} from './model'

export { 
	default as FilteredVTree
} from './filtered'

export {
	RenderItemProps as VTreeRenderItemProps
} from './row'
