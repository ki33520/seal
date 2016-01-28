'use strict';
import React,{Component} from "react";
import classNames from "classnames";

class GoodItem extends Component{
    render(){
        const {goods} = this.props;
    	const saleOutIcon = classNames({
            "sale-out":goods.isSaleOut
        });
    	const activityIcon=classNames({
    		"flash-price":goods.isFlashPrice,
    		"mobile-price":!goods.isFlashPrice && goods.isMobilePrice
    	});
        return (
            <div className="clearfix">
                <a href={"/gooddetail/"+goods.id} >
                    	<div className={saleOutIcon}></div>
                    	<div className={activityIcon}></div>
                        <img src={goods.imageUrl} alt="" />
                        <div className="country">
                        	<i><img src={goods.sourceImageUrl} alt="" /></i>
                        	{goods.sourceName}
                        </div>
                        <p>{goods.title}</p>
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