'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";

import StatusProgress from "./statusprogress.jsx";
import OrderGoods from "./ordergoods.jsx";

const orderStatus = {
    "STATUS_NOT_PAY":"待付款",
    "STATUS_WAIT_CONFIRM":"待审核",
    "STATUS_CONFIRMED":"待发货",
    "STATUS_OUT_HOUSE":"待收货",
    "STATUS_SENDED":"已签收",
    "STATUS_FINISHED":"已完成"
};

class OrderDetail extends Component{
    renderAddress(order){
        const {receiverName,receiverPhone,
            receiverProvince,receiverCity,receiverDistrict,receiverAddress} = order.orderAddressPojo;
        const {logisticsTime} = order.orderPcmPojo
        const address = `${receiverProvince}${receiverCity}${receiverDistrict}${receiverAddress}`
        return (
           <div className="order-receiver">
                <h3>收货信息</h3>
                <p><span>收货人</span><em>{receiverName}</em></p>
                <p><span>手机号码</span><em>{receiverPhone}</em></p>
                <p><span>收货地址</span><em>{address}</em></p>
                <p><span>收货时间</span><em>{logisticsTime}</em></p>
            </div> 
        )
    }
    render(){
        const {order} = this.props;
        return (
            <div className="order-detail-content">
            <Header title="订单详情"/>
            <div className="order-status">
                <p>订单编号:<em>{order.orderNo}</em></p>
                <StatusProgress {...this.props.order}/>
            </div>
            <div className="order-brief">
                <h3>订单信息</h3>
                <p>下单时间:<em>{order.createdAt}</em></p>
                <p>订单状态:<em>{orderStatus[order.status]}</em></p>
            </div>
            <div className="order-goods">
                <h3>商品信息</h3>
                <OrderGoods {...this.props.order}/>
            </div>
            {this.renderAddress(order)}
            <div className="order-totalfee">
                <h3>订单金额</h3>
                <p><span>商品总金额</span><em>&yen;{order.productFee}</em></p>
                <p><span>运费</span><em>&yen;{order.logisticsFee}</em></p>
                <p><span>活动优惠</span><em>&yen;{order.promoFee}</em></p>
                <p><span>优惠券</span><em>&yen;{order.couponFee}</em></p>
                <p><span>余额</span><em>&yen;{order.usedBalanceFee}</em></p>
                <p><span>电子券</span><em>&yen;{order.usedTicketFee}</em></p>
                <p><span>应付金额</span><em>&yen;{order.finalFee}</em></p>
            </div>
            <div className="order-footer">
                <div className="order-sumprice">合计:<b>&yen;{order.finalFee}</b></div>
                <div className="order-footer-button">
                <a href={"/applyrefund/"+order.orderNo} 
                >退货退款</a>
                <a href="#/logistics" className="light" 
                >物流详情</a>
                </div>
            </div>
            </div>
        )
    }
}

export default OrderDetail;