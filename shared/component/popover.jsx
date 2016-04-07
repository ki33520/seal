'use strict';

import React,{Component} from "react";
import classNames from "classnames";

class Popover extends Component{
    componentDidMount(){
        const {placement,active} = this.props;
        if(active === false){
            return;
        }
        const thisNode = React.findDOMNode(this)
        const hostNode = thisNode.parentNode;
        const hostNodeWidth = hostNode.offsetWidth;
        const hostNodeHeight = hostNode.offsetHeight;
        if(placement === "top"){
            this.hostNode.style.top = hostNodeHeight;
        }
    }
    render(){
        const classes = classNames("popover",{
            active:this.props.active
        })
        return (
            <div className={classes}>{this.props.children}</div>
        )
    }
}

Popover.defaultProps = {
    placement:"top",
    active:false
}

export default Popover;