'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Icon from "../icon.jsx";

class Radio extends Component{
    render(){
        const checkedIcon = this.props.checkedIcon || "dot-circled";
        const uncheckIcon = this.props.uncheckIcon || "circle-empty";
        const {checked,name,onChange} = this.props;
        const classes = classNames("radio",this.props.className,{
            checked
        })
        return (
            <div className={classes} onClick={onChange}>
            {checked?(
            <Icon icon={checkedIcon} className="checked"/>
            ):(
            <Icon icon={uncheckIcon} className="unchecked"/>
            )}
            </div>
        )
    }
}

Radio.defaultProps = {
    checked:false,
    onChange:()=>{}
}

export default Radio;