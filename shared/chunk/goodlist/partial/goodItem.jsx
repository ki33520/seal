'use strict';
import React,{Component} from "react";
import classNames from "classnames";

class GoodItem extends Component{
    render(){
    	 
    	var goods = this.props.goods;
    	//console.log(goods)
    	 
    	const statusClass = classNames({
            "sale-out":goods.isSaleOut
        });
    	const activityClass=classNames({
    		"flash-sale":goods.activityType==1,
    		"phone-price":goods.activityType==2
    	});
        return (
            <a href={"/gooddetail/"+goods.id}>
            	<div className="clearfix">
                	<div className={statusClass}></div>
                	<div className={activityClass}></div>
                    <img src={goods.smallImageUrl} alt="" />
                    <div className="country">
                    	<i><img src={goods.flag} alt="" /></i>
                    	{goods.productArea}
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