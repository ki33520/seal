'use strict';

import {combineReducers} from "redux";
import {
    START_DELETE_CART,FINISH_DELETE_CART,
    START_UPDATE_CART,FINISH_UPDATE_CART,
    START_TOGGLE_ITEM,FINISH_TOGGLE_ITEM,
    START_TOGGLE_ALL,FINISH_TOGGLE_ALL,
    START_CHECK_CART,FINISH_CHECK_CART,
    START_CART_BUYED,FINISH_CART_BUYED
} from "./constant.es6";

function cartByUser(state={},action){
    switch(action.type){
        case START_UPDATE_CART:
            return Object.assign({},state,{
                isUpdating:true,
                isUpdated:false
            });
        case FINISH_UPDATE_CART:
            var {cartIndex,groupIndex,goodsIndex,qty,singleCode} = action.param;
            var {isUpdated,isFetched,cart} = action.res;
            var carts = [...state.carts];
            if(isUpdated){
                if(isFetched){
                    var _cart = {...carts[cartIndex]};
                    _cart.total = cart.total;
                    _cart.promoTotal = cart.promoTotal;
                    _cart.salesTotal = cart.salesTotal;
                    _cart.qtys = cart.qtys;
                    _cart.promoName = cart.promoName;
                    _cart.promoType = cart.promoType;
                    cart.group.forEach((items)=>{
                        items.list.forEach((goods)=>{
                            if(goods.singleCode===singleCode){
                                if(goods.stockFlag){
                                    _cart.group[groupIndex].list[goodsIndex].qty = qty;
                                }else{
                                    _cart.group[groupIndex].list[goodsIndex].qty = 1;
                                    _cart.group[groupIndex].list[goodsIndex].checked = false;
                                    if(_cart.group.length===1&&_cart.group[groupIndex].list.length===1){
                                        _cart.checked = false;
                                    }
                                }
                            }
                        });
                    });
                    carts[cartIndex] = _cart;
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
            var cart = {...carts[cartIndex]};
            var _cart = action.res.cart;
            if(action.res.isFetched){
                if(_cart.group[groupIndex].list[goodsIndex].stockFlag){
                    cart.group[groupIndex].list[goodsIndex].checked = checked;
                    cart.checked = checked;
                }else{
                    cart.group[groupIndex].list[goodsIndex].checked = false;
                    if(_cart.group.length===1&&_cart.group[groupIndex].list.length===1){
                        _cart.checked = false;
                    }
                }
                cart.total = _cart.total;
                cart.qtys = _cart.qtys;
                cart.promoTotal = _cart.promoTotal;
                cart.salesTotal = _cart.salesTotal;
                carts[cartIndex] = cart;
            }else{
                carts[cartIndex].checked = false;
                carts[cartIndex].total = '0.00';
                carts[cartIndex].qtys = 0;
                carts[cartIndex].promoTotal = '0.00';
                carts[cartIndex].salesTotal = '0.00';
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
            var cart;
            if(action.res.isFetched){
                cart = action.res.cart;
            }else{
                cart = {...carts[cartIndex]};
                cart.group.forEach((group)=>{
                    group.list.forEach((item)=>{
                        item.checked = false;
                    });
                });
                cart.checked = false;
                cart.total = '0.00';
                cart.qtys = 0;
                cart.promoTotal = '0.00';
                cart.salesTotal = '0.00';
            }
            carts[cartIndex] = cart;
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
            var _cart = {...carts[cartIndex]};
         
            if(isDeleted){
                if(isFetched){
                    _cart.group[groupIndex].list.splice(goodsIndex,1);
                    _cart.total = cart.total;
                    _cart.qtys = cart.qtys;
                    _cart.promoTotal = cart.promoTotal;
                    _cart.salesTotal = cart.salesTotal;
                    carts[cartIndex] = _cart;
                }else{
                    carts.splice(cartIndex,1);
                }
            }
            return Object.assign({},state,{
                isDeleting:false,
                isDeleted:true,
                isUpdating:false,
                isUpdated:true,
                carts
            });
        case START_CART_BUYED:
            return Object.assign({},state,{
                isUpdating:true,
                isUpdated:false
            }); 
        case FINISH_CART_BUYED:
            var {cartIndex,groupIndex,goodsIndex,buyLimit,qtys} = action.param;
            var {isFetched,cart} = action.res;
            var carts = [...state.carts];
          
            if(isFetched){
                var goods = cart.group[0].list[0];
                if(qtys<=goods.buyLimit && goods.stockFlag){
                    var _cart = {...carts[cartIndex]};
                    _cart.group[groupIndex].list[goodsIndex].qty=qtys;
                    carts[cartIndex] = _cart;
                }  
            }
            return Object.assign({},state,{
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
            var {singleCodes,qtys} = action.param;
            var allowSubmit = action.res.allowSubmit;
            var alertContent = action.res.errMsg;
            return Object.assign({},state,{
                isChecking:false,
                isChecked:true,
                alertContent,
                allowSubmit,
                singleCodes,
                qtys
            });
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    cartByUser
})

export default rootReducer;