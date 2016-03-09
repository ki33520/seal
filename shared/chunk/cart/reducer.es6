'use strict';

import {combineReducers} from "redux";
import {
    START_DELETE_CART,FINISH_DELETE_CART,
    START_UPDATE_CART,FINISH_UPDATE_CART,
    START_TOGGLE_ITEM,FINISH_TOGGLE_ITEM,
    START_TOGGLE_ALL,FINISH_TOGGLE_ALL,
    START_CHECK_CART,FINISH_CHECK_CART
} from "./constant.es6";

function cartByUser(state={},action){
    switch(action.type){
        case START_UPDATE_CART:
            return Object.assign({},state,{
                isUpdating:true,
                isUpdated:false
            });
        case FINISH_UPDATE_CART:
            var {cartIndex,groupIndex,goodsIndex,buyed,checked,singleCode} = action.param;
            var {isUpdated,isFetched,cart} = action.res;
            var carts = [...state.carts];
            if(isUpdated){
                if(isFetched){
                     var _cart = {...carts[cartIndex]};
                    if(cart){
                        _cart.total = cart.total;
                        _cart.buyeds = cart.buyeds;
                        _cart.promoName=cart.promoName;
                        _cart.promoType=cart.promoType;
                        _cart.promoTotal = cart.promoTotal;
                        _cart.salesTotal = cart.salesTotal;
                        if(checked){
                            var find;
                            cart.group.forEach((group)=>{
                                if(find) return;
                                group.list.forEach((goods)=>{
                                    if(goods.singleCode===singleCode){
                                        _cart.group[groupIndex].list[goodsIndex]=goods;
                                        find  = true;
                                        return;
                                    }
                                })
                            });
                        }else{
                            _cart.group[groupIndex].list[goodsIndex].buyed=buyed;
                        }
                    }else{
                        _cart.group[groupIndex].list[goodsIndex].buyed=buyed;
                    }
                    carts[cartIndex]=_cart;
                }
            }
            return Object.assign({},state,{
                isUpdating:false,
                isUpdated:true,
                carts
            });
        case START_TOGGLE_ITEM:
            return Object.assign({},state,{
                isToggleing:true,
                isToggled:false,
                isUpdating:true,
                isUpdated:false
            });
        case FINISH_TOGGLE_ITEM:
            var {cartIndex,groupIndex,goodsIndex,singleCode,checked} = action.param;
            var carts = [...state.carts];
            var cart = action.res.cart;
            if(action.res.isFetched){
                var _cart = {...carts[cartIndex]};
                 _cart.group[groupIndex].list[goodsIndex].checked=checked;
                if(cart){
                    _cart.total = cart.total;
                    _cart.buyeds = cart.buyeds;
                    _cart.promoName=cart.promoName;
                    _cart.promoType=cart.promoType;
                    _cart.promoTotal = cart.promoTotal;
                    _cart.salesTotal = cart.salesTotal;
                    _cart.collected=cart.collected;
                    _cart.checked = (_cart.children===cart.collected)?true:false;
                }else{
                    _cart.total = 0;
                    _cart.buyeds = 0;
                    _cart.promoName=null;
                    _cart.promoType=null;
                    _cart.promoTotal = 0;
                    _cart.salesTotal = 0;
                    _cart.checked = false;
                    _cart.collected=0;
                }
                carts[cartIndex]=_cart;
            }
            return Object.assign({},state,{
                isToggleing:false,
                isToggled:true,
                isUpdating:false,
                isUpdated:true,
                carts:carts
            });
        case START_TOGGLE_ALL:
            return Object.assign({},state,{
                isAllToggling:true,
                isAllToggled:false,
                isUpdating:true,
                isUpdated:false
            });
        case FINISH_TOGGLE_ALL:
            var {cartIndex,checked} = action.param;
            var carts = [...state.carts];
            var cart = action.res.cart;
            if(action.res.isFetched){
                if(checked){
                    carts[cartIndex]=cart;
                }else{
                    var _cart = {...carts[cartIndex]};
                    _cart.total = 0;
                    _cart.buyeds = 0;
                    _cart.promoName=null;
                    _cart.promoType=null;
                    _cart.promoTotal = 0;
                    _cart.salesTotal = 0;
                    _cart.collected=0;
                    _cart.group.forEach((group)=>{
                        group.list.forEach((goods)=>{
                            goods.checked = false;
                        });
                    });
                    _cart.checked = false;
                    carts[cartIndex]=_cart;
                }
            }
            return Object.assign({},state,{
                isAllToggling:false,
                isAllToggled:true,
                isUpdating:false,
                isUpdated:true,
                carts:carts
            }); 
        case START_DELETE_CART:
            return Object.assign({},state,{
                isDeleting:true,
                isDeleted:false,
                isUpdating:true,
                isUpdated:false
            });
        case FINISH_DELETE_CART:
            var {cartIndex,groupIndex,goodsIndex} = action.param;
            var {isFetched,isDeleted,cart} = action.res;
            var carts = [...state.carts];
            if(isDeleted){
                if(isFetched){
                     var _cart = {...carts[cartIndex]};
                      _cart.group[groupIndex].list.splice(goodsIndex,1);
                    if(cart){
                        _cart.total = cart.total;
                        _cart.promoTotal = cart.promoTotal;
                        _cart.salesTotal = cart.salesTotal;
                        _cart.promoName = cart.promoName;
                        _cart.promoType = cart.promoType;
                        _cart.buyeds = cart.buyeds;
                        _cart.children = cart.children;
                        _cart.collected -= 1;
                        carts[cartIndex] = _cart;
                    }else{
                        if( _cart.group[groupIndex].list.length===0){
                            _cart.group.splice(groupIndex,1);
                            if(_cart.group.length===0){
                                carts.splice(cartIndex,1);
                            }
                        }
                    }
                }
            }
            return Object.assign({},state,{
                isDeleting:false,
                isDeleted:true,
                isUpdating:false,
                isUpdated:true,
                carts
            });
        case START_CHECK_CART:
            return Object.assign({},state,{
                isChecking:true,
                isChecked:false
            });
        case FINISH_CHECK_CART:
            var {singleCodes,buyeds} = action.param;
            var allowSubmit = action.res.allowSubmit;
            var alertContent = action.res.errMsg;
            return Object.assign({},state,{
                isChecking:false,
                isChecked:true,
                alertContent,
                allowSubmit,
                singleCodes,
                buyeds
            });
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    cartByUser
})

export default rootReducer;