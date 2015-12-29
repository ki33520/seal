'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import StatusProgress from "./statusprogress.jsx";

import {fetchLogistics} from "../action.es6";

class Logistics extends Component{
    componentDidMount(){
        const {dispatch,order} = this.props;
        dispatch(fetchLogistics("/logistics",{
            orderno:order.orderNo
        }))
    }
    renderTrace(){
        return (
            <div className="logistics-traces">
                <div className="logistics-trace active">
                    <div className="logistics-trace-status">
                        <span><em></em></span>
                    </div>
                    <div className="logistics-trace-desc">
                        <p>您已签收本次订单包裹，本次配送完成。感谢您在特品汇购物，祝您生活愉快！</p>
                        <p>2015-02-26 18:24:39</p>
                    </div>
                </div>
                <div className="logistics-trace active">
                    <div className="logistics-trace-status">
                        <span><em></em></span>
                    </div>
                    <div className="logistics-trace-desc">
                        <p>您已签收本次订单包裹，本次配送完成。感谢您在特品汇购物，祝您生活愉快！</p>
                        <p>2015-02-26 18:24:39</p>
                    </div>
                </div>
            </div>
        )
    }
    render(){
        const {order} = this.props;
        return (
            <div className="order-detail-content logistics-content">
                <Header title="物流详情"/>
                <div className="order-status">
                <p>订单编号:<em>{order.orderNo}</em></p>
                <StatusProgress {...this.props.order}/>
                </div>
                <div className="order-brief">
                    <h3>物流详情</h3>
                    <p>物流公司:<em>{order.createdAt}</em></p>
                    <p>运单号码:<em>{order.status}</em></p>
                </div>
                <div className="order-goods">
                    <h3>物流追踪</h3>
                    {this.renderTrace()}
                </div>
            </div>
        )
    }
}

export default Logistics;