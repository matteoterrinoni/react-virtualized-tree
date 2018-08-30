import React from 'react'

export type Props = {
	type?:string,
	method?:'svg'|'font'
	name:any
}

import C from './model'

const Icon = (p:Props) => {
	return <i className={`${C.classNames[p.method || 'font']} ${p.type || ''}`}>
	{
		p.method == 'svg' ?
		<span dangerouslySetInnerHTML={{__html:p.name}}></span> :
		p.name
	}
	</i>
}

export default Icon