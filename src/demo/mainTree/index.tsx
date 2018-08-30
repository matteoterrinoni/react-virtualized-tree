import React from 'react'

import * as V from 'src/react-virtualized-tree';

import {
	FakeItem,
	initFakeItems,
	textComparison
} from 'src/demo/model'

import './style.scss'
	
export type Props = {
	
}

export type State = {
	selected: FakeItem[],
	fakeItems: FakeItem[]
}

class MainTree extends React.Component<Props, State>{

	constructor(p){
		super(p)
		const items = initFakeItems(10)
		this.state = {
			selected: [],
			fakeItems: items
		}

		this.setSelected = this.setSelected.bind(this)
	}

	setSelected(selected){
		this.setState({
			selected
		})
	}

	render(){
		const p = this.props
		const s = this.state

		return (

			<div className="demo">
				<V.FilteredVTtree
					stringifier={(i:V.VTreeItem<FakeItem>)=>`${i.name}${i.code}`.toLowerCase()}
					rowRenderer={(i:V.VTreeRenderItemProps<FakeItem>)=>(<span>{i.item.name} <small>{i.item.code}</small></span>)}
					tree={s.fakeItems as V.VTreeItem<FakeItem>[]}
					/>
			</div>
		)
	}
}

export default MainTree