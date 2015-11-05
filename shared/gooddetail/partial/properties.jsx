'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Popover from "../../component/popover/popover.jsx";

class Properties extends Component{
    render(){
        const {onPropertyChange,selectedProperty,stock} = this.props;
        const properties = this.props.properties.map((property,i)=>{
            if(property.propertyValues.length === 0){
                return null;
            }
            var propertyValues = property.propertyValues.map((propertyValue,j)=>{
                const active = property.selectedValue !== null && property.selectedValue.value === propertyValue.value;
                const propertyClasses = classNames("property-value",{
                    active,
                    default:propertyValue.disabled === true
                })
                const popoverActive = (selectedProperty !== null && selectedProperty.propertyName === property.propertyName)
                && (stock !== null && active);
                // console.log('popoverActive',selectedProperty,active,popoverActive)
                // console.log(property.selectedValue,propertyValue)
                const propertyValueComponent = (
                    <div className={propertyClasses} 
                    key={"property-value-"+ j}
                    onClick={onPropertyChange.bind(this,property,propertyValue)}
                    ><Popover 
                    active={popoverActive}
                    >还剩<b>{stock}</b>件</Popover>{propertyValue}</div>
                );
                return propertyValueComponent;
            })
            return (
                <div className="property" key={"property-"+ i}>
                    <div className="divider-title">
                        <span>{property.propertyName}</span>
                    </div>
                    <div className="property-values">
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