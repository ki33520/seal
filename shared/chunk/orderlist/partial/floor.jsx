'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import classNames from "classnames";
import dom from "../../../lib/dom.es6";
import Image from "../../../component/image.jsx";
import Icon from "../../../component/icon.jsx";
import moment from "moment";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
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
    toggleDialog(){
        this.setState({
            dialogActive:!this.state.dialogActive
        });
    }
    formatPrice(price){
        var _price = Number(price).toFixed(2).split('.');
        return <span><i className="price_a">{_price[0]}</i><i className="price_dot">.</i><i className="price_b">{_price[1]}</i></span>
    }
    handleDeliveryOrder(child,i,e){
        e && e.preventDefault();
        const {dispatch,confirmDialog} = this.props;
        const {orderNo} = child;
        confirmDialog.call(this,orderNo,i);
    }
    handlePayGateway(child,e){
        e && e.preventDefault();
        const {fetchPayGateway} = this.props;
        const {orderNo} = child;
        let message = {
            orderNo:orderNo
        }
        fetchPayGateway(base64EncodeForURL(urlParam(message)));
    }
    renderButtons(child,i){
        const {orderStatus,orderId,itemList} = child;
        var hasNotComment = _.filter(itemList, function(o){ return !o.hasComment;});
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
                        <a href="javascript:void(null)" onClick={this.handleDeliveryOrder.bind(this,child,i)} className="pop_c">确认收货</a>
                        <a href={"/orderdetail/"+orderId+"#/logistics"} className="view_c">查看物流</a>
                    </div>
                )
            case "STATUS_SENDED":
                return (
                    <div className="order-buttons">
                        <a href="javascript:void(null)" onClick={this.handleDeliveryOrder.bind(this,child,i)} className="pop_c">确认收货</a>
                        <a href={"/orderdetail/"+orderId+"#/logistics"} className="view_c">查看物流</a>
                    </div>
                )
            case "STATUS_CANCELED":
                return (
                    <div className="order-buttons">
                    </div>
                )
            case "STATUS_FINISHED":
                if(hasNotComment.length>0){
                    return (
                        <div className="order-buttons">
                            <a href={"/orderdetail/"+orderId+"#/comment"} className="view_c">评价晒单</a>
                        </div>
                    )
                }else{
                    return null
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
        var tabItems = itemList.map((good,i)=>{
            return (
                <SlideTabsItem key={i} navigator={()=><span className="img_wrap J_ytag cartlist"><Image placeholder={good.singleImageUrl} /></span>} className="listMain">
                </SlideTabsItem>
            )
        });
        if(itemList.length>1){
            content = (
                <div className="clearfix slide-img-block">
                    <SlideTabs ref="imgslide" axis="x" activeIndex={0} navbarSlidable={itemList.length>4} >
                        {tabItems}
                    </SlideTabs>
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
                            <p className="value">&yen;{this.formatPrice(salesPrice)}</p>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className="J_moveRight">{content}</div>
        );
    }
    timeOut(child){
        const {changeOrder} = this.props;
        if(child.orderStatus === "STATUS_NOT_PAY"){
            setTimeout(()=>{
                changeOrder(child,"STATUS_CANCELED");
            },200);
        }
    }
    renderOutTime(child){
        const {systemTime} = this.props.ordersByParam;
        const {createdAt,timeoutTime,orderStatus} = child;
        const currentTime = moment(new Date(systemTime-1000*60*60*1));
        const outTime = moment(new Date(timeoutTime));
        if(orderStatus === "STATUS_NOT_PAY" && outTime){
            return (
                <i>
                    <Timer onTimerExpire={this.timeOut.bind(this,child)} endTime={outTime} referTime={currentTime} template="<i><%= hour %></i>:<i><%= minute %></i>:<i><%= second %></i>"/>
                    <span>后自动取消</span>
                </i>
            )
        }
    }
    renderNode(list){
        const {orderIndex} = this.props;
        if(list.length>0){
            return list.map((child,i)=>{
                const {createdAt,id,orderReceiveId,orderId,itemList,paymentFee,salesTotalFee,orderStatus,timeoutTime} = child;
                const paymentFeeTotal = paymentFee !== undefined ? paymentFee : 0;
                const crtTime = moment(new Date(createdAt)).format("YYYY-MM-DD HH:mm:ss");
                const classes = classNames({
                    green: orderStatus === "STATUS_FINISHED"
                });
                return (
                    <div className="order-box" key={i}>
                        <div className="order-up">
                            <span>{crtTime}</span>
                            <div className="right">
                                {this.renderOutTime(child)}
                                <em className={classes}>{orderStatusObj[orderStatus]}</em>
                            </div>
                        </div>
                        <div className="order-list"><a href={"/orderdetail/"+orderId+"?back="+orderIndex}>{this.renderGoods(itemList)}</a></div>
                        <div className="order-down">
                            <span>合计：<em>&yen;{this.formatPrice(paymentFeeTotal)}</em></span>
                            {this.renderButtons(child,i)}
                        </div>
                    </div>
                )
            });
        }
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
        const {orderIndex} = this.props;
        const {orders} = this.props.ordersByParam;
        const orderItem = orders[orderIndex];
        return (
            <div className={`order-content order-content-${orderIndex}`}>
                {orderItem && orderItem.list && this.renderNode(orderItem.list)}
            </div>
        )
    }
}

export default Floor;