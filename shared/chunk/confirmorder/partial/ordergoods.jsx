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
                    <p className="value"> <span>&yen;{good.salePrice}</span><b>X{good.buyed}</b> </p>
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
                return (
                    <div className="orderConfirm_l_box" key={i}>
                        <div className="orderConfirm_title clearfix">
                        <em>优惠类型</em>
                        <span>组合商品更多优惠</span>
                        <i className="iconfont icon-right"></i>
                        </div>
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
                <span>广州保税区一号仓</span>
                <span>满XXX元减XX元，满XXXX元减XXX元。</span>
            </div>
            <div className="orderConfirm_l clearfix">
            {this.renderGroup(promoList)}
            </div>
            </div>
        )
    }
} 

export default OrderGoods;