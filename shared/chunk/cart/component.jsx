'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Header from "../common/header.jsx";
import Footer from "../common/footer.jsx";
import MaskLayer from "../../component/masklayer.jsx";
import NumberPicker from "../../component/numberpicker.jsx";
import Alert from "../../component/alert.jsx";
import Dialog from "../../component/dialog.jsx";
import ActivityIndicator from "../common/activityindicator.jsx";
import {base64Encode,formatPrice} from "../../lib/helper.es6";
import {urlParam} from "../../lib/http.es6";
import {jumpURL} from "../../lib/jumpurl.es6";
//import { disableHistoryForwardCacheThen } from "../../lib/util.es6";
 
class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            dialogActive:false,
            dialogMesg:null,
            dialogOnConfirm:null,
            dialogOnCancel:null,
            cancelText:'否',
            confirmText:'是'
        }
        this.buyedStack=[];
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
    /**
    componentWillReceiveProps(nextProps){
        const {isChecked,isWarning,carts,cartIndex,groupIndex,goodsIndex,singleCode} = nextProps.cartByUser;
        const {singleCodes,buyeds} = this.filterParamItems(carts[cartIndex]);       
        if(isChecked&&isWarning){
           
            this.setState({
                dialogActive:true,
                dialogMesg:'商品超出免税额度,是否调整订单?',
                confirmText:'是',
                cancelText:'否',
                dialogOnCancel:()=>{
                    this.toggleDialog();
                    const queryParam = base64Encode(urlParam({
                        itemIds:singleCodes,
                        buyeds
                    }));
                    setTimeout(()=>{
                        window.location.assign(jumpURL("confirmorder",[queryParam]));
                    },200);
                },
                dialogOnConfirm:()=>{
                     this.toggleDialog(),
                     this.props.fetchCart({
                        singleCodes,
                        buyeds,
                        cartIndex,
                        groupIndex,
                        goodsIndex,
                        singleCode
                    });
                }
            });
        }
    }
    */
    componentDidUpdate(){
        if(this.state.dialogActive){
            return false;
        }
        const {
            isUpdated,isToggled,isAllToggled,isDeleted,isPassed,isChecked,isWarning,
            carts,cartIndex,groupIndex,goodsIndex,singleCode
        } = this.props.cartByUser;
        const {singleCodes,buyeds} = this.filterParamItems(carts[cartIndex]);
        if(isUpdated||isToggled||isAllToggled||isDeleted||isChecked){
            if(isPassed||isWarning){
                const queryParam = base64Encode(urlParam({
                    itemIds:singleCodes,
                    buyeds
                }));
                window.location.assign(jumpURL("confirmorder",[queryParam]));
            }else{
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
    }
    componentDidMount(){
        if(document.getElementById('persisted').value){
            this.props.reloadCart()
        }
    }
    checkout(cartIndex){
        const {isChecking,isLogined,loginUrl,carts} = this.props.cartByUser;
        const cart = carts[cartIndex];
        const {singleCodes,buyeds} = this.filterParamItems(cart);
        if(isChecking){
            return false;
        }
        if(cart.isAllowSubmit===false){
            return false;
        }
        if(!isLogined){
            location.href=loginUrl;
            return false;
        }
        document.getElementById('persisted').value=Math.random();
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
        let stack = this.buyedStack;
        if(isUpdating || buyed > maxBuy||false===goods.onSale||goods.stockCount<1){
            return false;
        }
        var updateCart = (buyed)=>{
            this.props.updateCart({
                singleCode,
                buyed,
                maxBuy,
                cartIndex,
                groupIndex,
                goodsIndex
            });
        }
        const timerId=setTimeout(()=>{
            let arg = stack.shift();
            if(stack.length===0){
                updateCart(arg.buyed);
            }
        },500);
        stack.push({timerId,buyed})
    }
    toggleAllChecked(cartIndex){
        const {isAllToggling,carts} = this.props.cartByUser;
        const cart = carts[cartIndex];
        if(isAllToggling) {
            return false;
        }
        if(cart.isDisabled){
            return false;
        }
        const checked = !cart.checked;
        this.props.toggleCartAll({
            cartIndex,
            checked
        });
    }
    toggleItemChecked(goods,cartIndex,groupIndex,goodsIndex){
        const {isToggleing} = this.props.cartByUser;
        const checked = !goods.checked;
        if(isToggleing||false===goods.onSale||goods.stockCount<1) {
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
    handleDeleteCart(goods,cartIndex,groupIndex,goodsIndex){
        const {isDeleting} = this.props.cartByUser;
        if(isDeleting){
            return false;
        }
        this.setState({
            dialogActive:true,
            dialogMesg:'确定要删除吗?',
            confirmText:'确定',
            cancelText:'取消',
            dialogOnCancel:()=>{
                this.toggleDialog()
            },
            dialogOnConfirm:()=>{
                this.toggleDialog(),
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
    renderInfo(cart){
        //const tips = "省钱贴士：单笔订单税金"+cart.dutyFree+"元以内，可以免税哦！";
        const warning = "啊哦，海关规定购买多件的总价（不含税）不能超过￥"+cart.buyLimit+"哦，请您分多次购买。";
        let message = null;

        if(cart.total > cart.buyLimit&&cart.buyeds>1 && cart.hasRate===true){
            message = warning;
        }
        /* 
            else if(cart.dutyFree > 0 && cart.totalTax > cart.dutyFree){
                message = tips;
            }
        */
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
        const minBuy = goods.minStep;
        const buyed = goods.buyed;
        const isInvalid = goods.stockFlag===false||goods.onSale===false;
        // const limitStyle = classNames({
        //     limitBuy:maxBuy
        // });
        const saleOut = classNames({
            "sale-out":goods.stockFlag===false&&goods.onSale,
            "put-off":!goods.onSale
        });
        const invalid = classNames("group",{
            invalid:isInvalid
        })
        const checkbox = classNames({
            "checkbox-on" : goods.checked===true,
            "checkbox-off": goods.checked===false
        })
        return(
            <div className={invalid} key={"g-"+i+j+k}>
                <div className="shanchu" onClick={this.handleDeleteCart.bind(this,goods,i,j,k)}></div>
                <div className="J_moveRight">
                    <div className="checkbox" onClick={this.toggleItemChecked.bind(this,goods,i,j,k)}>
                        <span className={checkbox}></span>
                    </div>
                    <div>
                        <div className="img_wrap">
                            <a className="J_ytag cartlist" href={jumpURL("gooddetail",[goods.singleCode])}>
                                <img width="100%" src={goods.imageUrl} />
                                <div className={saleOut}></div>
                            </a>
                        </div>
                        <div className="gd_info">
                            <a href={jumpURL("gooddetail",[goods.singleCode])}>
                                <p className="name">
                                    <b>{goods.title}</b>
                                    <span>{'￥'+salePrice}</span>
                                </p>
                            </a>
                            <div className="act_wrap"> 
                                <NumberPicker value={buyed} 
                                minimum={minBuy} maximum={maxBuy} step={goods.step}
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
                <div className={manjian}><em>{group.promoType}</em>{group.promoName}</div>
                {goodsList}
            </div>
        );
    }
 
    renderCart(cart,i){
        let groupList = [];
        cart.group.forEach((group,j)=>{
            groupList.push(this.renderGroup(group,i,j));
        });
        const button = classNames("btn_buy",{
            "unable_buy":cart.isAllowSubmit===false
        });
        const promo = classNames("depot_bot",{
            hide:!cart.promoName
        });
        const toggleWrap=classNames("J_store",{
            "clearfix":true,
            "invalid":cart.isDisabled
        });
        const salesTotal = formatPrice(cart.salesTotal);
        const promoTotal = formatPrice(cart.promoTotal);
        const total = formatPrice(cart.total);
        const checkbox = classNames({
            "checkbox-on" : cart.checked===true,
            "checkbox-off": cart.checked===false
        })
        return(
            <div className="onlyList clearfix" key={"cart-" + i}>
                <div className={toggleWrap}>
                <div className="checkbox" onClick={this.toggleAllChecked.bind(this,i)}>
                        <span className={checkbox}></span>
                    </div>
                     
                    <div className="depot">
                        <span>{cart.warehouseName}</span>
                        <div className={promo}><em>{cart.promoType}</em>{cart.promoName}</div>
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
                    {this.renderInfo(cart)}
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
        const {isUpdating,isFetching,alertContent,alertActive} = this.props.cartByUser;
        return (
            <div className="container">
                <Header>
                    <span className="title">购物车</span>
                </Header>
                {this.renderCarts()}
                <Dialog active={this.state.dialogActive} 
                    onCancel={this.state.dialogOnCancel}
                    cancelText={this.state.cancelText}
                    confirmText={this.state.confirmText}
                    onConfrim={this.state.dialogOnConfirm}>{this.state.dialogMesg}</Dialog>
                <Alert active={alertActive} >{alertContent}</Alert>
                <Footer activeIndex="3"/>
                <ActivityIndicator active={isFetching}/>
            </div>
        )
    }
}
 
export default Cart;