'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import {formatPrice,destPriceForGoods} from "../../../lib/helper.es6";
import {jumpURL} from "../../../lib/jumpurl.es6";

import dom from "../../../lib/dom.es6";

class Toolbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            cartCount:props.cartCount,
            scheme:""
        };
    }
    renderPrice(){
        const {good} = this.props
        let salePrice = destPriceForGoods(good).destPrice
        return <span>&yen;{formatPrice(salePrice)}</span>
    }
    render(){
        const {addToCart,directBuy,good,cartCount,togglePopup} = this.props

        let canAddCart = good["canAddCart"]
        if(good.flashbuy["active"]){
            canAddCart = false
        }

        let handleAddCartPopup = ()=>{
           if(canAddCart){
                togglePopup("addToCart")
                this.setState({
                    scheme:"addToCart"
                })
           }
        }
        let handleDirectBuyPopup = ()=>{
            if(good.stock > 0){
                togglePopup("directBuy")
                this.setState({
                    scheme:"directBuy"
                })  
            }
        }

        // console.log('canAddCart',canAddCart)
        const addCartClasses = classNames("goods_add",{
            "disabled":!canAddCart || good.stock <= 0
        })
        const directBuyClasses = classNames("goods_buy",{
            "disabled":good.stock <= 0
        })
        return (
            <div className="good-detail-toolbar">
            <div className="good-detail-btn">
                <a href={jumpURL("cart")} className="goods_cart">
                    <i className="iconfont icon-cart">{cartCount > 0?<em>{cartCount > 99?"99+":cartCount}</em>:null}</i>
                </a>
                <a href="javascript:void(null)" onClick={handleAddCartPopup} className={addCartClasses}>加入购物车</a>
                <a href="javascript:void(0);" onClick={handleDirectBuyPopup} className={directBuyClasses}>{good.stock>0?"立即购买":"已抢光"}</a>
            </div>
            </div>
        )
    }
}

export default Toolbar;