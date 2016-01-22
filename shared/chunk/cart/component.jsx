'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Header from "../common/header.jsx";
import Footer from "../common/footer.jsx";
import MaskLayer from "../../component/masklayer.jsx";
import NumberPicker from "../../component/numberpicker.jsx";
import Checkbox from "../../component/form/checkbox.jsx";
import Dialog from "../../component/dialog.jsx";
import {urlParam,base64Encode} from "../../lib/util.es6";

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            dialogActive:false,
            dialogOnConfirm:null
        }
    }
    checkout(cart){
        let ids = [];
        let qtys = [];
        cart.group.forEach((group)=>{
            group.list.forEach((item)=>{
                if(item.qty>0){
                    ids.push(item.id);
                    qtys.push(item.qty); 
                }
            })
        });

        let queryParam = base64Encode(urlParam({
            itemIds:ids.join(","),
            buyeds:qtys.join(",")
        }));

        window.location.assign(`/confirmorder/${queryParam}`)
    }

    handleChangeBuyed(goods,cartIndex,number) {
        if(goods.buyLimit<number){
            return false;
        }
        if(goods.checked===false){
            this.props.updateCartNumber({
                id:goods.id,
                qty:number,
                cartIndex
            });
            return false;
        }
        const {carts} = this.props.cartByUser;
        let ids = [];
        let qtys = [];
        carts[cartIndex].group.forEach((group)=>{
            group.list.forEach((item)=>{
                ids.push(item.id);
                qtys.push(goods.id==item.id?number:item.qty);
            })
        });
        this.props.updateCart({
            singleCode:goods.id,
            qty:number,
            figureUpFlag:false,
            cartIndex,
            singleCodes:ids.join(','),
            qtys:qtys.join(',')
        });
    }

    toggleAllChecked(cartIndex,checked){
        const {carts} = this.props.cartByUser;
        let ids = [];
        let qtys = [];
        carts[cartIndex].group.forEach((group)=>{
            group.list.forEach((item)=>{
                ids.push(item.id);
                qtys.push(checked?item.qty:0);
            })
        });

        this.props.toggleCartAll({
            singleCodes:ids.join(','),
            qtys:qtys.join(','),
            cartIndex,
            checked
        });
    }

    toggleItemChecked(id,cartIndex,checked){
        const {carts} = this.props.cartByUser;
        let ids = [];
        let qtys = [];
        carts[cartIndex].group.forEach((group)=>{
            group.list.forEach((item)=>{
                ids.push(item.id);
                if(id===item.id){
                    qtys.push(checked?item.qty:0);
                }else{
                    qtys.push(item.checked?item.qty:0); 
                }
            })
        });
        
        this.props.toggleCartItem({
            singleCodes:ids.join(','),
            qtys:qtys.join(','),
            cartIndex,
            id,
            checked
        });
    }
    toggleDialog(){
        this.setState({
            dialogActive:!this.state.dialogActive
        })
    }
    handleDeleteCart(cartId,cartIndex){
        const {deleteCart} = this.props;
        this.setState({
            dialogActive:true,
            dialogOnConfirm:()=>{
                this.toggleDialog()
                deleteCart({cartId,cartIndex});
            }
        });
    }
 
    renderGoods(goods,i,j,k) {
        return(
            <div className="group" key={"g-"+i+j+k}>
                <a className="shanchu" onClick={this.handleDeleteCart.bind(this,goods.cartId,i)}></a>
                <div className="J_moveRight">
                    <Checkbox checked={goods.checked}
                    checkedIcon="checkbox-full" uncheckIcon="checkbox-empty"
                    onChange={this.toggleItemChecked.bind(this,goods.id,i)} />
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
                                <NumberPicker value={goods.qty} minimum={1} maximum={goods.buyLimit} 
                                onChange={this.handleChangeBuyed.bind(this,goods,i)} />
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
            hide:!group.promoType
        });
        group.list.map((goods,k)=>{
            goodsList.push(this.renderGoods(goods,i,j,k))
        })

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
        cart.group.forEach((group,j)=>{
            groupList.push(this.renderGroup(group,i,j));
        });
        let button = classNames("btn_buy",{
            "unable_buy":!cart.checked
        });
        let promo = classNames("depot_bot",{
            hide:!cart.promoType
        });
         
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
                            <p>商品总额：&nbsp;&nbsp;&yen;&nbsp;{cart.salesTotal}</p>
                            <p>活动优惠：-&nbsp;&yen;&nbsp;{cart.promoTotal}</p>
                        </div>
                    </div>
                    <div id="J_wrapperCartTop">
                        <p>
                            <span>总计(不含运费、税金)：<em>&yen;{cart.total}</em></span>
                        </p>
                        <p>
                            <input type="button"  className={button} value="结算" onClick={this.checkout.bind(this,cart)}/>
                        </p>
                    </div>
                    {this.renderInfo(cart.total,cart.tax,cart.dutyFree,cart.buyLimit)}
                </div>
            </div>
        )
    }

    renderCarts(){
        const {carts} = this.props.cartByUser;
        if(carts.length){
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
        return (
            <div>
                <Header>
                    <span className="title">购物车</span>
                </Header>
                {this.renderCarts()}
                <Dialog active={this.state.dialogActive} 
                    onCancel={this.toggleDialog.bind(this)}
                    onConfrim={this.state.dialogOnConfirm}>确定要删除吗?</Dialog>
                <Footer activeIndex="3"/>
            </div>
        )
    }
}
 
export default Cart;