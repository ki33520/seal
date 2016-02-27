'use strict';
import React,{Component} from "react";
import classNames from "classnames";
import {formatPrice} from "../../../lib/util.es6";
class GoodItem extends Component{
    render(){
    	let {goods} = this.props;
        const soldOut = classNames({
            "sale-out":goods.isSoldOut,
            "hide": goods.isSoldOut?false:true
        });
        const saleIcon = classNames({
            "flash-price":goods.saleType==='flash',
            "mobile-price":goods.saleType ==='mobile',
            "hide":goods.saleType===undefined
        });
        const salesPrice = formatPrice(goods.salesPrice);
        const originPrice = formatPrice(goods.originPrice);
        return (
            <a href={"/gooddetail/"+goods.singleCode}>
            	<div className="clearfix">
                	<div className={soldOut}></div>
                    <div className={saleIcon}></div>
                    <img src={goods.smallImageUrl} alt="" />
                    <div className="country">
                    	<i><img src={goods.sourceImageUrl} alt="" /></i>
                    	{goods.sourceName}
                    </div>
                    <p className="title">{goods.materTitle}</p>
                    <div>
                        <span className="now-price">&yen;{salesPrice}</span>
                        <span className="old-price">&yen;{originPrice}</span>
                    </div>
                </div>
	        </a>
        )
    }
}

export default GoodItem;