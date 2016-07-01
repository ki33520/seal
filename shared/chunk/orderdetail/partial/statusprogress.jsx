'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Icon from "../../../component/icon.jsx";

const orderStatusObj = {
    "STATUS_NOT_PAY":"待付款",
    "STATUS_WAIT_CONFIRM":"待审核",
    "STATUS_CONFIRMED":"待发货",
    "STATUS_OUT_HOUSE":"待收货",
    "STATUS_SENDED":"已签收",
    "STATUS_FINISHED":"已完成",
    "STATUS_CANCELED":"已取消"
};

class StatusProgress extends Component{
    render(){
        const {orderStatusArr,orderStatus,renderOutTime,orderNo} =  this.props;
        let imgUrl;
        let rateText = [];
        rateText = orderStatusArr.map((v,k)=>{
            if(orderStatus !== "STATUS_PICKING" && v.text === "配货中"){
                return null;
            }
            if(v.active === true){
                imgUrl = "/client/asset/images/orderRate_0"+(k+1)+".gif";
                return <span key={k}>{v.text}</span>;
            }else{
                if(orderStatus === "STATUS_CANCELED"){
                    if(k===0){
                        return <span key={k}>{v.text}</span>;
                    }else if(k===1){
                        return <span key={k}>已取消</span>;
                    }else{
                        return <span key={k}></span>;
                    }
                }else{
                    return <span key={k} className="notTo">{v.text}</span>;
                }
            }
        });
        if(orderStatus === "STATUS_CANCELED"){
            imgUrl = "/client/asset/images/orderRate_cancel.gif";
        }
        let rateClass = classNames({
            "rate": true,
            "rate-l": orderStatus === "STATUS_PICKING"
        })
        return (
            <div className="orderSpeed">
                <div className="orderNum"><i>订单编号:</i><span>{orderNo}</span></div>
                <div className={rateClass}>
                    <img src={imgUrl} />
                    <div className="rateText">
                        {rateText}
                    </div>
                </div>
                {renderOutTime()}
            </div>
        )
    }
}

export default StatusProgress;