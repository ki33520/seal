'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Popup from "../../../component/popup.jsx";
import NumberPicker from "../../../component/numberpicker.jsx";
import {formatPrice} from "../../../lib/util.es6";

import dom from "../../../lib/dom.es6";
import Attributes from "./attributes.jsx";

class Toolbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            cartCount:props.cartCount,
        };
    }
    renderPrice(){
        const {good} = this.props
        let salePrice = good.salePrice
        if(good.flashbuy["active"]){
            salePrice = good.flashbuy["price"]
        }
        if(good["useMobilePrice"] && !good.flashbuy["active"]){
            salePrice = good["mobilePrice"]
        }
        return <span>&yen;{formatPrice(salePrice)}</span>
    }
    render(){
        const {addToCart,directBuy,handleBuyedChanged,handleAttrToggle,
            popupActive,trigger,togglePopup,
            cartCount,selectedAttr,buyed,good} = this.props
        const handleConfirm = (trigger && trigger === "addToCart") ? addToCart:directBuy;

        const buylimit = good.buyLimit > good.stock ? good.stock:good.buyLimit
        let canAddCart = good["canAddCart"]
        if(good.stock === 0 || good.flashbuy["active"]){
            canAddCart = false
        }
        // console.log('canAddCart',canAddCart)
        const addCartClasses = classNames("goods_add",{
            "disabled":!canAddCart
        })
        const directBuyClasses = classNames("goods_buy",{
            "disabled":good.stock === 0
        })
        return (
            <div className="good-detail-toolbar">
            <div className="good-detail-btn">
                <a href="/cart" className="goods_cart">
                    <i className="iconfont icon-cart">{cartCount > 0?<em>{cartCount}</em>:null}</i>
                </a>
                <a href="javascript:void(null)" onClick={togglePopup.bind(this,"addToCart")} className={addCartClasses}>加入购物车</a>
                <a href="javascript:void(0);" onClick={togglePopup.bind(this,"directBuy")} className={directBuyClasses}>{good.stock===0?"已抢光":"立即购买"}</a>
            </div>
            <Popup direction="bottom" active={popupActive}>
                <div className="con">
                    <div className="goodsSure">
                        <img src={good.mainImageUrl} alt="" />
                        <div className="left">
                            {this.renderPrice()}
                            <em>库存<i>{good.stock}</i>件</em>
                        </div>
                        <i className="iconfont icon-close-circled" onClick={togglePopup.bind(this,null)}></i>
                    </div>
                    <Attributes attrs={good.attrs}
                    onAttrChange={handleAttrToggle} />
                    <div className="pro clearfix">
                        <div className="pro-name">
                            <span>购买数量</span>
                            <em>（限购{buylimit}件）</em>
                        </div>
                        <div className="good-buyed">
                        <NumberPicker value={buyed} onChange={handleBuyedChanged} 
                        step={good.buyedStep}
                        minimum={good.buyedMinimum} maximum={buylimit}/>
                        </div>
                    </div>
                    <a href="javascript:void(0);" onClick={handleConfirm} className="goodsSureBtn">{canAddCart?"确定":"立即购买"}</a>
                </div>
            </Popup>
            </div>
        )
    }
}

export default Toolbar;