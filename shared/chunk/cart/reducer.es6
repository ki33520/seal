'use strict';

import {combineReducers} from "redux";
import {
    START_DELETE_CART,FINISH_DELETE_CART,
    START_UPDATE_CART,FINISH_UPDATE_CART,
    START_TOGGLE_ITEM,FINISH_TOGGLE_ITEM,
    START_TOGGLE_ALL,FINISH_TOGGLE_ALL,
    START_CHECK_CART,FINISH_CHECK_CART,
    START_FETCH_CART,FINISH_FETCH_CART,
    START_RELOAD_CART,FINISH_RELOAD_CART
} from "./constant.es6";
 
import {SHOW_ALERT,HIDE_ALERT} from "../common/constant.es6";
import {alertReducer,cartByCount} from "../common/reducer.es6";

function cartByUser(state={},action){
    switch(action.type){
        case START_UPDATE_CART:
            return Object.assign({},state,{
                isUpdating:true,
                isFetching:true,
                isUpdated:false,
                isChecked:false,
                isPassed:false
            });
        case FINISH_UPDATE_CART:
            var carts = state.carts.slice();
            var {cartIndex,groupIndex,goodsIndex,buyed} = action.param;
            var cart = {...carts[cartIndex]};
            var goods = {...cart.group[groupIndex].list[goodsIndex]};
            var isUpdated = false;
            if(action.res.isUpdated){
                isUpdated = true;
                goods.buyed=buyed;
                cart.group[groupIndex].list[goodsIndex]=goods;
                carts[cartIndex] = cart;
            }
            return Object.assign({},state,{
                isUpdating:false,
                isUpdated:isUpdated,
                isFetching:false,
                singleCode:goods.singleCode,
                cartIndex,
                groupIndex,
                goodsIndex,
                carts
            });
        case START_FETCH_CART:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false,
                isUpdated:false,
                isToggled:false,
                isAllToggled:false,
                isDeleted:false,
                isChecked:false,
                isPassed:false
            });
        case FINISH_FETCH_CART:
            var carts = state.carts.slice();
            var {cartIndex,groupIndex,goodsIndex,singleCode,singleCodes} = action.param;
            var cart = action.res.cart[0];
            var isFetched = false;
            if(action.res.isFetched){
                isFetched = true;
                var _cart = {...carts[cartIndex]};
                if(_cart.children>0){
                    if(singleCodes.indexOf(singleCode)!= -1){
                        cart.group.forEach((group)=>{
                            group.list.forEach((item)=>{
                                if(item.singleCode===singleCode){
                                    var _goods = _cart.group[groupIndex].list[goodsIndex];
                                    var cartId = _goods.cartId;
                                    _cart.group[groupIndex].list[goodsIndex] = item;
                                    _cart.group[groupIndex].list[goodsIndex].cartId=cartId;
                                }
                            })
                        })
                    }
                    _cart.total = cart.total;
                    _cart.buyeds = cart.buyeds;
                    //_cart.promoName=cart.promoName;
                    //_cart.promoType=cart.promoType;
                    _cart.promoTotal = cart.promoTotal;
                    _cart.salesTotal = cart.salesTotal;
                    _cart.collected=cart.collected;
                    _cart.totalTax = cart.totalTax;
                    _cart.checked = _cart.children===_cart.collected;
                    _cart.isAllowSubmit=cart.isAllowSubmit;
                    carts[cartIndex] = _cart;
                }
            }
            return Object.assign({},state,{
                isFetching:false,
                isFetched:isFetched,
                carts
            });
        case START_TOGGLE_ITEM:
            return Object.assign({},state,{
                isToggleing:true,
                isToggled:false,
                isChecked:false,
                isPassed:false
            });
        case FINISH_TOGGLE_ITEM:
            var {cartIndex,groupIndex,goodsIndex,checked} = action.param;
            var carts = state.carts.slice();
            var cart  = {...carts[cartIndex]};
            var goods = {...cart.group[groupIndex].list[goodsIndex]};
            goods.checked = checked;
            if(checked){
                cart.collected +=1;
            }else{
                cart.collected -=1;
            }
            cart.group[groupIndex].list[goodsIndex]=goods;
            cart.checked = cart.children===cart.collected;
            carts[cartIndex] = cart;
            return Object.assign({},state,{
                isToggleing:false,
                isToggled:true,
                singleCode:goods.singleCode,
                cartIndex,
                groupIndex,
                goodsIndex,
                carts:carts
            });
        case START_TOGGLE_ALL:
            return Object.assign({},state,{
                isAllToggling:true,
                isAllToggled:false,
                isChecked:false,
                isPassed:false
            });
        case FINISH_TOGGLE_ALL:
            var {cartIndex,checked} = action.param;
            var carts = state.carts.slice();
            var cart = {...carts[cartIndex]};
            cart.checked = checked;
            _.each(cart.group,(group,i)=>{
                _.each(group.list,(goods,j)=>{
                    if(goods.onSale&&goods.stockCount>0){
                        cart.group[i].list[j] = {...goods,checked}
                    }
                })
            });
            carts[cartIndex] = cart;
            return Object.assign({},state,{
                isAllToggling:false,
                isAllToggled:true,
                carts:carts,
                cartIndex
            }); 
        case START_DELETE_CART:
            return Object.assign({},state,{
                isDeleting:true,
                isDeleted:false,
                isChecked:false,
                isPassed:false
            });
        case FINISH_DELETE_CART:
            var {cartIndex,groupIndex,goodsIndex,checked} = action.param;
            var {isDeleted} = action.res;
            var carts = state.carts.slice();
            var cart = {...carts[cartIndex]};
            if(isDeleted){
                cart.group[groupIndex].list.splice(goodsIndex,1);
                if(checked){
                    cart.collected -=1;
                }
                cart.children -=1;
                if(cart.group[groupIndex].list.length===0){
                    cart.group.splice(groupIndex,1);
                    if(cart.group.length===0){
                        carts.splice(cartIndex,1);
                        cart = null;
                    }
                }
                if(cart){
                    cart.checked = cart.collected===cart.children;
                    carts[cartIndex] = cart;
                }
            }
            return Object.assign({},state,{
                isDeleting:false,
                isDeleted:isDeleted,
                carts,
                cartIndex
            });
        case START_CHECK_CART:
            return Object.assign({},state,{
                isChecking:true,
                isFetching:true,
                isChecked:false,
                isPassed:false
            });
        case FINISH_CHECK_CART:
            var {cartIndex} = action.param;
            var {returnCode} = action.res;
            var carts = state.carts.slice();
            var cart = {...carts[cartIndex]};
            var isPassed = false;
            carts[cartIndex] = cart;
            if(returnCode===0||returnCode===-402111){
                isPassed = true;
            }
            return Object.assign({},state,{
                isChecking:false,
                isFetching:false,
                isChecked:true,
                isPassed,
                cartIndex,
                carts
            });
        case START_RELOAD_CART:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false,
                isChecked:false
            }); 
        case FINISH_RELOAD_CART:
            var carts = state.carts.slice();
            var isFetched = action.res.isFetched;
            if(isFetched){
                carts = action.res.carts;
            }
            return Object.assign({},state,{
                isFetched,
                isFetching:false,
                carts
            });
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    cartByUser,
    cartByCount
});

export default rootReducer;