'use strict';

import React,{Component} from "react";
import Dropdown from "../../../component/dropdown/dropdown.jsx";

class Promotions extends Component{
    render(){
        var promotions = [],promotionBriefs = [];
        if(this.props.promotions !== null){
            for(let k in this.props.promotions){
                promotions.push((
                    <div className="promotion">
                        <span className="promotion-title">{k}</span>
                        <span className="promotion-desc">{this.props.promotions[k]}</span>
                    </div>
                ))
                promotionBriefs.push((<span>{k}</span>));
            }
        }
        return (
            <div className="good-promotions">
                <Dropdown showStatus={false} 
                foldIcon="up-open" unfoldIcon="right-open">
                <div className="promotions-brief">{promotionBriefs}</div>
                <div className="promotions">{promotions}</div>
                </Dropdown>
            </div>
        )
    }
}

export default Promotions;