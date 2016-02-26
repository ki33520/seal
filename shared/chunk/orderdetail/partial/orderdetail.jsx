'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import Header from "../../common/header.jsx";
import Timer from "../../common/timer.jsx";

import StatusProgress from "./statusprogress.jsx";
import OrderGoods from "./ordergoods.jsx";
import {fetchCloseOrder,fetchDeliveryOrder,fetchLogistics,fetchPayGateway} from "../action.es6";

import Dialog from "../../../component/dialog.jsx";
import {urlParam,base64EncodeForURL} from "../../../lib/util.es6";
import Alert from "../../../component/alert.jsx";


class OrderDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            dialogActive:false,
            dialogContent: "确定要取消订单吗?",
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
        const {fetchDeliveryOrder} = this.props;
        const {order} = this.props.orderByParam;
        const {orderNo} = order;
        this.setState({
            dialogActive:true,
            dialogContent: "确定已收货吗?",
            dialogOnConfirm:()=>{
                this.toggleDialog();
                fetchDeliveryOrder("/deliveryorder",{
                    orderNo
                });
            }
        });
    }
    handleCloseOrder(e){
        e && e.preventDefault();
        const {fetchCloseOrder} = this.props;
        const {order} = this.props.orderByParam;
        const {orderNo} = order;
        this.setState({
            dialogActive:true,
            dialogContent: "确定要取消订单吗?",
            dialogOnConfirm:()=>{
                this.toggleDialog();
                fetchCloseOrder("/closedorder",{
                    orderNo
                });
            }
        });
    }
    handlePayGateway(e){
        e && e.preventDefault();
        const {fetchPayGateway} = this.props;
        const {order} = this.props.orderByParam;
        const {orderNo} = order;
        let message = {
            orderNo:orderNo
        }
        fetchPayGateway(base64EncodeForURL(urlParam(message)));
        
    }
    componentWillReceiveProps(nextProps){
        const {alert} = this.props;
        if(nextProps.orderByParam.closeOrderChanging === false &&
           this.props.orderByParam.closeOrderChanging === true){
            if(nextProps.orderByParam.closeOrderChanged === true){
                alert(nextProps.orderByParam.msg,2000);
            }else{
                alert(nextProps.orderByParam.msg,2000);
            }
        }
        
        if(nextProps.orderByParam.deliveryOrderChanging === false &&
           this.props.orderByParam.deliveryOrderChanging === true){
            if(nextProps.orderByParam.deliveryOrderChanged === true){
                alert(nextProps.orderByParam.msg,2000);
            }else{
                alert(nextProps.orderByParam.msg,2000);
            }
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.orderByParam.paygatewayFetched === false && this.props.orderByParam.paygatewayFetched === true){
            setTimeout(()=>{
                ReactDOM.findDOMNode(this.refs["submitForm"]).submit();
            },1000)
        }
    }
    renderFooter(){
        const {order} = this.props.orderByParam;
        const {orderStatus,orderId,itemList} = order;
        var hasComment = false;
        itemList.map((v,k)=>{
            if(v.hasComment === true){
                hasComment = true;
            }
        })
        switch(orderStatus){
            case "STATUS_NOT_PAY":
                let {cashierParam} = order;
                cashierParam = cashierParam || {};
                return (
                    <div className="confirmBtns">
                        <a href="javascript:void(null);" onClick={this.handleCloseOrder.bind(this)} className="confirm_btn confirmBorder_btn">取消订单</a>
                        <a href="javascript:void(null)" onClick={this.handlePayGateway.bind(this)} className="confirm_btn">立即支付</a>
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
        const {order,systemTime} = this.props.orderByParam;
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
    }
    renderCountbox(){
        const {order,systemTime} = this.props.orderByParam;
        const {orderCrtTime,timeoutTime,orderStatus} = order;
        var logisticsFeeBox = order.logisticsFee === 0 ? <div className="red-box">包邮</div> : null;
        var abroadFeeBox = order.abroadFee === 0 ? <div className="red-box">包邮</div> : null;
        var tariffFeeBox = order.tariffFee === 0 ? <div className="red-box">免税</div> : null;
        var paymentTitle = order.orderStatus === "STATUS_NOT_PAY" || order.orderStatus === "STATUS_CANCELED" ? "应付金额：" : "实付金额：";
        if(orderStatus === "STATUS_CANCELED"){
            return null;
        }else{
            return (
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
                        <div className="data"><i>&yen;</i><span>{order.abroadFee.toFixed(2)}</span></div>
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
                        <div className="label">{paymentTitle}</div>
                        <div className="data red-w"><i>&yen;</i><span id="total_amount_money">{order.paymentFee.toFixed(2)}</span></div>
                    </div>
                </div>
            );
        }
        
    }
    render(){
        const {order,alertActive,alertContent} = this.props.orderByParam;
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
                <OrderGoods {...order}/>
            </div>
            {this.renderCountbox()}
            {this.renderFooter()}
            <Dialog active={this.state.dialogActive} 
                onCancel={this.toggleDialog.bind(this)}
                onConfrim={this.state.dialogOnConfirm}>{this.state.dialogContent}</Dialog>
            <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default OrderDetail;