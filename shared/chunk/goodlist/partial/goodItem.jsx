'use strict';
import React,{Component} from "react";
import classNames from "classnames";

class GoodItem extends Component{
    renderIcon(goods){
        if(goods.isFlashPrice){
            return <div className="flash-price"></div>
        }else if(goods.isMobilePrice){
            return <div className="mobile-price"></div>
        }else if(goods.isSaleout){
            return <div className="sale-out"></div>
        }else{
            return null;
        }
    }
    render(){
    	let {goods} = this.props;
        return (
            <a href={"/gooddetail/"+goods.id}>
            	<div className="clearfix">
                	{this.renderIcon(goods)}
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