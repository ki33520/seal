'use strict';

import {combineReducers} from "redux";
import _ from "lodash";
import {
    START_DELETE_CART,FINISH_DELETE_CART,
    START_UPDATE_CART,FINISH_UPDATE_CART,
    START_TOGGLE_ITEM,FINISH_TOGGLE_ITEM,
    START_TOGGLE_ALL,FINISH_TOGGLE_ALL,
    TOGGLE_ALL_NOT
} from "./constant.es6";

function cartByUser(state={},action){
    switch(action.type){
        case START_UPDATE_CART:
            return Object.assign({},state,{
                isFetching:true
            });
        case FINISH_UPDATE_CART:
            return Object.assign({},state,{
                isFetching:false,
                carts:action.res.carts
            });
        case START_TOGGLE_ITEM:
            return Object.assign({},state,{
                isFetched:false
            });
        case FINISH_TOGGLE_ITEM:
            var {cartIndex,groupIndex,goodsIndex,checked} = action.param;
            var carts = action.res.cart;
            carts[cartIndex].list[groupIndex].list[goodsIndex].qty=state.carts[cartIndex].list[groupIndex].list[goodsIndex].qty;
            carts[cartIndex].list[groupIndex].list[goodsIndex].checked = checked;
            if(carts[cartIndex].buyeds.length===1){
                carts[cartIndex].checked = checked;
            }

            return Object.assign({},state,{
                isFetched:action.res.isFetched,
                carts:carts
            });
        case START_DELETE_CART:
            return Object.assign({},state,{
                isDeleted:false
            });
        case FINISH_DELETE_CART:
            return Object.assign({},state,{
                isDeleted:action.res.isDeleted,
                carts:action.res.carts
            });
        case FINISH_TOGGLE_ALL:
            var carts = action.res.carts; 
            return Object.assign({},state,{
                isFetching:false,
                isFetched:action.res.isFetched,
                carts
            });
        case TOGGLE_ALL_NOT:
            var cartIndex = action.param.cartIndex;
            var carts = state.carts.slice();
            var cart = Object.assign({},carts[cartIndex]);
            cart.checked = false;
            cart.buyeds.forEach((item,i)=>{
                cart.buyeds[i] = 0;
            });
            cart.total = 0;
            cart.promoTotal = 0;
            cart.qtys = 0;
            cart.salesTotal = 0;
            cart.list.forEach((group,i)=>{
                group.list.forEach((goods,j)=>{
                    cart.list[i].list[j].checked = false;
                })
            });
            carts[cartIndex] = cart;
            return Object.assign({},state,{
                isFetching:false,
                isFetched:true,
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