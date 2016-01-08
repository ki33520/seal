'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Icon from "../../component/icon.jsx";
import classNames from "classnames";
import {Tabs,TabsItem} from "../../component/tabs.jsx";

class FlashBuy extends Component{
    renderGoods(){
        const {groupGoods} = this.props.flashBuy
        if(groupGoods){
            return groupGoods.map((good,i)=>{
                return (
                    <a href="/gooddetail/1" className="clearfix" key={i}>
                        <img src={good.imageUrl} />
                        <div className="right">
                            <span className="name">{good.title}</span>
                            <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                            <span className="nowPrice">&yen;{good.salePrice}</span>
                            <span className="oldPrice">&yen;{good.originPrice}</span>
                        </div>
                    </a>
                )
            })
        }
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
                <div className="flashBuy">{this.renderGoods()}</div>
            </div>
            <div className="willFlash">
                <div className="willFlash_title">
                    <img src="/client/asset/images/willFlash.png" />
                </div>
                <div className="willFlash_con">
                    <div className="willFlash_time">开售时间<em>12:00</em></div>
                    <div className="flashBuy">{this.renderGoods()}</div>
                    <div className="willFlash_time">开售时间<em>12:30</em></div>
                    <div className="flashBuy">{this.renderGoods()}</div>
                    <div className="willFlash_line"></div>
                </div>
            </div>
            </div>
        )
    }
}

export default FlashBuy;