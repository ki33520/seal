'use strict';
import React,{Component} from "react";
import classNames from "classnames";
import {formatPrice} from "../../../lib/util.es6";
class GoodItem extends Component{
    filterPrice(flash,mobile,salse){
        if(flash && flash > 0){
            return formatPrice(flash);
        }else if(mobile && mobile > 0){
            return formatPrice(mobile);
        }else{
            return formatPrice(salse);
        }
    }
    render(){
        const {goods} = this.props;
        const soldOut = classNames({
            "sale-out":goods.localStock>0?false:true
        });
        const saleIcon = classNames({
            "flash-price":goods.flashPrice>0?true:false,
            "mobile-price":goods.mobilePrice>0?true:false
        });
        const salesPrice = this.filterPrice(goods.flashPrice,goods.mobilePrice,goods.salesPrice);
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