'use strict';

import React,{Component} from "react";
import classNames from "classnames";

class Loading extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const classes = classNames("loading",{
            active:this.props.active
        })
        return (
            <div className={classes}></div>
        )
    }
}

export default Loading;