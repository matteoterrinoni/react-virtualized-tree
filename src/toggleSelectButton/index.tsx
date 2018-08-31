import * as React from 'react'

import SelectAll from 'src/checkModes/selectAll'
import SelectNone from 'src/checkModes/selectNone'

import Button from 'src/button'

type Props = {
	onClick
	toggle:boolean
	withText?:boolean
	textSelected?:string
	textDeselected?:string
}

export default (p:Props) => {
	const {
		toggle,
		withText,
		textSelected,
		textDeselected,
		...buttonProps
	} = p

	return (
		<Button {...buttonProps}>
			{
				withText &&
				<span className="text">
					{toggle ? (textSelected || 'Deselect all') : (textDeselected || 'Select all') }
				</span>
			}
			{!toggle && <SelectAll/>}
			{toggle && <SelectNone/>}
		</Button>
	)	
}

