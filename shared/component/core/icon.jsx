'use strict';

import React,{Component} from "react";
import classNames from "classnames";

class Icon extends Component{
    render(){
        const {icon} = this.props;
        const classes = classNames(this.props.className,{
            "iconfont":true,
            ["icon-"+icon]:true
        })
        return (
            <span className={classes}></span>
        )
    }
}

export default Icon;