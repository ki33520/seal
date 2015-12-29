'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Popover from "../../../component/popover.jsx";

class Properties extends Component{
    render(){
        const {onPropertyChange,selectedProperty,stock} = this.props;
        const properties = this.props.properties.map((property,i)=>{
            if(property.propertyValues.length === 0){
                return null;
            }
            var propertyValues = [];
            property.propertyValues.map((propertyValue,j)=>{
                const active = property.selectedValue !== null && property.selectedValue.value === propertyValue.value;
                const propertyClasses = classNames({
                    active,
                    default:propertyValue.disabled === true
                })
                const popoverActive = (selectedProperty !== null && selectedProperty.propertyName === property.propertyName)
                && (stock !== null && active);
                // console.log('popoverActive',selectedProperty,active,popoverActive)
                // console.log(property.selectedValue,propertyValue)
                propertyValues.push((
                    <a className={propertyClasses} 
                    href="javascript:void(null)"
                    key={"property-value-"+ j}
                    onClick={onPropertyChange.bind(this,property,propertyValue)}
                    >{propertyValue.value}</a>
                ));
            })
            return (
                <div className="property" key={"property-"+ i}>
                    <div className="divider-title">
                        <span>{property.propertyName}</span>
                    </div>
                    <div className="select clearfix">
                    {propertyValues}
                    </div>
                </div>
            )
        });
        return (
            <div className="properties">
            {properties}
            </div>
        )
    }
}

export default Properties;