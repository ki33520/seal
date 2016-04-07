'use strict';

import React,{Component} from "react";

class Specification extends Component{
    render(){
        const {specList} = this.props;
        var specification = null;
        if(specList !== null){
            specification = [];
            var i = 0;
            for(let specName in specList){
                i++;
                const key = "spec-" + i;
                const specValue = specList[specName];
                specification.push(
                    <div className="specification-row" key={key}>
                    <div className="specification-name">{specName}</div>
                    <div className="specification-value">{specValue}</div>
                    </div>
                )
            }
        }

        return (
            <div className="good-specification">
                <div className="divider-title">
                    <span>规格参数</span>
                </div>
                <div className="specification-content">{specification}</div>
            </div>
        )
    }
}

export default Specification;