import * as React from 'react'

type Props = {
    level:number,
    shiftLength: number
}

export default (p:Props)=>(
    <div className="tree-level-spaces">
        {
            Array.apply(null, Array(p.level)).map((e, i)=>(
                <div key={`level-space-${i}`} style={{
                    width:p.shiftLength || 25
                }} className={`tree-level-space level-${i}`}></div>
            ))
        }
	</div>
)