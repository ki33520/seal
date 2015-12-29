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
                    <div className="clearfix" key={key}>
                        <a className="img_wrap J_ytag cartlist" href="#">
                            <img src={good.imageUrl}/>
                        </a>
                        <div className="gd_info">
                            <p className="name"><span>{good.title}</span></p>
                            <p className="value"> <span>&yen;{good.salesPrice}</span><b>X{good.qty}</b></p>
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
            <div className="orderConfirm_l clearfix">
                <div className="orderConfirm_l_box">
                    <div className="J_moveRight">
                    {this.renderGoods()}
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderGoods;