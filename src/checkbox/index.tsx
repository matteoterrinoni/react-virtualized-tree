import React from "react"

import "./style.scss"

import C, {
	Props,
	getCheckboxClassName,
	Status	
} from './model'

import StatusIcon from './status'

export default (p:Props) => {

	const {onChange, checked, className, status} = p;

	return (
		<div className={`field form-group ${C.classNames.checkboxWrapper} ${className ? className : ''}`}>
			<div
				className={getCheckboxClassName(p)}
				onClick={onChange}>

				<StatusIcon className={C.classNames.self} status={checked?Status.checked:Status.unchecked} />
				{
					status!=undefined &&
					<StatusIcon className={C.classNames.children} status={status} />
				}
							
			</div>
		</div>
	)
}