'use strict'

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Icon from "../../../component/icon.jsx";
import GoTop from "../../../component/gotop.jsx";
import Checkbox from "../../../component/form/checkbox.jsx";
import Selected from "../../../component/selected/selected.jsx";
import Header from "../../common/header.jsx";
import {urlParam,base64EncodeForURL,formateIDCard} from "../../../lib/util.es6";

import OrderGoods from "./ordergoods.jsx";
import Invoice from "./invoice.jsx";
import SubmitOrder from "./submitorder.jsx";

import Alert from "../../../component/alert.jsx";
import Dialog from "../../../component/dialog.jsx";

class ConfirmOrder extends Component{
    constructor(props){
        super(props)
        this.state = {
            dialogActive:false,
            dialogContent:null,
            scrollable:true
        }
    }
    renderReceiver(receiver){
        if(receiver === null){
            return (
                <div className="order-time noReceive" onClick={this.props.changeScene.bind(this,"receiver")}
                ><div><i className="iconfont icon-plus"></i>请添加您的收货地址</div></div>
            )
        }
        return (
            <a href="javascript:void(null)" onClick={this.props.changeScene.bind(this,"receiver")}>
            <div className="order-time">
            <p>{receiver.consignee}<span className="mobNum">{receiver.mobileNumber}</span></p>
            <p>{formateIDCard(receiver.idCard)}<em>实名</em></p>
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
                    <div className="data">&yen;<span>{order.productFee.toFixed(2)}</span></div>
                </div>
                <div className="count-box-line">
                    <div className="label">国内运费：</div>
                    {order.shipFee>0?null:<div className="red-box">包邮</div>}
                    <div className="data">&yen;<span>{order.shipFee.toFixed(2)}</span></div>
                </div>
                <div className="count-box-line">
                    <div className="label">国际运费：</div>
                    <div className="data">&yen;<span>{order.abroadFee.toFixed(2)}</span></div>
                </div>
                <div className="count-box-line">
                    <div className="label">税费：</div>
                    {order.tariffFee>0?null:<div className="red-box">免税</div>}
                    <div className="data">&yen;<span>{order.tariffFee.toFixed(2)}</span></div>
                </div>
                <div className="count-box-line intro">
                    <div className="label">优惠活动：</div>
                    <div className="data"> - &yen;<span>{order.promoFee.toFixed(2)}</span></div>
                </div>
                <div className="count-box-line intro">
                    <div className="label">优惠券：</div>
                    <div className="data"> - &yen; <span id="coupon_money">{order.couponFee.toFixed(2)}</span></div>
                </div>
                <div className=" count-box-line no-border">
                    <div className="label">应付金额：</div>
                    <div className="data red-w">&yen;<span id="total_amount_money">{order.totalFee.toFixed(2)}</span></div>
                </div>
            </div>
        )
    }
    verifyOrder(){
        const {order,verifyOrder} = this.props
        const {checkedCoupon,useBalance,useTicket,payPassword,
            checkedDeliveryTime,checkedReceiver,checkedInvoice} = order;
        if(checkedReceiver === null){
            this.props.alert("请输入收货地址")
            return
        }
        verifyOrder({
            itemIds:order.itemIds,
            buyeds:order.buyeds,
            couponNo:checkedCoupon !== null?checkedCoupon.couponNo:"",
            receiverId:checkedReceiver !== null?checkedReceiver.id:"",
            totalFee:order.totalFee
        })

    }
    submitOrder(){
        const {order,submitOrder} = this.props;
        const {checkedCoupon,useBalance,useTicket,payPassword,
            checkedDeliveryTime,checkedReceiver,checkedInvoice} = order;
        if(this.props.orderSubmiting || this.props.paygatewayFetching){
            return
        }
        submitOrder({
            itemIds:order.itemIds,
            buyeds:order.buyeds,
            couponNo:checkedCoupon !== null?checkedCoupon.couponNo:"",
            receiverId:checkedReceiver !== null?checkedReceiver.id:"",
            couponFee:order.couponFee,
            totalFee:order.totalFee
        })
    }
    componentDidUpdate(prevProps,prevState){
        const {dispatch,paygatewayFetched,fetchPayGateway} = this.props;
        if(prevProps.orderVerifying && !this.props.orderVerifying){
            if(this.props.orderVerified){
                this.submitOrder()
            }else{
                this.setState({
                    scrollable:false,
                    dialogActive:true,
                    dialogContent:this.props.orderVerifiedErrMsg
                })
            }
        }
        if(prevProps.orderSubmiting === true && 
            this.props.orderSubmiting === false){
            if(this.props.orderSubmited === true){
                const {orderNo} = this.props.order
                let message = {
                    orderNo:orderNo,
                }
                fetchPayGateway(base64EncodeForURL(urlParam(message)))
            }else{
                // this.props.alert("")
            }
        }
        if(prevProps.paygatewayFetched === false && this.props.paygatewayFetched === true){
            setTimeout(()=>{
                // console.log('submitOrder')
                document.getElementById("submitForm").submit()
                // ReactDOM.findDOMNode(this.refs["SubmitOrder"].refs["submitForm"]).submit();
            },10)
        }
    }
    renderDialog(){
        let onlyConfirm = true;
        if(this.props.orderVerifiedErrCode == -402111){
            onlyConfirm = false
            return (
                <Dialog onlyConfirm={true} active={this.state.dialogActive} 
                onConfrim={()=>{
                    this.setState({
                        dialogActive:false,
                        dialogContent:""
                    })
                    window.history.back()
                }} 
                onCancel={()=>{
                    this.setState({
                        dialogActive:false,
                        dialogContent:""
                    })
                }}
                >{this.state.dialogContent}</Dialog>
            )
        }
        return (
            <Dialog onlyConfirm={true} active={this.state.dialogActive} 
            onConfrim={()=>{
                this.setState({
                    dialogActive:false,
                    dialogContent:""
                })
                window.history.back()
            }}
            >{this.state.dialogContent}</Dialog>
        )
    }
    render(){
        const {order,alertActive,alertContent} = this.props;
        return (
            <GoTop relative={true} scrollable={this.state.scrollable} renderFixed={()=>(
                <SubmitOrder order={order} orderSubmited={this.props.orderSubmited}
            submiting={this.props.orderVerifying || this.props.orderSubmiting || this.props.paygatewayFetching}
            onSubmit={this.verifyOrder.bind(this)}/>
            )} ref="gotop">
            <div className="confirm-order-content">
            <Header>确认订单</Header>
            {this.renderReceiver(order.checkedReceiver)}
            <OrderGoods {...this.props.order}/>
            <div className="ckTo-box">
                <div className="intro clearfix" onClick={this.props.changeScene.bind(this,"coupon")}>
                <span>优惠券</span>
                <span>{
                    order.coupons.length === 0 ?(<em>暂无可用优惠券</em>):
                    order.checkedCoupon?(<em>{order.checkedCoupon["couponName"]}</em>):null
                }<i className="iconfont icon-right"></i></span>
                </div>
            </div>
            {this.renderTotal(order)}
            {this.renderDialog()}
            <Alert active={alertActive}>{alertContent}</Alert>
            </div>
            </GoTop>
        )
    }
}

export default ConfirmOrder;