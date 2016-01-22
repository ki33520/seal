'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Image from "../../../component/image.jsx";
import Icon from "../../../component/icon.jsx";
import moment from "moment";
import {fetchDeliveryOrder,fetchPayGateway} from "../action.es6";
import {urlParam,base64Encode} from "../../../lib/util.es6";

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
        const {orderNo,totalFee,checkedReceiver,itemList} = child;
        let productList = []
        itemList.forEach((item)=>{
            productList.push({
                goodsName: item.singleTitle,
                goodsColorAndSize: item.singleProps
            });
        })
        let message = {
            orderNo:orderNo,
            totalFee:totalFee,
            address:"北京市辖区东城区平安大道1号",
            userName:"王朗",
            mobile:"13112341234",
            productList:productList
        }
        dispatch(
            fetchPayGateway(base64Encode(urlParam(message)))
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
                let {cashierParam} = this.props;
                cashierParam = cashierParam || {}
                return (
                    <div className="order-buttons">
                        <a href="javascript:void(null)" onClick={this.handlePayGateway.bind(this,child)} className="pop_c">去支付</a>
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
        return list.map((child,i)=>{
            const {createdAt,id,orderReceiveId,orderId,itemList,salesTotalFee,orderStatus,timeoutTime} = child;
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
                        <span>合计：<em>&yen;{salesTotalFee}</em></span>
                        {this.renderButtons(child,i)}
                    </div>
                </div>
            )
        });
    }
    render(){
        const {orderItem} = this.props;
        return (
            <div className="order-content">
                {orderItem && orderItem.list && this.renderNode(orderItem.list)}
            </div>
        )
    }
}

export default Floor;