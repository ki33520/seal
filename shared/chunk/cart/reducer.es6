'use strict';

import {combineReducers} from "redux";
import _ from "lodash";
import {
    START_DELETE_CART,FINISH_DELETE_CART,
    START_UPDATE_CART,FINISH_UPDATE_CART,
    START_TOGGLE_ITEM,FINISH_TOGGLE_ITEM,
    START_TOGGLE_ALL,FINISH_TOGGLE_ALL,
    START_CHECK_CART,FINISH_CHECK_CART,
    CHANGE_CART_BUYED
} from "./constant.es6";

function cartByUser(state={},action){
    switch(action.type){
        case START_UPDATE_CART:
            return Object.assign({},state,{
                isUpdating:true,
                isUpdated:false
            });
        case FINISH_UPDATE_CART:
            var {cartIndex} = action.param;
            var {isUpdated,isFetched,cart} = action.res;
            var carts = [...state.carts];
            if(isUpdated){
                if(isFetched){
                    carts[cartIndex] = cart;
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
                cart.group[groupIndex].list[goodsIndex].checked = checked;
                cart.total = _cart.total;
                cart.qtys = _cart.qtys;
                cart.promoTotal = _cart.promoTotal;
                cart.salesTotal = _cart.salesTotal;
                cart.checked = true;
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
        case CHANGE_CART_BUYED:
            var {cartIndex,groupIndex,goodsIndex,buyLimit,qty} = action.param;
            var carts = [...state.carts];
            if(qty<=buyLimit){
                var cart = {...carts[cartIndex]};
                cart.group[groupIndex].list[goodsIndex].qty=qty;
                carts[cartIndex] = cart;
            }
            return Object.assign({},state,{
                carts
            });
        case START_CHECK_CART:
            return Object.assign({},state,{
                isChecking:true,
                isChecked:false
            });
        case FINISH_CHECK_CART:
            var isChecked = false;
            var allowSubmit = false;
            var {cartIndex,singleCodes,qtys} = action.param;
            var carts = [...state.carts];
            var cart = action.res.cart;
            var alertContent = '';
            if(action.res.isFetched){
                isChecked = true;
                if(cart){
                    if(carts[cartIndex].total === cart.total){
                        allowSubmit = true;
                    }else{
                        alertContent = '商品价格发生变化，请重新结算!';
                        carts[cartIndex] = cart;
                    }
                }else{
                    carts.splice(cartIndex,1);
                    alertContent = '该商品已下架!';
                }
            }
            return Object.assign({},state,{
                isChecking:false,
                isChecked,
                alertContent,
                allowSubmit,
                params:{
                    itemIds:singleCodes,
                    buyeds:qtys
                },
                carts
            });
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    cartByUser
})

export default rootReducer;