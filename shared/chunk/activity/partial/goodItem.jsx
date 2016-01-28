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
        const {goods} = this.props;
        return (
            <div className="clearfix">
                <a href={"/gooddetail/"+goods.id} >
                    	{this.renderIcon(goods)}
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