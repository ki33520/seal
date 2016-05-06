'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Icon from "../../component/icon.jsx";
import GoTop from "../../component/gotop.jsx";
import {Tabs,TabsItem} from "../../component/tabs.jsx";
import Timer from "../common/timer.jsx";
import classNames from "classnames";
import LazyLoad from "../../component/lazyload/lazyload.jsx";
import Image from "../../component/lazyload/image.jsx";
import {formatPrice} from "../../lib/util.es6";
import {jumpURL} from "../../lib/jumpurl.es6";
import {shareInWeixin} from "../../lib/weixin.es6";

class FlashBuy extends Component{
     filterPrice(goods,status){
        if(goods.flashPrice && goods.flashPrice > 0 && status==='ing'){
            return formatPrice(goods.flashPrice);
        }else if(goods.useMobilePrice&&goods.mobilePrice>0){
            return formatPrice(goods.mobilePrice);
        }else{
            return formatPrice(goods.salesPrice);
        }
    }
    renderGoods(groupGoods,status){
        if(groupGoods.length > 0){
            return groupGoods.map((goods,i)=>{
                const saleState = classNames({
                    "sale-out":goods.localStock<1&&goods.onSale,
                    "put-off":!goods.onSale
                });
                const salesPrice = this.filterPrice(goods,status);
                const originPrice = formatPrice(goods.originPrice);
                return (
                    <a href={jumpURL("gooddetail",[goods.singleCode])} className="clearfix" key={i}>
                        <div className={saleState}></div>
                        <LazyLoad relative={true} relativeSelector="back-to-top-inner">
                        <Image src={goods.imageUrl} transitionName="fade" placeholder={()=><div className="placeholder"></div>}/>
                        </LazyLoad>
                        <div className="right">
                            <span className="name">{goods.title}</span>
                            <span className="country">
                                <i><img src={goods.sourceImageUrl} alt="" /></i>
                                {goods.sourceName}
                            </span>
                            <span className="nowPrice">{'¥'+salesPrice}</span>
                            <span className="oldPrice">{'¥'+originPrice}</span>
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
                            <p>
                                <Timer endTime={goods.endTime} dayEnable={true} 
                                template="<i><%= day %></i>天<i><%= hour %></i>时<i><%= minute %></i>分<i><%= second %></i>秒"/>
                            </p>
                        </div>
                        <div className="flashBuy">{this.renderGoods(goods.goodsList,'ing')}</div>
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
                            <div className="flashBuy">{this.renderGoods(goods.goodsList,'pre')}</div>
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
                <GoTop relative={true}>
                    <Header>闪购</Header>
                    {flashing}
                    {preflash}
                    {emptyMsg}
                </GoTop>
            </div>
        )
    }
}

export default FlashBuy;