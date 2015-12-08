'use strict';

import React,{Component} from "react";
import LazyLoad from "../../../component/lazyload/lazyload.jsx";
import Image from "../../../component/lazyload/image.jsx";

class OrderGoods extends Component{
    renderGoods(){
        const {orderItemList} = this.props;
        if(orderItemList.length > 0){
            const goodItems = orderItemList.map((good,i)=>{
                const key = "group-" + i
                return (
                    <div className="group-good" key={key}>
                        <div className="group-good-thumbnail">
                            <a href="">
                            <img src={good.imageUrl}/>
                            </a>
                        </div>
                        <div className="group-good-detail">
                            <h3>{good.title}</h3>
                            <p>{good.skuProps}</p>
                            <p><span>单价:<b>￥{good.salesPrice}</b><b className="through-line">￥{good.originPrice}</b></span></p>
                            <p>数量:<b>{good.qty}</b></p>
                        </div>
                    </div>
                )
            })
            return goodItems;
        }
        return null;
    }
    render(){
        const {productFee} = this.props;
        return (
            <div className="order-group">
            <div className="group-mall">
                    <div className="check-label">所属门店:<b>友谊商店</b></div>
                    <div className="group-shipfee">运费:<b>免运费</b></div>
                </div>
                <div className="group-promotion">
                    <div className="promotion-name">满减</div>
                    <div className="promotion-desc">购物满200减30,满300减50</div>
                </div>
                <div className="group-goods">
                {this.renderGoods()}
                </div>
                <div className="group-total">
                <span>小计<b>￥100</b></span>
                <span><label>满折</label><b>￥100</b></span>
                </div>
            </div>
        )
    }
}

export default OrderGoods;