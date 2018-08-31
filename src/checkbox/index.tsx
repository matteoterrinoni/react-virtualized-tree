import React from "react"

import "./style.scss"

import C, {
	Props,
	getCheckboxClassName,
	CheckboxStatus as Status,
} from './model'

import StatusIcon from './status'

export default (p:Props) => {

	const {onChange, checked, method, status} = p;

	return (
		<div className={`${C.classNames.checkboxWrapper}`}>
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