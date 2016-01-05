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
        return(
            <div className="group" key={"goods-"+goodsIndex}>
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
        let goods = [];

        rows.productList.map((item,k)=>{
            goods.push(this.renderGoods(item,cartIndex,groupIndex,k))
        })

        return(
            <div className="J_item" key={"row-" + groupIndex}>
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

    renderTips(money){
        let message = '';

        if(money>=50){
            message = "省钱贴士：单笔订单税金50元以内，可以免税哦！"
        }else if(money >1000){
            message = "啊哦，海关规定购买多件的总价（不含税）不能超过&yen;1000哦，请您分多次购买。";
        }

        if(message){
            return(
                <div className="cart-tips">
                    <div className="arrow"></div>
                    <div className="con">
                        {message}
                    </div>
                </div>
            )
        }
 
        return '';
    }

    renderGroup(carts){

        return carts.map((cart,i)=>{
            let rows = [];
            cart.groupList.forEach((list,j)=>{
                rows.push(this.renderRow(list,i,j));
            });
            let btnClass = classNames({
                "btn_buy":true,
                "unable_buy":cart.itemIds.length===0
            })

            return(
                <div className="onlyList clearfix" key={"cart-" + i}>
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
                                <p>商品总额：&nbsp;&nbsp;&yen;&nbsp;{cart.price}</p>
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
                        {this.renderTips(cart.pay)}
                        {this.renderForm(cart,i)}
                    </div>
                </div>
            )
        });
        
    }

    cartBody(){
        const {carts} = this.props;
        if(carts.length){
            return  (
                <div className="cart">
                    {this.renderGroup(carts)}
                </div>
            )
        }else{
            return (
                <Empty />
            )
        }
    }

    render() {

        return (
            <div>
                <Header>
                    <span className="title">购物车</span>
                </Header>
                
                {this.cartBody()}
    
                <Footer activeIndex="3"/>
                <MaskLayer visible={false} />
            </div>
        )
    }
}

class Empty extends Component {
    render(){
        return (
            <div className="empty">
                <img src="/client/asset/images/empty_cart.png" />
                <span>购物车还空着呢，快去挑选商品吧！</span>
                <a href="/" className="empty_btn">挑选商品</a>
            </div>
        )
    }
}
 
export default Cart;