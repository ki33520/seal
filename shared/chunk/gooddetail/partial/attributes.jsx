'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Popover from "../../../component/popover.jsx";

class Attributes extends Component{
    render(){
        const {onAttrChange,stock,attrs} = this.props;
        let attrContent = []
        for(let attrName in attrs){
            let attrValues = attrs[attrName]
            if(attrValues.length === 0){
                return null;
            }
            attrValues = attrValues.map((attrValue,j)=>{
                const classes = classNames({
                    active:attrValue.selected,
                    disabled:attrValue.disabled === true
                })
                return (
                    <a className={classes} 
                    href="javascript:void(null)"
                    key={j}
                    onClick={onAttrChange.bind(this,attrName,attrValue)}
                    >{attrValue.value}</a>
                );
            })
            attrContent.push(
                <div className="property" key={attrName}>
                    <div className="divider-title">
                        <span>{attrName}</span>
                    </div>
                    <div className="select clearfix">
                    {attrValues}
                    </div>
                </div>
            )            
        }
        return (
            <div className="properties">
            {attrContent}
            </div>
        )
    }
}

export default Attributes;