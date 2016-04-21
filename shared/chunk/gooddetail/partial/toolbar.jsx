'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Popup from "../../../component/popup.jsx";
import NumberPicker from "../../../component/numberpicker.jsx";
import {formatPrice,destPriceForGoods} from "../../../lib/helper.es6";
import {jumpURL} from "../../../lib/jumpurl.es6";

import dom from "../../../lib/dom.es6";
import Attributes from "./attributes.jsx";

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
        const {addToCart,directBuy,handleBuyedChanged,handleBuyedOverflow,handleAttrToggle,
            popupActive,trigger,togglePopup,
            cartCount,selectedAttr,buyed,good} = this.props
        const handleConfirm = (trigger && trigger === "addToCart") ? addToCart:directBuy;
        let buylimit = good.buyLimit > good.stock ? good.stock:good.buyLimit

        /*2000 price amount limit*/
        const destPrice = destPriceForGoods(good).destPrice
        buylimit = buylimit > Math.floor(2000 / destPrice) ?Math.floor(2000 / destPrice):buylimit

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
        const confrimButtonClasses = classNames("goodsSureBtn",{
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
                        </div>
                        <div className="good-buyed">
                        <NumberPicker value={buyed} onChange={handleBuyedChanged} 
                        onOverflow={handleBuyedOverflow} 
                        step={good.buyedStep}
                        minimum={good.buyedMinimum} maximum={buylimit}/>
                        </div>
                    </div>
                    <a href="javascript:void(0);" onClick={handleConfirm} className={confrimButtonClasses}>{
                        !canAddCart && this.state.scheme === "addToCart"
                        ?"立即购买":"确定"}</a>
                </div>
            </Popup>
            </div>
        )
    }
}

export default Toolbar;