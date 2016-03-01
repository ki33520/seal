'use strict';

import React,{Component} from "react";
import LazyLoad from "../../../component/lazyload/lazyload.jsx";
import Image from "../../../component/lazyload/image.jsx";

class OrderGoods extends Component{
    renderGood(good,parentIndex,goodIndex){
        var props = [];
        for(let propName in good.props){
            const propKey = "prop-" + propName
            props.push((
                <span key={propKey}>{propName}:<b>{good.props[propName]}</b></span>
            ))
        }
        const goodKey = "good-" + goodIndex;
        return (
            <div className="clearfix" key={goodKey}>
                <a className="img_wrap J_ytag cartlist" href="javascript:void(null)">
                    <img src={good.imageUrl} />
                </a>
                <div className="gd_info">
                    <p className="name"><span>{good.title}</span></p>
                    <p className="value"> <span>&yen;{good.salePrice}</span><b>X{good.qty}</b> </p>
                </div>
            </div>
        )
    }
    renderGroup(promoList){
        if(promoList.length > 0){
            return promoList.map((promo,i)=>{
                var goods = [];
                promo.goods.forEach((good,j)=>{
                    goods.push(this.renderGood(good,i,j));
                })
                let promoTitle = null
                if(promo.promoType && promo.promoName){
                    promoTitle =  (
                        <div className="orderConfirm_title clearfix">
                        <em>{promo.promoType}</em>
                        <span>{promo.promoName}</span>
                        </div>
                    )
                }
                return (
                    <div className="orderConfirm_l_box" key={i}>
                        {promoTitle}
                        <div className="J_moveRight">
                        {goods}
                        </div>
                    </div>
                )
            });
        }
        return null
    }
    render(){
        const {promoList} = this.props;
        // console.log('carts',carts);
        return (
            <div className="order-list">
            <div className="order-info">
                <span>{this.props.warehouse}</span>
                <span>{this.props.promoName}</span>
            </div>
            <div className="orderConfirm_l clearfix">
            {this.renderGroup(promoList)}
            </div>
            </div>
        )
    }
} 

export default OrderGoods;