'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Image from "../../../component/image.jsx";
import Icon from "../../../component/icon.jsx";
import moment from "moment";
import {fetchDeliveryOrder,fetchPayGateway} from "../action.es6";
import {urlParam,base64EncodeForURL} from "../../../lib/util.es6";
import Timer from "../../common/timer.jsx";

const orderStatusObj = {
    "STATUS_NOT_PAY":"待付款",
    "STATUS_WAIT_CONFIRM":"待审核",
    "STATUS_CONFIRMED":"待发货",
    "STATUS_OUT_HOUSE":"待收货",
    "STATUS_SENDED":"已签收",
    "STATUS_FINISHED":"已完成",
    "STATUS_CANCELED":"已取消"
};

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
        var content;
        if(itemList.length>1){
            content = (
                <div className="clearfix">
                    <div className="slide-img-wrap">
                        {
                            itemList.map((good,i)=>{
                                return (
                                    <span key={i} className="img_wrap J_ytag cartlist">
                                    <Image placeholder={good.singleImageUrl} />
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }else{
            content = itemList.map((good,i)=>{
                const salesPrice = good.salesPrice !== undefined ? good.salesPrice : 0;
                return (
                    <div className="clearfix" key={i}>
                        <span className="img_wrap J_ytag cartlist">
                        <Image placeholder={good.singleImageUrl} />
                        </span>
                        <div className="gd_info">
                            <p className="name">{good.singleTitle}</p>
                            <p className="value">&yen;{salesPrice.toFixed(2)}</p>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className="J_moveRight">{content}</div>
        );
    }
    renderOutTime(child){
        const {systemTime} = this.props;
        const {createdAt,timeoutTime,orderStatus} = child;
        const currentTime = moment(new Date(systemTime)).format("YYYY-MM-DD HH:mm:ss");
        const outTime = moment(new Date(timeoutTime)).format("YYYY-MM-DD HH:mm:ss");
        if(orderStatus === "STATUS_NOT_PAY" && outTime){
            return (
                <i>
                    <Timer endTime={outTime} referTime={currentTime} template="<i><%= hour %></i>时<i><%= minute %></i>分<i><%= second %></i>秒"/>
                    <span>后自动取消</span>
                </i>
            )
        }
    }
    renderNode(list){
        if(list.length>0){
            return list.map((child,i)=>{
                const {createdAt,id,orderReceiveId,orderId,itemList,paymentFee,salesTotalFee,orderStatus,timeoutTime} = child;
                const salesTotal = salesTotalFee !== undefined ? salesTotalFee : 0;
                const crtTime = moment(new Date(createdAt)).format("YYYY-MM-DD");
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
                            <span>合计：<em>&yen;{salesTotal.toFixed(2)}</em></span>
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