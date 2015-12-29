'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Icon from "../../../component/icon.jsx";

class StatusProgress extends Component{
    render(){
        return (
            <div className="rate">
                <img src="/client/asset/images/orderRate_01.gif" />
                <div className="rateText">
                    <span>待付款</span>
                    <span className="notTo">待发货</span>
                    <span className="notTo">待收货</span>
                    <span className="notTo">已完成</span>
                </div>
            </div>
        )
    }
}

export default StatusProgress;