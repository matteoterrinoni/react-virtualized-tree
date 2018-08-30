import * as React from 'react'

type Props = {
    onClickOutside
}

class ClickOutside extends React.Component<Props> {
    
    componentWillMount(){
        document.addEventListener('mousedown', this.handleClick, false)
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClick, false)
    }

    handleClick = (e) => {
        if(this.node.contains(e.target)){
            return;
        }
        this.props.onClickOutside()
    }

    node
    render(){
        return (
        <div
        ref={node => this.node = node}
        className="click-outside-wrapper">
            {this.props.children}
        </div>
        )
    }
}

export default ClickOutside