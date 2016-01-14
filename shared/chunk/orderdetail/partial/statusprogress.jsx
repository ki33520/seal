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
        const {orderStatusArr,orderStatus} =  this.props;
        if(orderStatus === "STATUS_CANCELED"){
            return null;
        }else{
            let imgUrl;
            orderStatusArr.map((v,k)=>{
                if(v.active === true){
                    imgUrl = "/client/asset/images/orderRate_0"+(k+1)+".gif";
                }
            })
            return (
                <div className="rate">
                    <img src={imgUrl} />
                    <div className="rateText">
                        {
                            orderStatusArr.map((v,k)=>{
                                if(v.active === true){
                                    return <span key={k}>{v.text}</span>
                                }else{
                                    return <span key={k} className="notTo">{v.text}</span>
                                }
                            })
                        }
                    </div>
                </div>
            )
        }
    }
}

export default StatusProgress;