'use strict';
import React,{Component} from "react";
import classNames from "classnames";
import {formatPrice,destPriceForGoods} from "../../../lib/util.es6";
class GoodItem extends Component{
    render(){
        const {goods} = this.props;
        const saleState = classNames({
            "sale-out":goods.localStock<1&&goods.onSale,
            "put-off":!goods.onSale
        });
        const saleIcon = classNames({
            "mobile-price":goods.useMobilePrice
        });
        const salesPrice = formatPrice(destPriceForGoods(goods).destPrice);
        const originPrice = formatPrice(goods.originPrice);
        return (
            <div className="clearfix">
                <a href={"/gooddetail/"+goods.singleCode}>
                	<div className={saleState}></div>
                    <div className={saleIcon}></div>
                    <img src={goods.imageUrl} alt="" />
                    <div className="country">
                    	<i><img src={goods.sourceImageUrl} alt="" /></i>
                    	{goods.sourceName}
                    </div>
                    <p className="title">{goods.title}</p>
                    <div className="prices">
                        <span className="now-price">{'¥'+salesPrice}</span>
                        <span className="old-price">{'¥'+originPrice}</span>
                    </div>
    	        </a>
            </div>
        )
    }
}

export default GoodItem;