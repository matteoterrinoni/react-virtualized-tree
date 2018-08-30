import React from 'react'

import {
	FakeItem,
	initFakeItems,
	textComparison,
	demo
} from './model'

import 'MaterialIcons'
import 'Bootstrap'

import Tree from './mainTree'

export type Props = {

}

export type State = {
	openSidebar,
	navbar
}

class Demo extends React.Component<Props, State> {

	constructor(p){
		super(p)

		this.state = {
			openSidebar : false,
			navbar : true
		}
	}
	
	render(){
		const s = this.state

		return (

			<div className="demo">

				<Tree/>
					
			</div>
		)
	}
}

export default Demo

