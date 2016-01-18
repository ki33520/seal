'use strict'

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Icon from "../../../component/icon.jsx";
import Checkbox from "../../../component/form/checkbox.jsx";
import Selected from "../../../component/selected/selected.jsx";
import Header from "../../common/header.jsx";

import OrderGoods from "./ordergoods.jsx";
import Invoice from "./invoice.jsx";
import SubmitOrder from "./submitorder.jsx";

import Alert from "../../../component/alert.jsx";

class ConfirmOrder extends Component{
    renderReceiver(receiver){
        if(receiver === null){
            return (
                <div className="order-time noReceive">
                    <span>
                        <i className="iconfont icon-plus"></i>
                        请添加您的收货地址
                    </span>
                </div>
            )
        }
        return (
            <a href="javascript:void(null)" onClick={this.props.changeScene.bind(this,"receiver")}>
            <div className="order-time">
            <p>{receiver.consignee}<span className="mobNum">{receiver.mobileNumber}</span></p>
            <p>433101**********1011<em>实名</em></p>
            <p className="fs12px">{receiver.provinceName+receiver.cityName+receiver.districtName+receiver.address}</p>
            <span className="order-icpe"><i className="iconfont icon-right"></i></span>
            </div>
            </a>
        )
    }
    renderTotal(order){
        return (
            <div className="count-box">
                <div className="title">
                    <div className="fl title-txt">结算</div>
                </div>
                <div className="count-box-line">
                    <div className="label">商品总价：</div>
                    <div className="data"> - &yen;<span>{order.productFee}</span></div>
                </div>
                <div className="count-box-line">
                    <div className="label">国内运费：</div>
                    <div className="red-box"> 包邮 </div>
                    <div className="data"> - &yen;<span>{order.shipFee}</span></div>
                </div>
                <div className="count-box-line">
                    <div className="label">国际运费：</div>
                    <div className="data"> - &yen;<span>{order.abroadFee}</span></div>
                </div>
                <div className="count-box-line">
                    <div className="label">关税：</div>
                    <div className="red-box">免税</div>
                    <div className="data"> - &yen;<span>{order.tariffFee}</span></div>
                </div>
                <div className="count-box-line intro">
                    <div className="label">优惠活动：</div>
                    <div className="data"> - &yen;<span>{order.promoFee}</span></div>
                </div>
                <div className="count-box-line intro">
                    <div className="label">优惠券：</div>
                    <div className="data"> - &yen; <span id="coupon_money">{order.couponFee}</span></div>
                </div>
                <div className=" count-box-line no-border">
                    <div className="label">应付金额：</div>
                    <div className="data red-w">&yen;<span id="total_amount_money">{order.totalFee}</span></div>
                </div>
            </div>
        )
    }
    submitOrder(){
        const {order,submitOrder} = this.props;
        const {checkedCoupon,useBalance,useTicket,payPassword,
            checkedDeliveryTime,checkedReceiver,checkedInvoice} = order;
        submitOrder("/submitorder",{
            itemIds:order.itemIds,
            buyeds:order.buyeds,
            couponNo:checkedCoupon !== undefined?checkedCoupon.couponNo:"",
            receiverId:checkedReceiver !== null?checkedReceiver.id:"",
            couponFee:order.couponFee,
            totalFee:order.totalFee
        })
    }
    componentDidUpdate(prevProps,prevState){
        const {dispatch,orderSubmited,errMsg} = this.props;
        if(prevProps.orderSubmiting === true && 
            this.props.orderSubmiting === false){
            if(orderSubmited === true){
                setTimeout(()=>{
                    console.log('submitOrder')
                    // window.location.assign("/orderlist")
                    ReactDOM.findDOMNode(this.refs["SubmitOrder"].refs["submitForm"]).submit();
                },2400)
            }
        }
    }
    render(){
        const {order,alertActive,alertContent} = this.props;
        return (
            <div className="confirm-order-content">
            <Header>确认订单</Header>
            {this.renderReceiver(order.checkedReceiver)}
            <OrderGoods {...this.props.order}/>
            <div className="ckTo-box clearfix">
                <a href="javascript:void(null)" onClick={this.props.changeScene.bind(this,"coupon")}>
                <div className="intro">
                <span>优惠券</span>
                <span><em><i>券</i>新人5元券</em><i className="iconfont icon-right"></i></span>
                </div>
                </a>
            </div>
            {this.renderTotal(order)}
            <SubmitOrder order={order} onSubmit={this.submitOrder.bind(this)} ref="SubmitOrder"/>
            <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default ConfirmOrder;