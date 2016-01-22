'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../../common/header.jsx";

import StatusProgress from "./statusprogress.jsx";
import OrderGoods from "./ordergoods.jsx";

import {fetchCloseOrder,fetchDeliveryOrder,fetchLogistics,fetchPayGateway} from "../action.es6";
import {alert} from "../../common/action.es6";
import Alert from "../../../component/alert.jsx";
import {urlParam,base64Encode} from "../../../lib/util.es6";


function formatTime(num){
    return num >=10 ? num : '0'+ num; 
};

function MillisecondToDate(msd) {  
    var time = parseFloat(msd) /1000;
    var h = "00",
        m = "00",
        s = "00";
    if (null!= time &&""!= time){  
        if (time >60&& time <60*60) {
            m = formatTime(parseInt(time /60.0));
            s = formatTime(parseInt((parseFloat(time /60.0) - parseInt(time /60.0)) *60));
        }else if (time >=60*60&& time <60*60*24) {
            h = formatTime(parseInt(parseInt(time /3600.0)));
            m = formatTime(parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60));
            s = formatTime(parseInt((parseFloat((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60) - parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60)) *60)); 
        }else {
            s = formatTime(parseInt(time));
        }
        time = h+" : "+m+" : "+s
    }else{  
        time = "00 : 00 : 00";
    }  
    return time;
}  

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
    handleDeliveryOrder(e){
        e && e.preventDefault();
        const {dispatch,order} = this.props;
        const {orderNo} = order;
        dispatch(fetchDeliveryOrder("/deliveryorder",{
            orderNo
        }));
    }
    handleCloseOrder(e){
        e && e.preventDefault();
        const {dispatch,order} = this.props;
        const {orderNo} = order;
        dispatch(fetchCloseOrder("/closedorder",{
            orderNo
        }));
    }
    handlePayGateway(order,e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        const {orderNo,paymentFee,receiverObject,itemList} = order;
        let productList = []
        itemList.forEach((item)=>{
            productList.push({
                goodsName: item.singleTitle,
                goodsColorAndSize: item.singleProps
            });
        })
        let message = {
            orderNo:orderNo,
            totalFee:paymentFee,
            address:receiverObject.completeAddress,
            userName:receiverObject.receiverName,
            mobile:receiverObject.receiverMobile,
            productList:JSON.stringify(productList)
        }
        dispatch(
            fetchPayGateway(base64Encode(urlParam(message)))
        )
    }
    componentWillReceiveProps(nextProps){
        const {dispatch} = this.props;
        if(nextProps.closeOrderChanging === false &&
           this.props.closeOrderChanging === true){
            if(nextProps.closeOrderChanged === true){
                dispatch(alert(nextProps.msg,2000));
            }else{
                dispatch(alert(nextProps.msg,2000));
            }
        }
        
        if(nextProps.deliveryOrderChanging === false &&
           this.props.deliveryOrderChanging === true){
            if(nextProps.deliveryOrderChanged === true){
                dispatch(alert(nextProps.msg,2000));
            }else{
                dispatch(alert(nextProps.msg,2000));
            }
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.paygatewayFetched === false && this.props.paygatewayFetched === true){
            setTimeout(()=>{
                ReactDOM.findDOMNode(this.refs["submitForm"]).submit();
            },1000)
        }
    }
    renderFooter(){
        const {order} = this.props;
        const {orderStatus,orderId,itemList} = order;
        var hasComment = false;
        itemList.map((v,k)=>{
            if(v.hasComment === true){
                hasComment = true;
            }
        })
        switch(orderStatus){
            case "STATUS_NOT_PAY":
                let {cashierParam} = this.props.order;
                cashierParam = cashierParam || {}
                return (
                    <div className="confirmBtns">
                        <a href="javascript:void(null);" onClick={this.handleCloseOrder.bind(this)} className="confirm_btn confirmBorder_btn">取消订单</a>
                        <a href="javascript:void(null)" onClick={this.handlePayGateway.bind(this,order)} className="confirm_btn">立即支付</a>
                        <form action="http://cashier.e9448.com/cashier/v1/cashier" method="POST" ref="submitForm">
                            <input type="hidden" name="appId" value={cashierParam.appId} />
                            <input type="hidden" name="channel" value={cashierParam.channel} />
                            <input type="hidden" name="openId" value={cashierParam.openId} />
                            <input type="hidden" name="terminalType" value={cashierParam.terminalType} />
                            <input type="hidden" name="message" value={cashierParam.message} />
                            <input type="hidden" name="t" value={cashierParam.t} />
                            <input type="hidden" name="h" value={cashierParam.h} />
                        </form>
                    </div>
                )
                return (
                    <div className="confirmBtns">
                        <a href="javascript:void(null);" onClick={this.handleCloseOrder.bind(this)} className="confirm_btn confirmBorder_btn">取消订单</a>
                        <a href="javascript:void(null);" className="confirm_btn">立即支付</a>
                    </div>
                )
            case "STATUS_OUT_HOUSE":
                return (
                    <div className="confirmBtns">
                        <a href={"/orderdetail/"+orderId+"#/logistics"} className="confirm_btn confirmBorder_btn">查看物流</a>
                        <a href="javascript:void(null);" onClick={this.handleDeliveryOrder.bind(this)} className="confirm_btn">确认收货</a>
                    </div>
                )
            case "STATUS_FINISHED":
                if(hasComment){
                    return null
                }else{
                    return (
                        <div className="confirmBtns">
                            <a href={"/orderdetail/"+orderId+"#/comment"} className="confirm_btn confirmBorder_btn">评价晒单</a>
                        </div>
                    )
                }
            default:
                return null
        }
    }
    renderOutTime(){
        const {order,systemTime} = this.props;
        const {orderCrtTime,timeoutTime,orderStatus} = order;
        var outTime = (new Date(timeoutTime).getTime() - systemTime);
        var outTimeTag = MillisecondToDate(outTime);
        if(orderStatus === "STATUS_NOT_PAY" && outTime>0){
            return <span>{outTimeTag}&nbsp;后自动取消</span>
        }
        if(orderStatus === "STATUS_CANCELED"){
            return <span>订单已取消</span>
        }
    }
    render(){
        const {order,alertActive,alertContent} = this.props;
        var logisticsFeeBox = order.logisticsFee === 0 ? <div className="red-box">包邮</div> : null;
        var abroadFeeBox = order.abroadFee === 0 ? <div className="red-box">包邮</div> : null;
        var tariffFeeBox = order.tariffFee === 0 ? <div className="red-box">免税</div> : null;
        return (
            <div className="order-detail-content">
            <Header>订单详情</Header>
            <div className="orderSpeed">
                <div className="orderNum"><i>订单编号:</i><span>{order.orderNo}</span></div>
                <StatusProgress {...order}/>
                {this.renderOutTime()}
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
            <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default OrderDetail;