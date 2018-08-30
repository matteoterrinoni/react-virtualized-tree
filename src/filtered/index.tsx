import * as React from 'react'


import {merge, deepCopy} from 'src/helpers'

import VTree, {
	Props as VProps
} from "src"

import ToggleButton from 'src/togglebutton'

import SearchField from 'src/searchfield'

import Sticky from 'src/stickyWrapper'

import './style.scss'

import CP, {
	Item,
	Given,
	RowsMap,
	Counter,
	Stringifier
} from 'src/model';

type Props<T> = VProps<T> & {
	children?:any,
	stringifier: Stringifier<T>,
	stickyOffset?
}

type State<T> = {
	filter,
	toggle,
	filteredTree,
	counter: Counter
}

export default class FilteredVirtualizedTree<T> extends React.Component<Props<T>, State<T>>{
	constructor(p:Props<T>){
		super(p)

		//to avoid deepCopy and passing the data by value to state
		const tree = p.tree.slice()
		let counter= {items:0}
		let filter = ''
		this.filterTheTree(tree, filter, counter)

		this.state = {
			filter,
			toggle: false,
			filteredTree:tree,
			counter
		}

		this.setFilteredTree = this.setFilteredTree.bind(this)
		this.filterTheTree = this.filterTheTree.bind(this)
		this.setFilter = this.setFilter.bind(this)
		this.setToggle = this.setToggle.bind(this)
	}

	componentWillReceiveProps(n:Props<T>){
		if((n.id != this.props.id) || (n.tree.length != this.props.tree.length)){
			this.load(n)
		}
	}

	setFilteredTree(tree){
		this.setState(merge(this.state, {
			filteredTree: tree
		}))
	}

	load(p:Props<T>){
		const tree = p.tree.slice()
		let counter= {items:0}
		let filter = ''
		this.filterTheTree(tree, filter, counter)
		this.setFilteredTree(tree)
		this.setState({
			filter,
			toggle: false,
			filteredTree:tree,
			counter
		})
	}

	filterTheTree(tree, filter, counter:Counter){
		Given.items(tree).filter((filter!=undefined ? filter : this.state.filter), this.props.stringifier, counter)
	}

	setFilter(_filter:string){
		let filter = _filter.toLowerCase()
		const {tree} = this.props
		let counter = {items:0}
		this.filterTheTree(tree, filter, counter)
		this.setState({
			filter,
			filteredTree: tree,
			counter
		})
	}

	setToggle(t){
		this.setState(merge(this.state, {
			toggle: t
		}))
	}

	render(){
		const {filter, toggle, filteredTree, counter} = this.state;
		const {tree, ...p} = this.props
		const {stringifier, children, ...vTreeProps} = this.props

		return (
			<div className={`filtered-virtualized-tree ${!vTreeProps.height?'window-scroll':''}`}>
				<Sticky
					offset={p.stickyOffset}
					scrollElement={p.scrollElement}>

					<div className="head">
						<div className="filter-box">
							<SearchField
							value={filter}
							onChange={this.setFilter}/>
							{
								<span className="badge counter">{counter && counter.items || 0}</span>
							}
						</div>
						{
							children &&
							<div className="other-filters">
								{children}
							</div>
						}
						<div className="toggle-all-button">
							<ToggleButton
								onClick={()=>this.setToggle(!toggle)}
								toggle={toggle}
								withText={true}
								textExpanded="Collapse All"
								textCollapsed="Expand All"/>
						</div>
					</div>
					
				</Sticky>
				<VTree {...vTreeProps} toggleExpandAll={toggle} onToggleExpandAllEnd={()=>this.setToggle(undefined)} tree={filteredTree} />
			</div>
		)
	}
}