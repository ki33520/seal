'use strict';

import {combineReducers} from "redux";
import _ from "lodash";
import {
    START_DELETE_CART,FINISH_DELETE_CART,
    START_UPDATE_CART,FINISH_UPDATE_CART,
    START_TOGGLE_ITEM,FINISH_TOGGLE_ITEM,
    START_TOGGLE_ALL,FINISH_TOGGLE_ALL,
    CHANGE_CART_NUM
} from "./constant.es6";

function cartByUser(state={},action){
    switch(action.type){
        case START_UPDATE_CART:
            return Object.assign({},state,{
                cartUpdating:true,
                cartUpdated:false
            });
        case FINISH_UPDATE_CART:
            var {cartIndex} = action.param;
            var carts = state.carts;
            carts[cartIndex] = action.res.carts[0];
            return Object.assign({},state,{
                cartUpdating:false,
                cartUpdated:action.res.isFetched,
                carts
            });
        case START_TOGGLE_ITEM:
            return Object.assign({},state,{
                cartChanging:true,
                cartChanged:false
            });
        case FINISH_TOGGLE_ITEM:
            var {cartIndex,id,checked} = action.param;
            var carts = state.carts;
            var cart = action.res.carts[0];
            cart.group = carts[cartIndex].group;
            cart.checked = cart.qtys > 0 ? true : false;
            cart.group.forEach((group)=>{
                group.list.forEach((item)=>{
                    if(item.id===id){
                        item.checked = checked;
                    }
                })
            })
            carts[cartIndex] = cart;
            return Object.assign({},state,{
                cartChanging:false,
                cartChanged:action.res.isFetched,
                carts:carts
            });
        case START_TOGGLE_ALL:
            return Object.assign({},state,{
                cartToggling:true,
                cartToggled:false
            });
        case FINISH_TOGGLE_ALL:
            var {cartIndex,checked} = action.param;
            var carts = state.carts;
            var cart = action.res.carts[0];
            cart.group = carts[cartIndex].group;
            cart.checked = checked;
            cart.group.forEach((group)=>{
                group.list.forEach((item)=>{
                    item.checked = checked;
                })
            })
            carts[cartIndex] = cart;
            return Object.assign({},state,{
                cartChanging:false,
                cartChanged:action.res.isFetched,
                carts:carts
            }); 
        case START_DELETE_CART:
            return Object.assign({},state,{
                isDeleting:true,
                isDeleted:false
            });
        case FINISH_DELETE_CART:
            return Object.assign({},state,{
                isDeleting:false,
                isDeleted:action.res.isDeleted,
                carts:action.res.carts
            });
        case CHANGE_CART_NUM:
            var carts = state.carts;
            var {cartIndex,id,qty} = action.param;
            carts[cartIndex].group.forEach((group)=>{
                group.list.forEach((item)=>{
                    if(item.id===id){
                        item.qty = qty;
                    }
                })
            });
            return Object.assign({},state,{
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