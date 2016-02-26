'use strict';
import React,{Component} from "react";
import classNames from "classnames";

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
                        <span className="now-price">&yen;{goods.salesPrice}</span>
                        <span className="old-price">&yen;{goods.originPrice}</span>
                    </div>
                </div>
	        </a>
        )
    }
}

export default GoodItem;