'use strict';
import React,{Component} from "react";
import classNames from "classnames";
import {formatPrice,destPriceForGoods} from "../../../lib/util.es6";
import {jumpURL} from "../../../lib/jumpurl.es6";
import LazyLoad from "../../../component/lazyload/lazyload.jsx";
import Image from "../../../component/lazyload/image.jsx";
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
                <a href={jumpURL("gooddetail",[goods.singleCode])}>
                	<div className={saleState}></div>
                    <div className={saleIcon}></div>
                    <LazyLoad relative={true} relativeSelector="back-to-top-inner">
                        <Image src={goods.imageUrl} transitionName="fade" placeholder={()=><div className="placeholder"></div>}/>
                    </LazyLoad>
                    <div className="country">
                    	<i><img src={goods.sourceImageUrl} alt="" /></i>
                    	{goods.sourceName}
                    </div>
                    <p className="title">{goods.title}</p>
                    <div className="prices">
                        <span className="now-price"><b>¥</b>{salesPrice}</span>
                        <span className="old-price">{'¥'+originPrice}</span>
                    </div>
    	        </a>
            </div>
        )
    }
}

export default GoodItem;