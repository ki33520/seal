'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Icon from "../../component/icon.jsx";
import classNames from "classnames";
import {Tabs,TabsItem} from "../../component/tabs.jsx";

class FlashBuy extends Component{
    renderGoods(){
        return (
            <div className="flashBuy">
                <a href="/gooddetail/1" className="clearfix">
                    <img src="/client/asset/images/pic8.gif" />
                    <div className="right">
                        <span className="name">荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（...</span>
                        <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                        <span className="nowPrice">&yen;99.0</span>
                        <span className="oldPrice">&yen;199.0</span>
                    </div>
                </a>
                <a href="/gooddetail/1" className="clearfix">
                    <img src="/client/asset/images/pic8.gif" />
                    <div className="right">
                        <span className="name">荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（...</span>
                        <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                        <span className="nowPrice">&yen;99.0</span>
                        <span className="oldPrice">&yen;199.0</span>
                    </div>
                </a>
                <a href="/gooddetail/1" className="clearfix">
                    <img src="/client/asset/images/pic8.gif" />
                    <div className="right">
                        <span className="name">荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（...</span>
                        <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                        <span className="nowPrice">&yen;99.0</span>
                        <span className="oldPrice">&yen;199.0</span>
                    </div>
                </a>
            </div>
        )
    }
    render(){
        return (
            <div className="flashbuy-content">
            <Header>闪购</Header>
            <div className="flashList">
                <div className="flashList_title">
                    <span>距本期闪购结束</span>
                    <div className="titleBorder"></div>
                    <p><em>14</em>时<em>14</em>分<em>14</em>秒</p>
                </div>
                {this.renderGoods()}
            </div>
            <div className="willFlash">
                <div className="willFlash_title">
                    <img src="/client/asset/images/willFlash.png" />
                </div>
                <div className="willFlash_con">
                    <div className="willFlash_time">开售时间<em>12:00</em></div>
                    {this.renderGoods()}
                    <div className="willFlash_time">开售时间<em>12:30</em></div>
                    {this.renderGoods()}
                    <div className="willFlash_line"></div>
                </div>
            </div>
            </div>
        )
    }
}

export default FlashBuy;