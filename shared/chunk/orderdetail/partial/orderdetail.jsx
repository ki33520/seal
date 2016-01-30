'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import Header from "../../common/header.jsx";
import Timer from "../../common/timer.jsx";

import StatusProgress from "./statusprogress.jsx";
import OrderGoods from "./ordergoods.jsx";
import {fetchCloseOrder,fetchDeliveryOrder,fetchLogistics,fetchPayGateway} from "../action.es6";

import {alert} from "../../common/action.es6";
import Alert from "../../../component/alert.jsx";
import Dialog from "../../../component/dialog.jsx";
import {urlParam,base64EncodeForURL} from "../../../lib/util.es6";


class OrderDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            dialogActive:false,
            dialogOnConfirm:null
        }
    }
    toggleDialog(){
        this.setState({
            dialogActive:!this.state.dialogActive
        });
    }
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

        this.setState({
            dialogActive:true,
            dialogOnConfirm:()=>{
                this.toggleDialog();
                dispatch(fetchCloseOrder("/closedorder",{
                    orderNo
                }));
            }
        });
    }
    handlePayGateway(order,e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        const {orderNo} = order;
        let message = {
            orderNo:orderNo
        }
        dispatch(
            fetchPayGateway(base64EncodeForURL(urlParam(message)))
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
                cashierParam = cashierParam || {};
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
        const currentTime = moment(new Date(systemTime)).format("YYYY-MM-DD HH:mm:ss");
        const outTime = moment(new Date(timeoutTime)).format("YYYY-MM-DD HH:mm:ss");

        if(orderStatus === "STATUS_NOT_PAY" && timeoutTime){
            return (
                <span>
                    <Timer endTime={outTime} referTime={currentTime} template="<i><%= hour %></i>时<i><%= minute %></i>分<i><%= second %></i>秒"/>
                    <i>后自动取消</i>
                </span>
            )
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
                <div className="bottom-line clearfix">
                    <div className="label">商品总价：</div>
                    <div className="data"><i>&yen;</i><span>{order.salesTotalFee.toFixed(2)}</span></div>
                </div>
                <div className="bottom-line clearfix">
                    <div className="label">国内运费：</div>
                    <div className="data">{logisticsFeeBox}<i>&yen;</i><span>{order.logisticsFee.toFixed(2)}</span></div>
                </div>
                <div className="bottom-line clearfix">
                    <div className="label">国际运费：</div>
                    <div className="data">{abroadFeeBox}<i>&yen;</i><span>{order.abroadFee.toFixed(2)}</span></div>
                </div>
                <div className="bottom-line clearfix">
                    <div className="label">关税：</div>
                    <div className="data">{tariffFeeBox}<i>&yen;</i><span>{order.tariffFee.toFixed(2)}</span></div>
                </div>
                <div className="bottom-line clearfix intro">
                    <div className="label">优惠活动：</div>
                    <div className="data">-<i>&yen;</i><span>{order.promoFee.toFixed(2)}</span></div>
                </div>
                <div className="bottom-line clearfix intro">
                    <div className="label">优惠券：</div>
                    <div className="data">-<i>&yen;</i><span id="coupon_money">{order.couponFee.toFixed(2)}</span></div>
                </div>
                <div className=" bottom-line clearfix no-border">
                    <div className="label">应付金额：</div>
                    <div className="data red-w"><i>&yen;</i><span id="total_amount_money">{order.paymentFee.toFixed(2)}</span></div>
                </div>
            </div>
            {this.renderFooter()}
            <Dialog active={this.state.dialogActive} 
                onCancel={this.toggleDialog.bind(this)}
                onConfrim={this.state.dialogOnConfirm}>确定要取消订单吗?</Dialog>
            <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default OrderDetail;