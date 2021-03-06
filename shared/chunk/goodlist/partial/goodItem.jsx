'use strict';
import React,{Component} from "react";
import classNames from "classnames";
import {formatPrice,destPriceForGoods} from "../../../lib/util.es6";
import LazyLoad from "../../../component/lazyload/lazyload.jsx";
import Image from "../../../component/lazyload/image.jsx";
import {jumpURL} from "../../../lib/jumpurl.es6";

class GoodItem extends Component{
    render(){
        const {goods} = this.props;
        const soldOut = classNames({
            "sale-out":goods.localStock>0?false:true
        });
        const saleIcon = classNames({
            "mobile-price":goods.useMobilePrice
        });
        const salesPrice = formatPrice(destPriceForGoods(goods).destPrice);
        const originPrice = formatPrice(goods.originPrice);
        return (
            <a href={jumpURL("gooddetail",[goods.singleCode])}>
            	<div className="clearfix">
                    <div className={soldOut}></div>
                    <div className={saleIcon}></div>
                    <LazyLoad relative={true} relativeSelector="back-to-top-inner">
                        <Image src={goods.smallImageUrl} transitionName="fade" placeholder={()=><div className="placeholder"></div>}/>
                    </LazyLoad>
                    <div className="country">
                    	<i><img src={goods.sourceImageUrl} alt="" /></i>
                    	{goods.sourceName}
                    </div>
                    <div className="goods-desc">{goods.materTitle}</div>
                    <div className="prices">
                        <span className="now-price">{'¥'+salesPrice}</span>
                        <span className="old-price">{'¥'+originPrice}</span>
                    </div>
                </div>
	        </a>
        )
    }
}

export default GoodItem;