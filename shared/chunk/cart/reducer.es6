'use strict';

import {combineReducers} from "redux";
import {START_UPDATE_CART,FINISH_UPDATE_CART,
START_DELETE_CART,FINISH_DELETE_CART,
TOGGLE_ITEM,TOGGLE_CART,TOGGLE_ALL,
START_CALCULATE_PRICE,FINISH_CALCULATE_PRICE} from "./action.es6";
import _ from "lodash";

function cartByUser(state={},action){
    switch(action.type){
        case START_CALCULATE_PRICE:
            return Object.assign({},state,{
                priceUpdating:true
            })
        case FINISH_CALCULATE_PRICE:
            const {priceUpdated,cartsPrice} = action.res;
            return Object.assign({},state,{
                cartsPrice,
                priceUpdated,
                priceUpdating:false
            })
        case TOGGLE_ITEM:
            var carts = {...state.carts};
            carts.list[action.cartIndex].goods[action.goodIndex].checked = action.checked;
            return Object.assign({},state,{
                carts
            });
        case TOGGLE_CART:
            var carts = {...state.carts},cart = carts.list[action.cartIndex];
            cart.checked = action.checked;
            cart.goods = cart.goods.map((good)=>{
                good.checked = action.checked;
                return good;
            })
            carts.list[action.cartIndex] = cart;
            return Object.assign({},state,{
                carts
            })
        case TOGGLE_ALL:
            var carts = {...state.carts};
            carts.checked = action.checked;
            carts.list = carts.list.map((cart)=>{
                cart.checked = action.checked;
                cart.goods = cart.goods.map((good)=>{
                    good.checked = action.checked;
                    return good;
                })
                return cart;
            })
            return Object.assign({},state,{
                carts
            })
        case START_UPDATE_CART:
            return Object.assign({},state,{
                cartUpdating:true,
                cartUpdated:false
            })
        case FINISH_UPDATE_CART:
            var cartUpdated = false;
            var carts = state.carts;
            if(action.res.cartUpdated === true){
                const {cartIndex,goodIndex,buyed} = action.param;
                carts.list[cartIndex].goods[goodIndex].buyed = buyed
                cartUpdated = true;
            }
            return Object.assign({},state,{
                cartUpdating:false,
                cartUpdated,
                carts
            })
        case START_DELETE_CART:
            return Object.assign({},state,{
                cartDeleting:true
            })
        case FINISH_DELETE_CART:
            var cartDeleted = false;
            var carts = state.carts;
            if(action.res.code === "success"){
                const {cartIndex,goodInde} = action.param;
                carts.list[cartIndex].goods.splice(goodIndex,1);
                cartDeleted = true
            }
            return Object.assign({},state,{
                cartDeleting:false,
                cartDeleted,
                carts
            })
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    cartByUser
})

export default rootReducer;