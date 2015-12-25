'use strict';

import React,{Component} from "react";
import Image from "../../../component/image.jsx";
import Icon from "../../../component/icon.jsx";
import moment from "moment";

const orderStatus = {
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
    renderGoods(goods){
        if(goods.length > 1){
            goods = goods.map((good,i)=>{
                return (
                    <span className="img_wrap J_ytag cartlist" key={i}>
                    <image src={good.imageUrl} key={i}/>
                    </span>
                )
            })
            return (
                <div className="J_moveRight">
                    <div className="clearfix">{goods}</div>
                </div>
            )
        }
        let good = goods[0];
        return (
            <div className="J_moveRight">
                <div className="clearfix">
                    <span className="img_wrap J_ytag cartlist">
                        <Image src={good.imageUrl} />
                    </span>
                    <div className="gd_info">
                        <p className="name">{good.title}</p>
                        <p className="value">&yen;{good.salePrice}</p>
                    </div>
                </div>
            </div>
        )
    }
    render(){
        const {createdAt,id,orderNo,goods,finalFee,status} = this.props;
        return (
            <div className="order-box">
                <div className="order-up">
                    <span>{moment(createdAt).format("YYYY-MM-DD")}</span>
                    <div className="right">
                        <i>01:15:47&nbsp;后自动取消</i>
                        <em>{orderStatus[status]}</em>
                    </div>
                </div>
                <div className="order-list"><a href={"/orderdetail/"+id}>{this.renderGoods(goods)}</a></div>
                <div className="order-down">
                    <span>合计：<em>&yen;{finalFee}</em></span>
                    {this.renderButtons()}
                </div>
            </div>
        )
    }
}

export default OrderItem;