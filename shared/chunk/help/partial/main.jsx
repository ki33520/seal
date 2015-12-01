'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";


class HelpMain extends Component{
    render(){
        const {helpInfo} = this.props;
        return (
            <div className="help-content">
                <Header>
                    <span className="title">帮助与反馈</span>
                </Header>
                <ul className="list">
                    <li><a href="#/normal">1.注册登陆常见问题</a></li>
                    <li><a href="#/shipment">2.运费计算</a></li>
                    <li><a href="#/tariff">3.关税计算</a></li>
                    <li><a href="#/parcel">4.包裹拆分规则</a></li>
                    <li><a href="#/onlineservice">没有解决问题？咨询在线客服</a></li>
                    <li><a href="#/feedback">意见反馈<span className="tips">(产品建议、系统问题等)</span></a></li>
                    <li>
                        <a>
                            <div className="left-col"><span className="icon-phone">400-848-9448</span></div>
                            <div className="right-col">
                                <span>客服电话</span>
                                <span>09:00-21:30</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default HelpMain;