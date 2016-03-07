'use strict';
import React,{Component} from "react";
import classNames from "classnames";
import {formatPrice} from "../../../lib/util.es6";
class GoodItem extends Component{
    filterPrice(goods){
        if(goods.useMobilePrice&&goods.mobilePrice>0){
            return formatPrice(goods.mobilePrice);
        }else{
            return formatPrice(goods.salesPrice);
        }
    }
    render(){
        const {goods} = this.props;
        const soldOut = classNames({
            "sale-out":goods.localStock>0?false:true
        });
        const saleIcon = classNames({
            "mobile-price":goods.useMobilePrice
        });
        const salesPrice = this.filterPrice(goods);
        const originPrice = formatPrice(goods.originPrice);
        return (
            <div className="clearfix">
                <a href={"/gooddetail/"+goods.singleCode}>
                	<div className={soldOut}></div>
                    <div className={saleIcon}></div>
                    <img src={goods.imageUrl} alt="" />
                    <div className="country">
                    	<i><img src={goods.sourceImageUrl} alt="" /></i>
                    	{goods.sourceName}
                    </div>
                    <p className="title">{goods.title}</p>
                    <div>
                        <span className="now-price">&yen;{salesPrice}</span>
                        <span className="old-price">&yen;{originPrice}</span>
                    </div>
    	        </a>
            </div>
        )
    }
}

export default GoodItem;