'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Image from "../../../component/image.jsx";
import Icon from "../../../component/icon.jsx";
import moment from "moment";
import {fetchDeliveryOrder,fetchPayGateway} from "../action.es6";
import {urlParam,base64EncodeForURL} from "../../../lib/util.es6";

const orderStatusObj = {
    "STATUS_NOT_PAY":"待付款",
    "STATUS_WAIT_CONFIRM":"待审核",
    "STATUS_CONFIRMED":"待发货",
    "STATUS_OUT_HOUSE":"待收货",
    "STATUS_SENDED":"已签收",
    "STATUS_FINISHED":"已完成",
    "STATUS_CANCELED":"已取消"
};

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

class Floor extends Component{
    constructor(props){
        super(props);
    }
    handleDeliveryOrder(child,i,e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        const {orderNo} = child;
        dispatch(fetchDeliveryOrder("/deliveryorder",{
            orderNo,
            index: i
        }));
    }
    handlePayGateway(child,e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        const {orderNo} = child;
        let message = {
            orderNo:orderNo
        }
        dispatch(
            fetchPayGateway(base64EncodeForURL(urlParam(message)))
        )
    }
    renderButtons(child,i){
        const {orderStatus,orderId,itemList} = child;
        var hasComment = false;
        itemList.map((v,k)=>{
            if(v.hasComment === true){
                hasComment = true;
            }
        })
        switch(orderStatus){
            case "STATUS_NOT_PAY":
                return (
                    <div className="order-buttons">
                        <a href="javascript:void(null)" onClick={this.handlePayGateway.bind(this,child)} className="pop_c">去支付</a>
                    </div>
                )
            case "STATUS_CONFIRMED":
                return (
                    <div className="order-buttons">
                    </div>
                )
            case "STATUS_OUT_HOUSE":
                return (
                    <div className="order-buttons">
                        <a href="javascript:void(null)" onClick={this.handleDeliveryOrder.bind(this,child)} className="pop_c">确认收货</a>
                        <a href={"/orderdetail/"+orderId+"#/logistics"} className="view_c">查看物流</a>
                    </div>
                )
            case "STATUS_SENDED":
                return (
                    <div className="order-buttons">
                        <a href="javascript:void(null)" className="pop_c">确认收货</a>
                        <a href={"/orderdetail/"+orderId+"#/logistics"} className="view_c">查看物流</a>
                    </div>
                )
            case "STATUS_CANCELED":
                return (
                    <div className="order-buttons">
                    </div>
                )
            case "STATUS_FINISHED":
                if(hasComment){
                    return null
                }else{
                    return (
                        <div className="order-buttons">
                            <a href={"/orderdetail/"+orderId+"#/comment"} className="view_c">评价晒单</a>
                        </div>
                    )
                }
            default:
                return (
                    <div className="order-buttons">
                    </div>
                )
        }
    }
    renderGoods(itemList){
            return (
                <div className="J_moveRight">
                    {
                        itemList.map((good,i)=>{
                            return (
                                <div className="clearfix" key={i}>
                                    <span className="img_wrap J_ytag cartlist">
                                    <Image placeholder={good.singleImageUrl} />
                                    </span>
                                    <div className="gd_info">
                                        <p className="name">{good.singleTitle}</p>
                                        <p className="value">&yen;{good.salesPrice}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            );
    }
    renderOutTime(child){
        const {systemTime} = this.props;
        const {createdAt,timeoutTime,orderStatus} = child;
        var outTime = (new Date(timeoutTime).getTime() - systemTime);
        var outTimeTag = MillisecondToDate(outTime);
        if(orderStatus === "STATUS_NOT_PAY" && outTime>0){
            return <i>{outTimeTag}&nbsp;后自动取消</i>
        }
    }
    renderNode(list){
        if(list.length>0){
            return list.map((child,i)=>{
                const {createdAt,id,orderReceiveId,orderId,itemList,paymentFee,salesTotalFee,orderStatus,timeoutTime} = child;
                var crtTime = moment(new Date(createdAt)).format("YYYY-MM-DD");
                return (
                    <div className="order-box" key={i}>
                        <div className="order-up">
                            <span>{crtTime}</span>
                            <div className="right">
                                {this.renderOutTime(child)}
                                <em>{orderStatusObj[orderStatus]}</em>
                            </div>
                        </div>
                        <div className="order-list"><a href={"/orderdetail/"+orderId}>{this.renderGoods(itemList)}</a></div>
                        <div className="order-down">
                            <span>合计：<em>&yen;{paymentFee}</em></span>
                            {this.renderButtons(child,i)}
                        </div>
                    </div>
                )
            });
        }
        const {orderIndex} = this.props;
        var context = (function(){
            switch(orderIndex){
                case 1:
                    return "您目前还没有待付款的订单哟~";
                case 2:
                    return "您目前还没有待发货的订单哟~";
                case 3:
                    return "您目前还没有待收货的订单哟~";
                case 4:
                    return "您目前还没有待评价的订单哟~";
                default:
                    return "您目前还没有可查询的订单哟~";
            }
        })();
        return (
            <div className="empty-result">
                <h3>{context}</h3>
            </div>
        )
    }
    render(){
        const {orders,orderIndex} = this.props;
        const orderItem = orders[orderIndex];
        return (
            <div className={`order-content order-content-${orderIndex}`}>
                {orderItem && orderItem.list && this.renderNode(orderItem.list)}
            </div>
        )
    }
}

export default Floor;