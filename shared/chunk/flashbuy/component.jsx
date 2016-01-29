'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Icon from "../../component/icon.jsx";
import {Tabs,TabsItem} from "../../component/tabs.jsx";
import Timer from "../common/timer.jsx";

class FlashBuy extends Component{
    renderIcon(goods){
        var icons = [];
        if(goods.isSaleOut){
            icons.push(<div className="sale-out" key="out"></div>);
        }
        if(goods.isFlashPrice){
            icons.push(<div className="flash-price" key="flash"></div>);
        }else if(goods.isMobilePrice){
            icons.push(<div className="mobile-price" key="mobile"></div>);
        }
        return icons;
    }
    renderGoods(groupGoods){
        if(groupGoods.length > 0){
            return groupGoods.map((good,i)=>{
                return (
                    <a href={"/gooddetail/"+good.id} className="clearfix" key={i}>
                        {this.renderIcon(good)}
                        <img src={good.imageUrl} />
                        <div className="right">
                            <span className="name">{good.title}</span>
                            <span className="country">
                                <i><img src={good.sourceImageUrl} alt="" /></i>
                                {good.sourceName}
                            </span>
                            <span className="nowPrice">&yen;{good.salesPrice}</span>
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
                            <p><Timer endTime={goods.endTime}/></p>
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
        if(preFlashGoods.length > 0){
            return preFlashGoods.map((goods,i)=>{
                return(
                    <div className="willFlash" key={"gr-"+i}>
                        <div className="willFlash_title">
                            <img src="/client/asset/images/willFlash.png" />
                        </div>
                        <div className="willFlash_con">
                            <div className="willFlash_time">开售时间<em>{goods.preSaleTime}</em></div>
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