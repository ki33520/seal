'use strict';
import React,{Component} from "react";
import classNames from "classnames";

class GoodItem extends Component{
    render(){
    	 
    	var goods = this.props.goods;
    	//console.log(goods)
 

    	const statusClass = classNames({
            "soldOut":goods.status==1
        });

        return (
            <a href="#" className="clearfix">
                <img src={goods.smallImageUrl}/>
                <div className={statusClass}></div>
                <div className="right">
                    <span className="name">{goods.title}</span>
                    <span className="country"><i><img src={goods.flag} /></i>{goods.country}</span>
                    <span className="nowPrice">&yen;{goods.salePrice}</span>
                    <span className="oldPrice">&yen;{goods.standardPrice}</span>
                </div>
            </a>
        )
    }
}

export default GoodItem;