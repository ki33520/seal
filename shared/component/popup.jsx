'use strict'
import React,{Component} from "react";
import classNames from "classnames";

class Popup extends Component{
    componentWillReceiveProps(nextProps){
        if(nextProps.active !== this.props.active){
            // console.log(nextProps);            
            if(nextProps.active === true){
                document.body.style["overflow-y"] = "hidden";
            }else{
                document.body.style["overflow-y"] = "auto";
            }
        }
    }
    render(){
        const {direction,active} = this.props;
        const classes = classNames({
            "popup":true,
            "active":active,
            "popup-left":direction === "left",
            "popup-right":direction === "right",
            "popup-bottom":direction == "bottom"
        });
        return (
            <div className={classes}>
            {this.props.children}
            </div>
        );
    }
}

export default Popup;