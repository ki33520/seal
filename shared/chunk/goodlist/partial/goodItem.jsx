'use strict';
import React,{Component} from "react";
import classNames from "classnames";

class GoodItem extends Component{
    render(){
    	 
    	let {goods} = this.props;
    	 
    	const saleOutIcon = classNames({
            "sale-out":goods.isSaleout
        });
    	const activityIcon=classNames({
    		"flash-price":goods.isFlashPrice,
    		"mobile-price":!goods.isFlashPrice && goods.mobilePrice
    	});
        return (
            <a href={"/gooddetail/"+goods.id}>
            	<div className="clearfix">
                	<div className={saleOutIcon}></div>
                	<div className={activityIcon}></div>
                    <img src={goods.smallImageUrl} alt="" />
                    <div className="country">
                    	<i><img src={goods.areaLogo} alt="" /></i>
                    	{goods.areaName}
                    </div>
                    <p>{goods.materTitle}</p>
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