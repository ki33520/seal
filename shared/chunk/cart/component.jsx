'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Header from "../common/header.jsx";
import Footer from "../common/footer.jsx";
import MaskLayer from "../../component/masklayer.jsx";
import NumberPicker from "../../component/numberpicker.jsx";
import {updateCart,toggleCart,toggleAll,deleteCart} from "./action.es6";
import Checkbox from "../../component/form/checkbox.jsx";


class Cart extends Component {
    checkout(cartIndex,e){
        e && e.preventDefault();
        console.log(cartIndex,e)
        const checkoutForm = ReactDOM.findDOMNode(this.refs["checkoutForm"+cartIndex]);
        checkoutForm.submit();
    }

    handleChangeBuyed(cartIndex,groupIndex,goodsIndex,number) {
        const {dispatch,carts} = this.props;
        var goods = carts[cartIndex].groupList[groupIndex].productList[goodsIndex];

        if(goods.checked===false){
            return false;
        }
    
        dispatch(updateCart({
            id:goods.id,
            number,
            cartIndex,
            groupIndex,
            goodsIndex
        }));
    }

    toggleCartItemsChecked(cartIndex,checked){
        const {dispatch} = this.props;
  
        dispatch(toggleAll({
            cartIndex,
            checked
        }));
    }

    toggleItemChecked(cartIndex,groupIndex,goodsIndex,checked){
        const {dispatch,carts} = this.props;
        var goods = carts[cartIndex].groupList[groupIndex].productList[goodsIndex];
        const id = goods.id;
        const number = checked ? goods.number : 0;
       
        dispatch(toggleCart({
            id,
            number,
            checked,
            cartIndex,
            groupIndex,
            goodsIndex
        }));
    }

    handleDeleteCart(id,cartIndex,groupIndex,goodsIndex){
        const {dispatch} = this.props;
        dispatch(deleteCart({
            id,
            cartIndex,
            groupIndex,
            goodsIndex
        }));
    }
 
    renderGoods(goods,cartIndex,groupIndex,goodsIndex) {
        const goodKey = "goods-"+goodsIndex;
        return(
            <div className="group" key={goodKey}>
                <a className="shanchu" onClick={this.handleDeleteCart.bind(this,goods.id,cartIndex,groupIndex,goodsIndex)}></a>
                <div className="J_moveRight">
                     
                    <Checkbox checked={goods.checked}
                    checkedIcon="checkbox-full" uncheckIcon="checkbox-empty"
                    onChange={this.toggleItemChecked.bind(this,cartIndex,groupIndex,goodsIndex)} />
                    <div>
                        <div className="img_wrap">
                            <a className="J_ytag cartlist" href="goods.php?id=878">
                            <img width="100%" src={goods.imageUrl} /></a>
                            <span className="limitBuy">限购{goods.limit}件</span>
                        </div>
                        <div className="gd_info">
                            <p className="name">
                              <b>{goods.title}</b>
                              <span>&yen;{goods.price}</span>
                              <em>x{goods.number}</em>
                            </p>
                            <div className="act_wrap"> 
                                <NumberPicker value={goods.number} onChange={this.handleChangeBuyed.bind(this,cartIndex,groupIndex,goodsIndex)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderRow(rows,cartIndex,groupIndex){
        const rowKey = "row-" + groupIndex;
        var goods = [];

        rows.productList.map((item,k)=>{
            goods.push(this.renderGoods(item,cartIndex,groupIndex,k))
        })

        return(
            <div className="J_item" key={rowKey}>
                <div className="manjian"><em>满减</em>{rows.promoName}</div>
                {goods}
            </div>
        );
    }

    renderForm(cart,cartIndex){
        return (
            <form action="/confirmorder" method="POST" ref={"checkoutForm"+cartIndex}>
                <input type="hidden" name="itemIds" value={cart.itemIds.join(",")}/>
                <input type="hidden" name="buyeds" value={cart.buyeds.join(",")}/>
            </form>
        )
    }

    renderGroup(carts){
        if(carts.length > 0){
            return carts.map((cart,i)=>{
                const cartKey = "cart-" + i;
                var rows = [];
                cart.groupList.forEach((list,j)=>{
                    rows.push(this.renderRow(list,i,j));
                });
                var btnClass = classNames({
                    "btn_buy":true,
                    "unable_buy":cart.itemIds.length===0
                })
                return(
                    <div className="onlyList clearfix" key={cartKey}>
                        <div className="J_store clearfix">
                            <Checkbox checked={cart.checked}
                            checkedIcon="checkbox-full" uncheckIcon="checkbox-empty" 
                            onChange={this.toggleCartItemsChecked.bind(this,i)}/>
                            <div className="depot">
                                <span>{cart.warehouseName}</span>
                                <div className="depot_bot"><em></em>{cart.promoName}</div>
                            </div>
                        </div>
                        {rows}
                        <div className="section_wrap cart_buy">
                            <div className="cartFirst clearfix">
                                <span>已选商品{cart.number}件</span>
                                <div className="cartFirst_two">
                                    <p>商品总额：&nbsp;&nbsp;&yen;&nbsp;<span>{cart.price}</span></p>
                                    <p>活动优惠：-&nbsp;&yen;&nbsp;{cart.save}</p>
                                </div>
                            </div>
                            <div id="J_wrapperCartTop">
                                <p>
                                    <span>总计(不含运费、税金)：<em>&yen;{cart.pay}</em></span>
                                </p>
                                <p>
                                    <input type="button"  className={btnClass} value="结算" onClick={this.checkout.bind(this,i)}/>
                                </p>
                            </div>
                            <div className="cart_tips_1">
                                <i></i>
                                <span>省钱贴士：单笔订单税金50元以内，可以免税哦！</span>
                            </div>
                            {this.renderForm(cart,i)}
                        </div>
                    </div>
                )
            });
        }
    }

    render() {
 
        const {carts} = this.props;

        return (
            <div className="cart-content">
                <Header>
                    <span className="title">购物车</span>
                </Header>
                <div className="cart">
                    {this.renderGroup(carts)}
                </div>
                <Footer activeIndex="3"/>
                <MaskLayer visible={this.props.isFetching} />
            </div>
        )
    }
}

 
export default Cart;