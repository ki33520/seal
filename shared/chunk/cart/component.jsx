'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Footer from "../common/footer.jsx";
import MaskLayer from "../../component/masklayer.jsx";
import NumberPicker from "../../component/numberpicker.jsx";
import {updateCart,deleteCart} from "./action.es6";
//import Checkbox from "../../component/form/checkbox.jsx";

 
 

class Cart extends Component {

    checkout(){

    }

    toggleItemChecked(){

    }

    handleChangeBuyed(param) {
        const {dispatch} = this.props;
        dispatch(updateCart(param));
        this.setState({
            isFetching:true
        })
    }

    toggleItemChecked(){

    }

    handleDeleteCart(cartId){
        const {dispatch} = this.props;
        dispatch(deleteCart(cartId));
    }
 
    renderGoods(goods,cartIndex,groupIndex,goodsIndex) {
        const goodKey = "goods-"+goodsIndex;
        return(
            <div className="group" key={goodKey}>
                <a className="shanchu" onClick={this.handleDeleteCart.bind(this,goods.cartId)}></a>
                <div className="J_moveRight">
                    <div className="checkboxRed">
                        <input type="checkbox"   defaultChecked="checked" />
                        <label></label>
                    </div>
                    <div>
                        <div className="img_wrap">
                            <a className="J_ytag cartlist" href="goods.php?id=878">
                            <img width="100%" src={goods.imageUrl} /></a>
                            <span className="limitBuy">限购{goods.buyLimit}件</span>
                        </div>
                        <div className="gd_info">
                            <p className="name">
                              <b>{goods.title}</b>
                              <span>&yen;{goods.salesPrice}</span>
                              <em>x{goods.qty}</em>
                            </p>
                            <div className="act_wrap"> 
                                <NumberPicker value={goods.qty} onChange={this.handleChangeBuyed.bind(this)}/>
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

        rows.cartProductList.map((item,k)=>{
            goods.push(this.renderGoods(item,cartIndex,groupIndex,k))
        })

        return(
            <div className="J_item" key={rowKey}>
                <div className="manjian"><em>满减</em>购物满200减30，满300减80，满400减120</div>
                {goods}
            </div>
        );
    }

    renderGroup(carts){
        if(carts.length > 0){
            return carts.map((cart,i)=>{
                const cartKey = "cart-" + i;
                var rows = [];
                cart.cartMKTList.forEach((list,j)=>{
                    rows.push(this.renderRow(list,i,j));
                });
            
                return(
                    <div className="onlyList clearfix" key={cartKey}>
                        <div className="J_store clearfix">
                            <div className="checkboxRed">
                                <input type="checkbox" checked="checked" onChange={this.toggleItemChecked.bind(this)}/>
                                <label></label>
                            </div>
                            <div className="depot">
                                <span>{cart.warehouseName}</span>
                                <div className="depot_bot"><em></em>{cart.promoName}</div>
                            </div>
                        </div>
                        {rows}
                        <div className="section_wrap cart_buy">
                            <div className="cartFirst clearfix">
                                <span>已选商品{cart.qtys}件</span>
                                <div className="cartFirst_two">
                                    <p>商品总额：&nbsp;&nbsp;&yen;&nbsp;<span>{cart.salesTotalFee}</span></p>
                                    <p>活动优惠：-&nbsp;&yen;&nbsp;{cart.tariffFee}</p>
                                </div>
                            </div>
                            <div id="J_wrapperCartTop">
                                <p>
                                    <span id="cart_money_info2_1">总计(不含运费、税金)：<em>&yen;{cart.totalFee}</em></span>
                                </p>
                                <p><input type="button"  className="btn_buy" value="结算" onClick={this.checkout.bind(this)}/></p>
                            </div>
                            <div className="cart_tips_1">
                                <i></i>
                                <span>省钱贴士：单笔订单税金50元以内，可以免税哦！</span>
                            </div>
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