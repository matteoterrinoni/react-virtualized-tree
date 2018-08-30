import * as React from 'react'

type Props = {
    canExpand:boolean,
    onToggleExpand,
    expanded:boolean
}

export default (p:Props)=>(
    <div className="side-button">
    {
        p.canExpand &&
        <button onClick={p.onToggleExpand}>
            <i className="material-icons">{p.expanded ? 'expand_less' : 'expand_more'}</i>
        </button>
    }
    </div>
)