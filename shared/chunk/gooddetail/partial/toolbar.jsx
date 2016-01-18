'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Popup from "../../../component/popup.jsx";
import NumberPicker from "../../../component/numberpicker.jsx";

import dom from "../../../lib/dom.es6";
import Attributes from "./attributes.jsx";

class Toolbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            cartCount:props.cartCount,
        };
    }
    render(){
        const {addToCart,directBuy,handleBuyedChanged,handleAttrChange,
            popupActive,trigger,togglePopup,
            cartCount,selectedAttr,buyed,good} = this.props
        const handleConfirm = (trigger && trigger === "addToCart") ? addToCart:directBuy;
        return (
            <div className="good-detail-toolbar">
            <div className="good-detail-btn">
                <a href="/cart" className="goods_cart">
                    <i className="iconfont icon-cart">{cartCount > 0?<em>{cartCount}</em>:null}</i>
                </a>
                <a href="javascript:void(null)" onClick={togglePopup.bind(this,"addToCart")} className="goods_add">加入购物车</a>
                <a href="javascript:void(0);" onClick={togglePopup.bind(this,"directBuy")} className="goods_buy">立即购买</a>
            </div>
            <Popup direction="bottom" active={popupActive}>
                <div className="con">
                    <div className="goodsSure">
                        <img src={good.mainImageUrl} alt="" />
                        <div className="left">
                            <span>&yen;{good.salePrice}</span>
                            <em>库存<i>{good.stock}</i>件</em>
                        </div>
                        <i className="iconfont icon-close-circled" onClick={togglePopup.bind(this,null)}></i>
                    </div>
                    <Attributes attrs={good.attrs}
                    stock={good.stock}
                    selectedAttr={selectedAttr}
                    onAttrChange={handleAttrChange} />
                    <div className="pro clearfix">
                        <div className="pro-name">
                            <span>购买数量</span>
                            <em>（限购{good.buyLimit}件）</em>
                        </div>
                        <div className="good-buyed">
                        <NumberPicker value={buyed} onChange={handleBuyedChanged}/>
                        </div>
                    </div>
                    <a href="javascript:void(0);" onClick={handleConfirm} className="goodsSureBtn">确定</a>
                </div>
            </Popup>
            </div>
        )
    }
}

export default Toolbar;