import * as React from 'react'


import {merge, deepCopy} from 'src/helpers'

import VTree, {
	Props as VProps
} from "src"

import ToggleExpandButton from 'src/toggleExpandButton'

import ToggleSelectButton from 'src/toggleSelectButton'

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
	toggleExpand,
	toggleSelect,
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
			toggleExpand: false,
			toggleSelect: false,
			filteredTree:tree,
			counter
		}

		this.setFilteredTree = this.setFilteredTree.bind(this)
		this.filterTheTree = this.filterTheTree.bind(this)
		this.setFilter = this.setFilter.bind(this)
		this.setToggleExpand = this.setToggleExpand.bind(this)
		this.setToggleSelect = this.setToggleSelect.bind(this)
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
			toggleExpand: false,
			toggleSelect: false,
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

	setToggleExpand(t){
		this.setState(merge(this.state, {
			toggleExpand: t
		}))
	}

	setToggleSelect(t){
		this.setState(merge(this.state, {
			toggleSelect: t
		}))
	}

	render(){
		const {filter, toggleExpand, toggleSelect, filteredTree, counter} = this.state;
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
							<ToggleExpandButton
								onClick={()=>this.setToggleExpand(!toggleExpand)}
								toggle={toggleExpand}
								withText={true}
								textExpanded="Collapse All"
								textCollapsed="Expand All"/>
							
							<ToggleSelectButton
								onClick={()=>this.setToggleSelect(!toggleSelect)}
								toggle={toggleSelect}
								withText={true}
								textSelected="Deselect All"
								textDeselected="Select All"/>
						</div>
					</div>
					
				</Sticky>
				<VTree {...vTreeProps}
				toggleExpandAll={toggleExpand}
				toggleSelectAll={toggleSelect}
				tree={filteredTree} />
			</div>
		)
	}
}