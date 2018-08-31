import React from "react"

import "./style.scss"

type Props = {
    onClick?
    className?
}

export default (p:Props) => {
    const {className, ...props} = p

	return (
		<button className={`custom-button ${p.className||''}`} {...props}>			
		</button>
	)
}