'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Icon from "../icon.jsx";

class Radio extends Component{
    render(){
        const checkedIcon = "dot-circled";
        const uncheckIcon = "circle-empty";
        const {checked,name,onChange} = this.props;
        const classes = classNames("radio",this.props.className)
        return (
            <div className={classes}>
            <input type="radio" name={name} onChange={onChange} defaultChecked={checked} 
            ref="checkInput"/>
            <Icon icon={checkedIcon} className="checked"/>
            <Icon icon={uncheckIcon} className="unchecked"/>
            </div>
        )
    }
}

Radio.defaultProps = {
    checked:false,
    onChange:()=>{}
}

export default Radio;