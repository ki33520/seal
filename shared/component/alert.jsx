'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import dom from "../../lib/dom.es6";

class Alert extends Component{
    render(){
        const classes = classNames("alert-layer",{
            "active":this.props.active
        })
        return (
            <div className={classes}>
            <div className="alert">
            {this.props.children}
            </div>
            </div>
        );
    }
}

Alert.defaultProps = {
    autoHide:true,
    delay:3000
}

export default Alert;