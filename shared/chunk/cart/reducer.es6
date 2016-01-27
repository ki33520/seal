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
                isUpdating:true,
                isUpdated:false
            });
        case FINISH_UPDATE_CART:
            var {cartIndex} = action.param;
            var isUpdated = action.res.isUpdated;
            var carts = state.carts.slice();
            if(isUpdated){
                //carts[cartIndex]=action.res.cart;
            }
            //console.log(action.res)
            return Object.assign({},state,{
                isUpdating:false,
                isUpdated:action.res.isFetched,
                carts
            });
        case START_TOGGLE_ITEM:
            return Object.assign({},state,{
                isToggleing:true,
                isToggled:false
            });
        case FINISH_TOGGLE_ITEM:
            var {cartIndex,groupIndex,goodsIndex,id,checked} = action.param;
            var carts = state.carts.slice();
            if(action.res.isFetched){
                var cart = action.res.cart;
                cart.group[groupIndex].list = carts[cartIndex].group[groupIndex].list;
                cart.group[groupIndex].list[goodsIndex].checked = checked;
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
                isToggled:action.res.isFetched,
                carts:carts
            });
        case START_TOGGLE_ALL:
            return Object.assign({},state,{
                isAllToggling:true,
                isAllToggled:false
            });
        case FINISH_TOGGLE_ALL:
            var {cartIndex,checked} = action.param;
            var carts = state.carts.slice();
            var cart;
            if(action.res.isFetched){
                cart = action.res.cart;
            }else{
                var cart = {...carts[cartIndex]};
                cart.group.forEach((group,i)=>{
                    group.list.forEach((item,j)=>{
                        item.checked = false;
                    });
                })
                cart.checked = false;
                cart.total = '0.00';
                cart.qtys = 0;
                cart.promoTotal = '0.00';
                cart.salesTotal = '0.00';
            }
            carts[cartIndex] = cart;
            return Object.assign({},state,{
                isAllToggling:false,
                isAllToggled:action.res.isFetched,
                carts:carts
            }); 
        case START_DELETE_CART:
            return Object.assign({},state,{
                isDeleting:true,
                isDeleted:false
            });
        case FINISH_DELETE_CART:
            var {cartIndex} = action.param;
            var isDeleted = action.res.isDeleted;
            var carts = state.carts.slice();
            if(isDeleted){

            }
            return Object.assign({},state,{
                isDeleting:false,
                isDeleted,
                carts
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