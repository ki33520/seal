'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Header from "../common/header.jsx";
import Footer from "../common/footer.jsx";
import MaskLayer from "../../component/masklayer.jsx";
import NumberPicker from "../../component/numberpicker.jsx";
import {updateCart,toggleCart,toggleAllChecked,deleteCart,toggleAllNotChecked} from "./action.es6";
import Checkbox from "../../component/form/checkbox.jsx";
import {urlParam,base64Encode} from "../../lib/util.es6";



class Cart extends Component {
    checkout(cart){
        let {itemIds,buyeds} = cart;
        for(let i=0,n=buyeds.length;i<n;i++){
            if(buyeds[i]===0){
                buyeds.splice(i,1);
                itemIds.splice(i,1);
            }
        }

        let queryParam = base64Encode(urlParam({
            itemIds:itemIds.join(","),
            buyeds:buyeds.join(",")
        }));

        window.location.assign(`/confirmorder/${queryParam}`)
    }

    handleChangeBuyed(goods,number) {
        const {dispatch} = this.props;
        if(goods.checked===false){
            return false;
        }
        if(goods.buyLimit<number){
            return false;
        }
        dispatch(updateCart({
            singleCode:goods.id,
            qty:number,
            figureUpFlag:false
        }));
    }

    toggleCartItemsChecked(cartIndex,checked){
        const {dispatch,carts} = this.props;
        if(checked){
            dispatch(toggleAllChecked());
        }else{
            dispatch(toggleAllNotChecked({
                cartIndex
            }));
        }
        
    }

    toggleItemChecked(goods,cartIndex,groupIndex,goodsIndex,checked){
        const {dispatch,carts} = this.props;
        let {itemIds,buyeds} = carts[cartIndex];
        let index = itemIds.indexOf(goods.id);
        buyeds[index]= checked ? goods.qty : 0;
         
        dispatch(toggleCart({
            singleCodes:itemIds.join(','),
            qtys:buyeds.join(','),
            cartIndex,
            groupIndex,
            goodsIndex,
            checked
        }));
    }

    handleDeleteCart(cartId){
        const {dispatch} = this.props;
        dispatch(deleteCart({
            cartId:cartId
        }));
    }
 
    renderGoods(goods,cartIndex,groupIndex,goodsIndex) {
        return(
            <div className="group" key={"goods-"+goodsIndex}>
                <a className="shanchu" onClick={this.handleDeleteCart.bind(this,goods.cartId)}></a>
                <div className="J_moveRight">
                     
                    <Checkbox checked={goods.checked}
                    checkedIcon="checkbox-full" uncheckIcon="checkbox-empty"
                    onChange={this.toggleItemChecked.bind(this,goods,cartIndex,groupIndex,goodsIndex)} />
                    <div>
                        <div className="img_wrap">
                            <a className="J_ytag cartlist" href={"/gooddetail/"+goods.id}>
                            <img width="100%" src={goods.imageUrl} /></a>
                            <span className="limitBuy">限购{goods.buyLimit}件</span>
                        </div>
                        <div className="gd_info">
                            <p className="name">
                              <b>{goods.title}</b>
                              <span>&yen;{goods.salePrice}</span>
                              <em>x{goods.qty}</em>
                            </p>
                            <div className="act_wrap"> 
                                <NumberPicker value={goods.qty} minimum={1} maximum={goods.buyLimit} onChange={this.handleChangeBuyed.bind(this,goods)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderListRow(group,cartIndex,groupIndex){
        let list = [];
        let manjian = classNames("manjian",{
            hide:!group.promoType
        });
        group.list.map((goods,k)=>{
            list.push(this.renderGoods(goods,cartIndex,groupIndex,k))
        })

        return(
            <div className="J_item" key={"row-" + groupIndex}>
                <div className={manjian}><em>满减</em>{group.promoName}</div>
                {list}
            </div>
        );
    }

    renderTips(money,buyLimit,dutyFree){
        let message = null;

        if(money>=dutyFree){
            message = "省钱贴士：单笔订单税金"+dutyFree+"元以内，可以免税哦！"
        }else if(money >buyLimit){
            message = "啊哦，海关规定购买多件的总价（不含税）不能超过&yen;"+buyLimit+"哦，请您分多次购买。";
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
 
        return null;
    }

    renderListGroup(carts){

        return carts.map((cart,i)=>{
            let rows = [];
            let buyeds = [];
            cart.buyeds.map((item)=>{
                item && buyeds.push(item);
            });
            
            cart.list.forEach((list,j)=>{
                rows.push(this.renderListRow(list,i,j));
            });
            let btnClass = classNames("btn_buy",{
                "unable_buy":buyeds.length===0
            });
            let depot = classNames("depot_bot",{
                hide:!cart.promoType
            });
             
            return(
                <div className="onlyList clearfix" key={"cart-" + i}>
                    <div className="J_store clearfix">
                        <Checkbox checked={cart.checked}
                        checkedIcon="checkbox-full" uncheckIcon="checkbox-empty" 
                        onChange={this.toggleCartItemsChecked.bind(this,i)}/>
                        <div className="depot">
                            <span>{cart.warehouseName}</span>
                            <div className={depot}><em></em>{cart.promoName}</div>
                        </div>
                    </div>
                    {rows}
                    <div className="section_wrap cart_buy">
                        <div className="cartFirst clearfix">
                            <span>已选商品{cart.qtys}件</span>
                            <div className="cartFirst_two">
                                <p>商品总额：&nbsp;&nbsp;&yen;&nbsp;{cart.salesTotal}</p>
                                <p>活动优惠：-&nbsp;&yen;&nbsp;{cart.promoTotal}</p>
                            </div>
                        </div>
                        <div id="J_wrapperCartTop">
                            <p>
                                <span>总计(不含运费、税金)：<em>&yen;{cart.total}</em></span>
                            </p>
                            <p>
                                <input type="button"  className={btnClass} value="结算" onClick={this.checkout.bind(this,cart)}/>
                            </p>
                        </div>
                        {this.renderTips(cart.total,cart.buyLimit,cart.dutyFree)}
                    </div>
                </div>
            )
        });
        
    }

    renderCart(){
        const {carts} = this.props;
        if(carts.length){
            return  (
                <div className="cart">
                    {this.renderListGroup(carts)}
                </div>
            )
        }else{
            return (
                <div className="empty">
                    <img src="/client/asset/images/empty_cart.png" />
                    <span>购物车还空着呢，快去挑选商品吧！</span>
                    <a href="/" className="empty_btn">挑选商品</a>
                </div>
            )
        }
    }

    render() {

        return (
            <div>
                <Header>
                    <span className="title">购物车</span>
                </Header>
                
                {this.renderCart()}
    
                <Footer activeIndex="3"/>
            </div>
        )
    }
}
 
export default Cart;