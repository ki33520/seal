'use strict';

import React,{Component} from "react";
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

class OrderItem extends Component{
    renderButtons(){
        return (
            <div className="order-buttons">
            <a href="#" className="pop_c">去支付</a>
            <a href="#" className="view_c">去支付</a>
            </div>
        )
    }
    renderGoods(itemList){
        if(itemList.length > 1){
            itemList = itemList.map((good,i)=>{
                return (
                    <span className="img_wrap J_ytag cartlist" key={i}>
                    <image src={good.singleImageUrl} key={i}/>
                    </span>
                )
            })
            return (
                <div className="J_moveRight">
                    <div className="clearfix">{itemList}</div>
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
    render(){
        const {orderCrtTime,id,orderNo,itemList,totalFee,orderStatus} = this.props;
        return (
            <div className="order-box">
                <div className="order-up">
                    <span>{moment(orderCrtTime).format("YYYY-MM-DD")}</span>
                    <div className="right">
                        <i>01:15:47&nbsp;后自动取消</i>
                        <em>{orderStatusObj[orderStatus]}</em>
                    </div>
                </div>
                <div className="order-list"><a href={"/orderdetail/"+id}>{this.renderGoods(itemList)}</a></div>
                <div className="order-down">
                    <span>合计：<em>&yen;{totalFee}</em></span>
                    {this.renderButtons()}
                </div>
            </div>
        )
    }
}

export default OrderItem;