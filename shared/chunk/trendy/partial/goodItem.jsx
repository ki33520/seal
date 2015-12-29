'use strict';
import React,{Component} from "react";
import classNames from "classnames";

class GoodItem extends Component{
    render(){
    	 
    	var goods = this.props.goods;
    	//console.log(goods)
    	var status=goods.status,
    		activityType=goods.activityType,
    		icon=goods.country.icon,
    		name = goods.country.name,
    		salePrice=goods.salePrice,
    		standardPrice=goods.standardPrice,
    		smallImageUrl=goods.smallImageUrl,
    		title=goods.title;

    	const statusClass = classNames({
            "sale-out":status==1
        });
    	const activityClass=classNames({
    		"flash-sale":activityType==1,
    		"phone-price":activityType==2
    	});
        return (
           <a href="#" className="clearfix">
                <img src={smallImageUrl}/>
                <div className={statusClass}></div>
                <div className="right">
                    <span className="name">{title}</span>
                    <span className="country"><i><img src={icon} alt="" /></i>{name}</span>
                    <span className="now-price">&yen;{salePrice}</span>
                    <span className="old-price">&yen;{standardPrice}</span>
                </div>
            </a>
        )
    }
}

export default GoodItem;