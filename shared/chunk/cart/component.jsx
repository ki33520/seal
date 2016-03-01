'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Header from "../common/header.jsx";
import Footer from "../common/footer.jsx";
import MaskLayer from "../../component/masklayer.jsx";
import NumberPicker from "../../component/numberpicker.jsx";
import Checkbox from "../../component/form/checkbox.jsx";
import Alert from "../../component/alert.jsx";
import Dialog from "../../component/dialog.jsx";
import {urlParam,base64Encode,formatPrice} from "../../lib/util.es6";

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            dialogActive:false,
            dialogOnConfirm:null,
            alertActive:false,
            alertOnConfirm:null
        }
    }
    componentWillReceiveProps(nextProps){
        const {isChecked,allowSubmit,params} = nextProps.cartByUser;
        if(isChecked){
            if(allowSubmit){
                const queryParam = base64Encode(urlParam(params));
                window.location.assign(`/confirmorder/${queryParam}`);
            }else{
                this.setState({
                    alertActive:true,
                    alertOnConfirm:()=>{
                        this.toggleAlert();
                    }
                });
            }
        }
    }
    checkout(cart,cartIndex){
        const {isChecking} = this.props.cartByUser;
        let itemIds = [];
        let buyeds = [];
        if(!cart.checked || isChecking){
            return false;
        }
        if(cart.total > cart.buyLimit){
            return false
        }
        cart.group.forEach((group)=>{
            group.list.forEach((item)=>{
                if(item.checked){
                    itemIds.push(item.singleCode);
                    buyeds.push(item.qty); 
                }
            });
        });
        if(itemIds.length&&buyeds.length){
            this.props.checkCartInfo({
                singleCodes:itemIds.join(","),
                qtys:buyeds.join(","),
                cartIndex
            });
        }
    }
    handleChangeBuyed(goods,cartIndex,groupIndex,goodsIndex,buyed) {
        const {carts,isUpdating} = this.props.cartByUser;
        const singleCode = goods.singleCode;
        if(isUpdating){
            return false;
        }
        if(goods.checked===false){
            this.props.changeCartBuyed({
                singleCodes:singleCode,
                qtys:buyed,
                buyLimit:goods.buyLimit,
                cartIndex,
                groupIndex,
                goodsIndex
            });
            return false;
        }
        let singleCodes = [];
        let buyeds = [];
        carts[cartIndex].group.forEach((group)=>{
            group.list.forEach((item)=>{
                if(item.checked){
                    singleCodes.push(item.singleCode);
                    buyeds.push(singleCode==item.singleCode?buyed:item.qty);
                }
            });
        });
        this.props.updateCart({
            singleCode,
            qty:buyed,
            buyLimit:goods.buyLimit,
            singleCodes:singleCodes.join(','),
            qtys:buyeds.join(','),
            cartIndex,
            groupIndex,
            goodsIndex
        });
    }
    toggleAllChecked(cartIndex,checked){
        const {carts,isAllToggling} = this.props.cartByUser;
        if(isAllToggling) return false;
        let singleCodes = [];
        let buyeds = [];
        carts[cartIndex].group.forEach((group)=>{
            group.list.forEach((item)=>{
                if(checked){
                    singleCodes.push(item.singleCode);
                    buyeds.push(item.qty);   
                }
            });
        });

        this.props.toggleCartAll({
            singleCodes:singleCodes.join(','),
            qtys:buyeds.join(','),
            cartIndex,
            checked
        });
    }
    toggleItemChecked(goods,cartIndex,groupIndex,goodsIndex,checked){
        const {carts,isToggleing} = this.props.cartByUser;
        if(isToggleing) {
            return false;
        }
        let singleCodes = [];
        let buyeds = [];
        carts[cartIndex].group.forEach((group)=>{
            group.list.forEach((item)=>{
                if(item.checked && item.singleCode !== goods.singleCode){
                    singleCodes.push(item.singleCode);
                    buyeds.push(item.qty);
                }
            });
        });
        if(checked){
            singleCodes.push(goods.singleCode);
            buyeds.push(goods.qty);
        }
        this.props.toggleCartItem({
            singleCodes:singleCodes.join(','),
            qtys:buyeds.join(','),
            cartIndex,
            groupIndex,
            goodsIndex,
            singleCode:goods.singleCode,
            checked
        });
    }
    toggleDialog(){
        this.setState({
            dialogActive:!this.state.dialogActive
        });
    }
    toggleAlert(){
        this.setState({
            alertActive:!this.state.alertActive
        });
    }
    handleDeleteCart(goods,cartIndex,groupIndex,goodsIndex){
        const {deleteCart,cartByUser} = this.props;
        const cart = cartByUser.carts[cartIndex];
        if(!goods.checked||cartByUser.isDeleting){
            return false;
        }
        let singleCodes = [];
        let buyeds = [];
        cart.group.forEach((group)=>{
            group.list.forEach((item)=>{
                if(item.singleCode !== goods.singleCode && item.checked){
                    singleCodes.push(item.singleCode);
                    buyeds.push(item.qty);
                }
            })
        });
        this.setState({
            dialogActive:true,
            dialogOnConfirm:()=>{
                this.toggleDialog();
                deleteCart({
                    cartId:goods.cartId,
                    singleCodes:singleCodes.join(','),
                    qtys:buyeds.join(','),
                    singleCode:goods.singleCode,
                    cartIndex,
                    groupIndex,
                    goodsIndex
                });
            }
        });
    }
    renderGoods(goods,i,j,k) {
        const salePrice = formatPrice(goods.salePrice);
        const buyLimit = classNames({
            hide:goods.buyLimit<1,
            limitBuy:goods.buyLimit>0
        });
        const soldout = classNames({
            "sold-out":!goods.stockFlag
        });
        return(
            <div className="group" key={"g-"+i+j+k}>
                <a className="shanchu" onClick={this.handleDeleteCart.bind(this,goods,i,j,k)}></a>
                <div className="J_moveRight">
                    <Checkbox checked={goods.checked}
                    checkedIcon="checkbox-full" uncheckIcon="checkbox-empty"
                    onChange={this.toggleItemChecked.bind(this,goods,i,j,k)} />
                    <div>
                        <div className="img_wrap">
                            <a className="J_ytag cartlist" href={"/gooddetail/"+goods.singleCode}>
                                <img width="100%" src={goods.imageUrl} />
                                <div className={soldout}></div>
                            </a>
                            <span className={buyLimit}>限购{goods.buyLimit}件</span>
                        </div>
                        <div className="gd_info">
                            <p className="name">
                              <b>{goods.title}</b>
                              <span>{'￥'+salePrice}</span>
                              <em>{'x'+goods.qty}</em>
                            </p>
                            <div className="act_wrap"> 
                                <NumberPicker value={goods.qty} minimum={1} maximum={goods.buyLimit} 
                                onChange={this.handleChangeBuyed.bind(this,goods,i,j,k)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    renderGroup(group,i,j){
        let goodsList = [];
        let manjian = classNames("manjian",{
            hide:!group.promoName
        });
        group.list.map((goods,k)=>{
            goodsList.push(this.renderGoods(goods,i,j,k))
        });

        return(
            <div className="J_item" key={"gp-" + i+j}>
                <div className={manjian}><em>满减</em>{group.promoName}</div>
                {goodsList}
            </div>
        );
    }
    renderInfo(total,tax, limitTax,limitMoney){
        let notice = "省钱贴士：单笔订单税金"+limitTax+"元以内，可以免税哦！";
        let warning = "啊哦，海关规定购买多件的总价（不含税）不能超过￥"+limitMoney+"哦，请您分多次购买。";
        let message = null;

        if(total > limitMoney){
            message = warning;
        }else if(tax > limitTax){
            message = notice;
        }

        if(message===null) return null;

        return(
            <div className="cart-tips">
                <div className="arrow"></div>
                <div className="con">
                    {message}
                </div>
            </div>
        )
    }
    renderCart(cart,i){
        let groupList = [];
        let allowBuy = cart.checked ? true : false;
        if(cart.total > cart.buyLimit || cart.total <=0){
            allowBuy = false
        }
        cart.group.forEach((group,j)=>{
            groupList.push(this.renderGroup(group,i,j));
        });
        let button = classNames("btn_buy",{
            "unable_buy":allowBuy===false
        });
        let promo = classNames("depot_bot",{
            hide:!cart.promoName
        });
        const salesTotal = formatPrice(cart.salesTotal);
        const promoTotal = formatPrice(cart.promoTotal);
        const total = formatPrice(cart.total);
        return(
            <div className="onlyList clearfix" key={"cart-" + i}>
                <div className="J_store clearfix">
                    <Checkbox checked={cart.checked}
                    checkedIcon="checkbox-full" uncheckIcon="checkbox-empty" 
                    onChange={this.toggleAllChecked.bind(this,i)}/>
                    <div className="depot">
                        <span>{cart.warehouseName}</span>
                        <div className={promo}><em></em>{cart.promoName}</div>
                    </div>
                </div>
                {groupList}
                <div className="section_wrap cart_buy">
                    <div className="cartFirst clearfix">
                        <span>已选商品{cart.qtys}件</span>
                        <div className="cartFirst_two">
                            <p>{'商品总额： ￥'+salesTotal}</p>
                            <p>{'活动优惠： -￥'+promoTotal}</p>
                        </div>
                    </div>
                    <div id="J_wrapperCartTop">
                        <p>
                            总计(不含运费、税金)：<em>{'￥'+total}</em>
                        </p>
                        <p>
                            <input type="button"  className={button} value="结算" onClick={this.checkout.bind(this,cart,i)}/>
                        </p>
                    </div>
                    {this.renderInfo(cart.total,cart.tax,cart.dutyFree,cart.buyLimit)}
                </div>
            </div>
        )
    }
    renderCarts(){
        const {carts} = this.props.cartByUser;
  
        if(carts && carts.length){
            let cartList = [];
            carts.forEach((cart,i)=>{
                cartList.push(this.renderCart(cart,i));
            })
            return  (
                <div className="cart">
                    {cartList}
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
        const {isUpdating,alertContent} = this.props.cartByUser;
        return (
            <div>
                <Header>
                    <span className="title">购物车</span>
                </Header>
                {this.renderCarts()}
                <Dialog active={this.state.dialogActive} 
                    onCancel={this.toggleDialog.bind(this)}
                    onConfrim={this.state.dialogOnConfirm}>确定要删除吗?</Dialog>
                <Dialog active={this.state.alertActive}
                    onlyConfirm={true}
                    onConfrim={this.state.alertOnConfirm}>{alertContent}</Dialog>
                <Footer activeIndex="3"/>
            </div>
        )
    }
}
 
export default Cart;