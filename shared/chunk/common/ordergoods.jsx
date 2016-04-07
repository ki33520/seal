'use strict';

import React,{Component} from "react";
import LazyLoad from "../../component/lazyload/lazyload.jsx";
import Image from "../../component/lazyload/image.jsx";

class OrderGoods extends Component{
    renderGood(good,cartIndex,goodIndex){
        var props = [];
        for(let propName in good.props){
            const propKey = "prop-" + propName
            props.push((
                <span key={propKey}>{propName}:<b>{good.props[propName]}</b></span>
            ))
        }
        const goodKey = "good-" + goodIndex;
        return (
            <div className="group-good" key={goodKey}>
                <div className="group-good-thumbnail">
                    <a href="">
                    <img src={good.imageUrl} />
                    </a>
                </div>
                <div className="group-good-detail">
                    <h3>{good.title}</h3>
                    <p>{props}</p>
                    <p><span>单价:<b>￥{good.salePrice}</b><b className="through-line">￥{good.originPrice}</b></span></p>
                    <p>数量:<b>{good.buyed}</b></p>
                </div>
            </div>
        )
    }
    renderGroup(carts){
        if(carts.list.length > 0){
            return carts.list.map((cart,i)=>{
                const cartKey = "cart-" + i;
                var goods = [];
                cart.goods.forEach((good,j)=>{
                    goods.push(this.renderGood(good,i,j));
                })
                return (
                    <div className="cart-group" key={cartKey}>
                        <div className="group-mall">
                            <div className="check-label">所属门店:<b>{cart.mallName}</b></div>
                        </div>
                        <div className="group-promotion">
                            <div className="promotion-name">满减</div>
                            <div className="promotion-desc">购物满200减30,满300减50</div>
                        </div>
                        <div className="group-goods">
                        {goods}
                        </div>
                        <div className="group-total">
                        <span>小计<b>￥{cart.sumPrice}</b></span>
                        <span><label>满折</label><b>￥{cart.discountPrice}</b></span>
                        </div>
                    </div>
                )
            });
        }
        return null
    }
    render(){
        const {carts} = this.props;
        // console.log('carts',carts);
        return (
            <div className="order-group">
            <div className="overall-promotion">购物满200减30,满300减50</div>
            {this.renderGroup(carts)}
            </div>
        )
    }
} 

export default OrderGoods;