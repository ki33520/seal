'use strict';

import React,{Component} from "react";
import LazyLoad from "../../../component/lazyload/lazyload.jsx";
import Image from "../../../component/lazyload/image.jsx";
import Icon from "../../../component/icon.jsx";

const orderStatus = {
    "STATUS_NOT_PAY":"待付款",
    "STATUS_WAIT_CONFIRM":"待审核",
    "STATUS_CONFIRMED":"待发货",
    "STATUS_OUT_HOUSE":"待收货",
    "STATUS_SENDED":"已签收",
    "STATUS_FINISHED":"已完成",
    "STATUS_CANCELED":"已取消"
};

class OrderItem extends Component{
    render(){
        const {createdAt,id,orderItemList,orderNo,finalFee,status} = this.props;
        const imageUrl = orderItemList[0].imageUrl;
        return (
            <div className="order-list-item">
            <div className="item-title">
            下单时间:<b>{createdAt}</b>
            </div>
            <a href={"/orderdetail/"+id}>
            <div className="item-content">
                <div className="item-thumbnail">
                <LazyLoad offset={100}>
                <Image src={imageUrl}>
                </Image>
                </LazyLoad>
                </div>
                <div className="item-detail">
                    <p><span>订单编号:<b>{orderNo}</b></span></p>
                    <p><span>订单金额:<b>￥{finalFee}</b></span></p>
                    <p><span>订单状态:<b>{orderStatus[status]}</b></span></p>
                </div>
                <div className="item-caret"><Icon icon="right-open"/></div>
            </div>
            </a>
            </div>
        )
    }
}

export default OrderItem;