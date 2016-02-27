'use strict';
import React,{Component} from "react";
import classNames from "classnames";

class GoodItem extends Component{
    render(){
        const {goods} = this.props;
        const soldOut = classNames({
            "sale-out":goods.isSoldOut,
            "hide": goods.isSoldOut?false:true
        });
        const saleIcon = classNames({
            "flash-price":goods.saleType==='flash',
            "mobile-price":goods.saleType ==='mobile',
            "hide":goods.saleType===undefined
        });
        return (
            <div className="clearfix">
                <a href={"/gooddetail/"+goods.singleCode} >
                    	<div className={soldOut}></div>
                        <div className={saleIcon}></div>
                        <img src={goods.imageUrl} alt="" />
                        <div className="country">
                        	<i><img src={goods.sourceImageUrl} alt="" /></i>
                        	{goods.sourceName}
                        </div>
                        <p className="title">{goods.title}</p>
                        <div>
                            <span className="now-price">&yen;{goods.salesPrice}</span>
                            <span className="old-price">&yen;{goods.originPrice}</span>
                        </div>
    	        </a>
            </div>
        )
    }
}

export default GoodItem;