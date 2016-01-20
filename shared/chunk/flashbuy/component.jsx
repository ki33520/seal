'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Icon from "../../component/icon.jsx";
import classNames from "classnames";
import {Tabs,TabsItem} from "../../component/tabs.jsx";
var moment = require("moment");

class FlashBuy extends Component{
    renderGoods(groupGoods){
        if(groupGoods.length > 0){
            return groupGoods.map((good,i)=>{
                return (
                    <a href={"/gooddetail/"+good.singleCode} className="clearfix" key={i}>
                        <img src={good.imageUrl} />
                        <div className="right">
                            <span className="name">{good.title}</span>
                            <span className="country"><i><img src={good.flag} alt="" /></i>{good.sourceName}</span>
                            <span className="nowPrice">&yen;{good.salePrice}</span>
                            <span className="oldPrice">&yen;{good.originPrice}</span>
                        </div>
                    </a>
                )
            })
        }
        return null
    }
    renderFlashing(){
        const {flashGoods} = this.props.flashBuy.groupGoods;
        if(flashGoods.length > 0){
            return flashGoods.map((goods,i)=>{
                return (
                    <div className="flashList" key={"gi-"+i}>
                        <div className="flashList_title">
                            <span>距本期闪购结束</span>
                            <div className="titleBorder"></div>
                            <p><em>14</em>时<em>14</em>分<em>14</em>秒</p>
                        </div>
                        <div className="flashBuy">{this.renderGoods(goods.goodsList)}</div>
                    </div>
                )
            })
        }
        return null
    }
    renderPreFlash(){
        const {preFlashGoods} = this.props.flashBuy.groupGoods;
        const beginTime = moment(preFlashGoods.startTime).format('HH:mm');
        if(preFlashGoods.length > 0){
            return preFlashGoods.map((goods,i)=>{
                return(
                    <div className="willFlash" key={"gr-"+i}>
                        <div className="willFlash_title">
                            <img src="/client/asset/images/willFlash.png" />
                        </div>
                        <div className="willFlash_con">
                            <div className="willFlash_time">开售时间<em>{beginTime}</em></div>
                            <div className="flashBuy">{this.renderGoods(goods.goodsList)}</div>
                            <div className="willFlash_line"></div>
                        </div>
                    </div>
                )
            })
        }
        return null
    }
    render(){
        const flashing = this.renderFlashing()
        const preflash = this.renderPreFlash()
        let emptyMsg = null
        if(flashing === null && preflash === null){
            emptyMsg = (
                <div className="empty noPadTop">
                    <img src="/client/asset/images/empty_search.png" />
                    <div className="tips">抱歉，没有找到相关的商品</div>
                </div>
            )
        }
        return (
            <div className="flashbuy-content">
                <Header>闪购</Header>
                {flashing}
                {preflash}
                {emptyMsg}
            </div>
        )
    }
}

export default FlashBuy;