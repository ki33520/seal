'use strict';

import React,{Component} from "react";
import Dropdown from "../../../component/dropdown.jsx";

class Promotions extends Component{
    render(){
        var promotions = [],promotionBriefs = [];
        if(this.props.promotions){
            var i = 0;
            for(let k in this.props.promotions){
                i++;
                const key = "promotion-" + i;
                promotions.push((
                    <div className="promotion-row" key={key}>
                        <span className="promotion-title">{k}</span>
                        <span className="promotion-desc">{this.props.promotions[k]}</span>
                    </div>
                ))
                promotionBriefs.push((<span key={key}>{k}</span>));
            }
        }else{
            return null
        }
        return (
            <div className="promotion clearfix">
                <dl>
                    <dt>促销：</dt>
                    <dd>
                    <div className="good-promotions">
                        <Dropdown showStatus={false} 
                        foldIcon="up" unfoldIcon="down">
                        <div className="promotions-brief">{promotionBriefs}</div>
                        <div className="promotions">
                        <p>可享受以下促销</p>
                        {promotions}
                        </div>
                        </Dropdown>
                    </div>
                    </dd>
                </dl>
            </div>
        )
    }
}

export default Promotions;