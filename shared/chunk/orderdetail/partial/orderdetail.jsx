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
        const {receiverName,receiverMobile,
            receiverProvince,receiverCity,receiverDistrict,receiverAddress} = order.receiverObject;
        const address = `${receiverProvince} ${receiverCity} ${receiverDistrict} ${receiverAddress}`
        return (
            <div className="order-time">
                <p>{receiverName}<span className="mobNum">{receiverMobile}</span></p>
                <p className="fs12px">{address}</p>
            </div>
        )
    }
    renderFooter(){
        return (
            <div className="confirmBtns">
                <a href="javascript:void(0);" className="confirm_btn confirmBorder_btn">取消订单</a>
                <a href="javascript:void(0);" className="confirm_btn">立即支付</a>
            </div>
        )
    }
    render(){
        const {order} = this.props;
        var logisticsFeeBox = order.logisticsFee === 0 ? <div className="red-box">包邮</div> : null;
        var abroadFeeBox = order.abroadFee === 0 ? <div className="red-box">包邮</div> : null;
        var tariffFeeBox = order.tariffFee === 0 ? <div className="red-box">免税</div> : null;
        return (
            <div className="order-detail-content">
            <Header>订单详情</Header>
            <div className="orderSpeed">
                <div className="orderNum"><i>订单编号:</i><span>{order.orderNo}</span></div>
                <StatusProgress {...order}/>
                <span>01:15:47&nbsp;后自动取消</span>
            </div>
            {this.renderAddress(order)}
            <div className="order-list">
                <OrderGoods {...this.props.order}/>
            </div>
            <div className="count-box">
                <div className="title">
                    <div className="fl title-txt">结算</div>
                </div>
                <div className="bottom-line">
                    <div className="label">商品总价：</div>
                    <div className="data"><i>&yen;</i><span>{order.salesTotalFee}</span></div>
                </div>
                <div className="bottom-line">
                    <div className="label">国内运费：</div>
                    <div className="data">{logisticsFeeBox}<i>&yen;</i><span>{order.logisticsFee}</span></div>
                </div>
                <div className="bottom-line">
                    <div className="label">国际运费：</div>
                    <div className="data">{abroadFeeBox}<i>&yen;</i><span>{order.abroadFee}</span></div>
                </div>
                <div className="bottom-line">
                    <div className="label">关税：</div>
                    <div className="data">{tariffFeeBox}<i>&yen;</i><span>{order.tariffFee}</span></div>
                </div>
                <div className="bottom-line intro">
                    <div className="label">优惠活动：</div>
                    <div className="data">-<i>&yen;</i><span>{order.promoFee}</span></div>
                </div>
                <div className="bottom-line intro">
                    <div className="label">优惠券：</div>
                    <div className="data">-<i>&yen;</i><span id="coupon_money">{order.couponFee}</span></div>
                </div>
                <div className=" bottom-line no-border">
                    <div className="label">应付金额：</div>
                    <div className="data red-w"><i>&yen;</i><span id="total_amount_money">{order.paymentFee}</span></div>
                </div>
            </div>
            {this.renderFooter()}
            </div>
        )
    }
}

export default OrderDetail;