import React from "react"

import "./style.scss"

import C, {
    Status,
} from './model'

import Icon from 'src/icon'

type Props = {
    status: Status,
    className: string
}

export default (p:Props) => {

	const {status, className} = p;

	return (
		<div className={`status-check ${Status[status]} ${className}`}>
			
				<Icon method="svg" name={C.svgIcons.done} />
			
		</div>
	)
}