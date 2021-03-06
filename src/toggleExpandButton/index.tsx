import * as React from 'react'

import Button from 'src/button'

type Props = {
	onClick
	toggle:boolean
	withText?:boolean
	textExpanded?:string
	textCollapsed?:string
}

export default (p:Props) => {
	const {
		toggle,
		withText,
		textExpanded,
		textCollapsed,
		...buttonProps
	} = p

	return (
		<Button {...buttonProps}>
			{
				withText &&
				<span className="text">
					{toggle ? (textExpanded || 'Collapse') : (textCollapsed || 'Expanded') }
				</span>
			} <i className="material-icons">{toggle ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</i>
		</Button>
	)	
}

