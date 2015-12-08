'use strict'

import React,{Component} from "react";
import Icon from "../../../component/icon.jsx";
import Checkbox from "../../../component/form/checkbox.jsx";
import Selected from "../../../component/selected/selected.jsx";
import Header from "../../common/header.jsx";

import OrderGoods from "../../common/ordergoods.jsx";
import Invoice from "./invoice.jsx";

import {alert} from "../../common/action.es6";
import Alert from "../../../component/alert.jsx";

import {submitOrder,changeDeliveryTime,toggleTicket,toggleBalance,changePaypassword} from "../action.es6";

class ConfirmOrder extends Component{
    renderReceiver(receiver){
        return (
            <div className="confirm-receiver">
            <a href="#/receiver">
                <div className="confirm-receiver-selected">
                <p>{receiver.name}&nbsp;{receiver.mobileNumber}</p>
                <p>{receiver.provinceName+receiver.cityName+receiver.districtName+receiver.address}</p>
                </div>
                <div className="confirm-receiver-caret"><Icon icon="right-open"/></div>
            </a>
            </div>
        )
    }
    renderDeliveryTime(){
        const options = [
            {label:'工作日,双休日及节假日均可送货',value:'NOLIMIT'},
            {label:'仅周一至周五送货',value:'WORKDAY'},
            {label:'仅双休日及节假日送货',value:'EXCEPTWORKDAY'}
        ]
        const {checkedDeliveryTime} = this.props.order;
        return (
            <div className="confirm-delivery-time">
            <Selected options={options} 
            onChange={this.handleChangeDeliveryTime.bind(this)}
            value={checkedDeliveryTime} 
            selectedIcon="check" 
            unselectedIcon="check"/>
            </div>
        )
    }
    handleChangeDeliveryTime(deliveryTime){
        const {dispatch} = this.props;
        dispatch(changeDeliveryTime(deliveryTime));
    }
    renderTotal(order){
        return (
            <div className="order-total">
                <div><span>商品金额</span><b>￥{order.productFee}</b></div>
                <div><span>运费</span><b>￥{order.shipFee}</b></div>
                <div><span>活动优惠</span><b>￥{order.promoAmount}</b></div>
                <div><span>优惠券</span><b>￥{order.promoAmount}</b></div>
                <div><span>电子券</span><b>￥{order.promoAmount}</b></div>
                <div><span>余额</span><b>￥{order.promoAmount}</b></div>
                <div><span>合计金额</span><b>￥{order.totalAmount}</b></div>
            </div>
        )
    }
    renderBalanceAndTicket(){
        const {dispatch,order} = this.props;
        const handleToggleTicket = (useTicket)=>{
            dispatch(toggleTicket(useTicket))
        }
        const handleToggleBalance = (useBalance)=>{
            dispatch(toggleBalance(useBalance))
        }
        return (
            <div className="confirm-balance-ticket">
            <div className="confirm-balance"><Checkbox onChange={handleToggleTicket}/><div className="check-label"
            >电子券付款<label>(当前电子券<b>￥{order.ticket}</b>)</label></div></div>
            <div className="confirm-balance"><Checkbox onChange={handleToggleBalance}/><div className="check-label"
            >余额付款<label>(当前余额<b>￥{order.balance}</b>)</label></div></div>
            </div>
        )
    }
    submitOrder(){
        const {dispatch,order} = this.props;
        const {checkedCoupon,useBalance,useTicket,payPassword,
            checkedDeliveryTime,checkedReceiver,checkedInvoice} = order;
        dispatch(submitOrder("/submitorder",{
            itemIds:order.itemIds,
            buyeds:order.buyeds,
            couponNo:checkedCoupon !== undefined?checkedCoupon.couponNo:"",
            ticketActive:useTicket,
            balanceActive:useBalance,
            payPassword:payPassword,
            logisticTime:checkedDeliveryTime!== null?checkedDeliveryTime:"",
            receiverId:checkedReceiver !== null?checkedReceiver.id:"",
            invoiceId:checkedInvoice !== undefined?checkedInvoice.id:""
        }))
    }
    componentDidUpdate(prevProps,prevState){
        const {dispatch,orderSubmited,errMsg} = this.props;
        if(prevProps.orderSubmiting === true && 
            this.props.orderSubmiting === false){
            if(orderSubmited === true){
                dispatch(alert("提交成功!",2000));
                setTimeout(()=>{
                    React.findDOMNode(this.refs.submitForm).submit();
                },2400)
            }else{
                dispatch(alert(errMsg,2000))
            }
        }
    }
    renderSubmitForm(){
        if(this.props.orderSubmited === true){
            const {payObject,payUrl} = this.props.result;
            var payInputs = [];
            for(let name in payObject){
                payInputs.push((
                    <input type="hidden" name={name} value={payObject[name]}/>
                ))
            }
            return (
                <form action={payUrl} method="POST" ref="submitForm">{payInputs}</form>
            )
        }
        return null;
    }
    render(){
        const {order,alertActive,alertContent} = this.props;
        return (
            <div className="confirm-order-content">
            <Header title="确认订单"/>
            {this.renderReceiver(order.checkedReceiver)}
            {this.renderDeliveryTime()}
            <OrderGoods {...this.props.order}/>
            <a href="#/coupon">
            <div className="confirm-coupon">
            <div className="confirm-coupon-status">优惠券<b>{order.checkedCoupon === undefined?"":order.checkedCoupon.couponDefName}</b></div>
            <div className="confirm-coupon-caret"><Icon icon="right-open"/></div>
            </div>
            </a>
            {this.renderBalanceAndTicket()}
            <Invoice {...this.props.order}/>
            {this.renderTotal(order)}
            <div className="order-toolbar">
                <div className="order-sumprice">合计:<b>￥{order.totalAmount}</b></div>
                <a href="javascript:void(null)" onClick={this.submitOrder.bind(this)}
                >提交订单</a>
                {this.renderSubmitForm()}
            </div>
            <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default ConfirmOrder;