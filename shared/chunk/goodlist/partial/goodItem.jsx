'use strict';
import React,{Component} from "react";

class GoodItem extends Component{
    renderIcon(goods){
        var icons = [];
        if(goods.isSaleOut){
            icons.push(<div className="sale-out" key="out"></div>);
        }
        if(goods.isFlashPrice){
            icons.push(<div className="flash-price" key="flash"></div>);
        }else if(goods.isMobilePrice){
            icons.push(<div className="mobile-price" key="mobile"></div>);
        }
        return icons;
    }
    render(){
    	let {goods} = this.props;
        return (
            <a href={"/gooddetail/"+goods.id}>
            	<div className="clearfix">
                	{this.renderIcon(goods)}
                    <img src={goods.smallImageUrl} alt="" />
                    <div className="country">
                    	<i><img src={goods.sourceImageUrl} alt="" /></i>
                    	{goods.sourceName}
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