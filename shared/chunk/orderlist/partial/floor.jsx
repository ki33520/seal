'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Image from "../../../component/image.jsx";
import Icon from "../../../component/icon.jsx";
import moment from "moment";

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
    renderButtons(child){
        const {orderStatus} = child;
        switch(orderStatus){
            case "STATUS_NOT_PAY":
                return (
                    <div className="order-buttons">
                        <a href="javascript:void(null)" className="pop_c">去支付</a>
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
                        <a href="javascript:void(null)" className="pop_c">查看物流</a>
                        <a href="javascript:void(null)" className="view_c">确认收货</a>
                    </div>
                )
            case "STATUS_SENDED":
                return (
                    <div className="order-buttons">
                        <a href="javascript:void(null)" className="pop_c">查看物流</a>
                        <a href="javascript:void(null)" className="view_c">确认收货</a>
                    </div>
                )
            case "STATUS_CANCELED":
                return (
                    <div className="order-buttons">
                        <a href="javascript:void(null)" className="pop_c">再次购买</a>
                    </div>
                )
            case "STATUS_FINISHED":
                return (
                    <div className="order-buttons">
                        <a href="javascript:void(null)" className="pop_c">再次购买</a>
                        <a href="javascript:void(null)" className="view_c">评价晒单</a>
                    </div>
                )
            default:
                return (
                    <div className="order-buttons">
                    </div>
                )
        }
    }
    renderGoods(itemList){
        if(itemList.length > 1){
            itemList = itemList.map((good,i)=>{
                return (
                    <div className="clearfix" key={i}>
                        <span className="img_wrap J_ytag cartlist">
                        <Image placeholder={good.singleImageUrl} />
                        </span>
                        <div className="gd_info">
                            <p className="name">{good.singleTitle}</p>
                            <p className="value">&yen;{good.salesTotalFee}</p>
                        </div>
                    </div>
                )
            })
            return (
                <div className="J_moveRight">
                    {itemList}
                </div>
            )
        }
        let good = itemList[0];
        return (
            <div className="J_moveRight">
                <div className="clearfix">
                    <span className="img_wrap J_ytag cartlist">
                        <Image placeholder={good.singleImageUrl} />
                    </span>
                    <div className="gd_info">
                        <p className="name">{good.singleTitle}</p>
                        <p className="value">&yen;{good.salesTotalFee}</p>
                    </div>
                </div>
            </div>
        )
    }
    renderOutTime(child){
        const {orderCrtTime,timeoutTime,orderStatus} = child;
        var outTime = (new Date(timeoutTime).getTime() - new Date().getTime());
        var outTimeTag = MillisecondToDate(outTime);
        if(orderStatus === "STATUS_NOT_PAY" && outTime>0){
            return <i>{outTimeTag}&nbsp;后自动取消</i>
        }
    }
    renderNode(list){
        return list.map((child,i)=>{
            const {orderCrtTime,id,orderReceiveId,orderNo,itemList,totalFee,orderStatus,timeoutTime} = child;
            var crtTime = moment(new Date(orderCrtTime)).format("YYYY-MM-DD");
            return (
                <div className="order-box" key={i}>
                    <div className="order-up">
                        <span>{crtTime}</span>
                        <i>{orderNo}</i>
                        <div className="right">
                            {this.renderOutTime(child)}
                            <em>{orderStatusObj[orderStatus]}</em>
                        </div>
                    </div>
                    <div className="order-list"><a href={"/orderdetail/"+orderNo}>{this.renderGoods(itemList)}</a></div>
                    <div className="order-down">
                        <span>合计：<em>&yen;{totalFee}</em></span>
                        {this.renderButtons(child)}
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