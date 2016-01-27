'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Popover from "../../../component/popover.jsx";

class Attributes extends Component{
    render(){
        const {onAttrChange,selectedAttr,stock} = this.props;
        const attrs = this.props.attrs.map((attr,i)=>{
            if(attr.attrValues.length === 0){
                return null;
            }
            var attrValues = [];
            // console.log('attrValues',attr.attrValues)
            attr.attrValues.map((attrValue,j)=>{
                const active = attr.selectedValue !== null && attr.selectedValue.value === attrValue.value;
                const classes = classNames({
                    active,
                    disabled:attrValue.disabled === true
                })
                const popoverActive = (selectedAttr !== null && selectedAttr.propertyName === attr.attrName)
                && (stock !== null && active);
                // console.log('popoverActive',selectedProperty,active,popoverActive)
                // console.log(property.selectedValue,propertyValue)
                attrValues.push((
                    <a className={classes} 
                    href="javascript:void(null)"
                    key={"property-value-"+ j}
                    onClick={onAttrChange.bind(this,attr,attrValue)}
                    >{attrValue.value}</a>
                ));
            })
            return (
                <div className="property" key={i}>
                    <div className="divider-title">
                        <span>{attr.attrName}</span>
                    </div>
                    <div className="select clearfix">
                    {attrValues}
                    </div>
                </div>
            )
        });
        return (
            <div className="properties">
            {attrs}
            </div>
        )
    }
}

export default Attributes;