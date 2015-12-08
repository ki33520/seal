'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Icon from "../../../component/icon.jsx";

class StatusProgress extends Component{
    render(){
        return (
            <ul className="order-status-progress">
            <li>
                <div className="progress-item">
                <div>
                    <Icon icon="info-circled"/>
                    <p>待付款</p>
                </div>
                <div>
                <Icon icon="right-open"/>
                </div>
                </div>
            </li>
            <li>
                <div className="progress-item">
                <div>
                    <Icon icon="info-circled"/>
                    <p>待审核</p>
                </div>
                <div>
                <Icon icon="right-open"/>
                </div>
                </div>
            </li>
            <li>
                <div className="progress-item">
                <div>
                    <Icon icon="info-circled"/>
                    <p>待发货</p>
                </div>
                <div>
                <Icon icon="right-open"/>
                </div>
                </div>
            </li>
            <li>
                <div className="progress-item">
                <div>
                    <Icon icon="info-circled"/>
                    <p>待收货</p>
                </div>
                <div>
                <Icon icon="right-open"/>
                </div>
                </div>
            </li>
            <li>
                <div className="progress-item">
                <div>
                    <Icon icon="info-circled"/>
                    <p>已签收</p>
                </div>
                <div>
                <Icon icon="right-open"/>
                </div>
                </div>
            </li>
            <li>
                <div className="progress-item">
                <div>
                    <Icon icon="info-circled"/>
                    <p>已完成</p>
                </div>
                </div>
            </li>
            </ul>
        )
    }
}

export default StatusProgress;