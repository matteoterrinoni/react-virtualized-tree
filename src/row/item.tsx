import * as React from 'react'

type Props = {
    renderObj,
    onRender,
    id
}

export default (p:Props)=>(
    <span className="item">
        {
            p.onRender ?
            p.onRender(p.renderObj) : 
            <span className="text"><small>{p.id}</small></span>
        }
	</span>
)