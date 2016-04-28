'use strict'

import React,{Component} from "react";
import classNames from "classnames";

class ActivityIndicator extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {
            active,opacity
        } = this.props
        const classes = classNames("activity-indicator",{active})
        return (
            <div className={classes}>
            <div className="mask-layer">
                <div className="spinner"><img src="/client/asset/images/load2.gif"/><p>{this.props.content}</p></div>
            </div>
            </div>
        )
    }
}

ActivityIndicator.defaultProps = {
    active:false,
    opacity:0.5,
    content:""
}

export default ActivityIndicator