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
    filterParamItems(cart) {
        if(!cart) return {};
        let singleCodes = [];
        let buyeds = [];
        cart.group.forEach((group) => {
            group.list.forEach((item) => {
                if (item.checked) {
                    singleCodes.push(item.singleCode);
                    buyeds.push(item.buyed);
                }
            });
        });
        return {
            singleCodes:singleCodes.join(','),
            buyeds:buyeds.join(',')
        }
    }
    componentWillReceiveProps(nextProps){
        const {
            isUpdated,isToggled,isAllToggled,isDeleted,isPassed,isChecked,carts,cartIndex,groupIndex,goodsIndex,singleCode
        } = nextProps.cartByUser;
        const {singleCodes,buyeds} = this.filterParamItems(carts[cartIndex]);
        if(isChecked){
            if(isPassed){
                const queryParam = base64Encode(urlParam({
                    itemIds:singleCodes,
                    buyeds
                }));
                window.location.assign(`/confirmorder/${queryParam}`);
                return false;
            }else{
                this.setState({
                    alertActive:true,
                    alertOnConfirm:()=>{
                        this.toggleAlert();
                    }
                });
            }
        }
        if(isUpdated||isToggled||isAllToggled||isDeleted){
            this.props.fetchCart({
                singleCodes,
                buyeds,
                cartIndex,
                groupIndex,
                goodsIndex,
                singleCode
            });
        }
    }
    checkout(cartIndex){
        const {isChecking,isLogined,loginUrl,carts} = this.props.cartByUser;
        const cart = carts[cartIndex];
        if(cart.collected<1 || isChecking){
            return false;
        }
        if(cart.total > cart.buyLimit || cart.total <=0){
            return false;
        }
        if(!isLogined){
            location.href=loginUrl;
            return false;
        }
         const {singleCodes,buyeds} = this.filterParamItems(cart);
        this.props.checkCartInfo({
            singleCodes,
            buyeds,
            cartIndex
        });
    }
    handleChangeBuyed(goods,cartIndex,groupIndex,goodsIndex,buyed) {
        const {isUpdating} = this.props.cartByUser;
        const singleCode = goods.singleCode;
        const maxBuy = goods.maxBuy;
        if(isUpdating || buyed > maxBuy){
            return false;
        }
        this.props.updateCart({
            singleCode,
            buyed,
            maxBuy,
            cartIndex,
            groupIndex,
            goodsIndex
        });
    }
    toggleAllChecked(cartIndex,checked){
        const {isAllToggling} = this.props.cartByUser;
        if(isAllToggling) return false;
        this.props.toggleCartAll({
            cartIndex,
            checked
        });
    }
    toggleItemChecked(goods,cartIndex,groupIndex,goodsIndex,checked){
        const {isToggleing} = this.props.cartByUser;
        if(isToggleing) {
            return false;
        }
        this.props.toggleCartItem({
            cartIndex,
            groupIndex,
            goodsIndex,
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
        const {isDeleting} = this.props.cartByUser;
        if(isDeleting){
            return false;
        }
        this.setState({
            dialogActive:true,
            dialogOnConfirm:()=>{
                this.toggleDialog();
                this.props.deleteCart({
                    cartId:goods.cartId,
                    singleCode:goods.singleCode,
                    checked:goods.checked,
                    cartIndex,
                    groupIndex,
                    goodsIndex
                });
            }
        });
    }
    renderInfo(total,tax, limitTax,limitMoney){
        const notice = "省钱贴士：单笔订单税金"+limitTax+"元以内，可以免税哦！";
        const warning = "啊哦，海关规定购买多件的总价（不含税）不能超过￥"+limitMoney+"哦，请您分多次购买。";
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
    renderGoods(goods,i,j,k) {
        const salePrice = formatPrice(goods.salePrice);
        const maxBuy = goods.maxBuy;
        const buyed = goods.buyed;
        const limitStyle = classNames({
            limitBuy:maxBuy
        });
        const saleOut = classNames({
            "sale-out":!goods.stockFlag
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
                                <div className={saleOut}></div>
                            </a>
                            <span className={limitStyle}>{'限购'+maxBuy+'件'}</span>
                        </div>
                        <div className="gd_info">
                            <p className="name">
                              <b>{goods.title}</b>
                              <span>{'￥'+salePrice}</span>
                              <em>{'x'+buyed}</em>
                            </p>
                            <div className="act_wrap"> 
                                <NumberPicker type="number" value={buyed} 
                                minimum={goods.minStep} maximum={maxBuy} step={goods.step}
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
        const manjian = classNames("manjian",{
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
    renderCart(cart,i){
        let groupList = [];
        let allowBuy = true;

        if(cart.total > cart.buyLimit ||cart.total <=0 || cart.buyeds<1){
            allowBuy = false;
        }
        cart.group.forEach((group,j)=>{
            groupList.push(this.renderGroup(group,i,j));
        });
        const button = classNames("btn_buy",{
            "unable_buy":allowBuy===false
        });
        const promo = classNames("depot_bot",{
            hide:!cart.promoName
        });
        const tax = cart.total * cart.tariffFee;
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
                        <span>{'已选商品'+cart.buyeds+'件'}</span>
                        <div className="cartFirst_two">
                            <p>{'商品总额： ￥'+salesTotal}</p>
                            <p>{'活动优惠： -￥'+promoTotal}</p>
                        </div>
                    </div>
                    <div className="J_wrapperCartTop">
                        <p>
                            总计(不含运费、税金)：<em>{'￥'+total}</em>
                        </p>
                        <p>
                            <input type="button"  className={button} value="结算" onClick={this.checkout.bind(this,i)}/>
                        </p>
                    </div>
                    {this.renderInfo(cart.total,tax,cart.dutyFree,cart.buyLimit)}
                </div>
            </div>
        )
    }
    renderCarts(){
        const {carts} = this.props.cartByUser;
        if(carts && carts.length>0){
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