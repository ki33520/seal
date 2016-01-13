'use strict';
import React,{Component} from "react";
import classNames from "classnames";

class GoodItem extends Component{
    render(){
        const {id,title,salesPrice,originPrice,imageUrl,
            sourceName,sourceImageUrl,wapPrice,phonePrice,
            localStock} = this.props.goods;
    
    	const statusClass = classNames({
            "sale-out":localStock<1
        });
    	const activityClass=classNames({
    		"flash-sale":wapPrice>0,
    		"phone-price":!wapPrice && phonePrice>0
    	});
        return (
            	<div className="clearfix">
            <a href={"/gooddetail/"+id} >
                	<div className={statusClass}></div>
                	<div className={activityClass}></div>
                    <img src={imageUrl} alt="" />
                    <div className="country">
                    	<i><img src={sourceImageUrl} alt="" /></i>
                    	{sourceName}
                    </div>
                    <p>{title}</p>
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