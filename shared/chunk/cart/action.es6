'use strict';
import {apiRequest} from "../../lib/util.es6";
import {
    START_DELETE_CART,FINISH_DELETE_CART,
    START_UPDATE_CART,FINISH_UPDATE_CART,
    START_TOGGLE_ITEM,FINISH_TOGGLE_ITEM,
    START_TOGGLE_ALL,FINISH_TOGGLE_ALL,
    START_CHECK_CART,FINISH_CHECK_CART,
    START_FETCH_CART,FINISH_FETCH_CART
} from "./constant.es6";

function startFetchCart(param){
    return {
        type:START_FETCH_CART,
        param
    }
}
function finishFetchCart(param,res){
    return {
        type:FINISH_FETCH_CART,
        param,
        res
    }
}

function startUpdateCart(param){
    return {
        type:START_UPDATE_CART,
        param
    }
}
 
function finishUpdateCart(param,res){
    return {
        type:FINISH_UPDATE_CART,
        param,
        res
    }
}

function toggleChecked(param){
    return {
        type:START_TOGGLE_ITEM,
        param
    }
}

function finishChecked(param){
    return{
        type:FINISH_TOGGLE_ITEM,
        param
    };
}

function toggleCheckedAll(param){
    return {
        type:START_TOGGLE_ALL,
        param
    }
}

function finishCheckedAll(param){
    return {
        type:FINISH_TOGGLE_ALL,
        param
    };
}

function startDeleteCart(param){
    return {
        type:START_DELETE_CART,
        param
    }
}

function finishDeleteCart(param,res){
    return {
        type:FINISH_DELETE_CART,
        param,
        res
    }
}

function startCheckCart(param){
    return {
        type:START_CHECK_CART,
        param
    }
}

function finishCheckCart(param,res){
    return {
        type:FINISH_CHECK_CART,
        param,
        res
    }
}
 
export function updateCart(param){
    return (dispatch)=>{
        dispatch(startUpdateCart(param));
        apiRequest('/updatecart',param,{method:"POST"}).then((res)=>{
             dispatch(finishUpdateCart(param,res));
        });
    }
}

export function deleteCart(param){
    return (dispatch)=>{
        dispatch(startDeleteCart(param));
        apiRequest('/deletecart',param,{method:"POST"}).then((res)=>{
            dispatch(finishDeleteCart(param,res));
        });
    }
}

export function toggleCartItem(param){
    return (dispatch)=>{
        dispatch(toggleChecked(param));
         setTimeout(()=>{
            dispatch(finishChecked(param));
         },100)
    }
}

export function toggleCartAll(param){
    return (dispatch)=>{
        dispatch(toggleCheckedAll(param));
         setTimeout(()=>{
            dispatch(finishCheckedAll(param));
         },100);
    }
}
 
export function checkCartInfo(param){
    return (dispatch)=>{
        dispatch(startCheckCart(param));
        apiRequest('/checkCart',param,{method:"POST"}).then((res)=>{
            dispatch(finishCheckCart(param,res));
        })
    }
}

export function fetchCart(param){
    return (dispatch)=>{
        dispatch(startFetchCart(param));
        apiRequest('/fetchcart',param,{method:"POST"}).then((res)=>{
            dispatch(finishFetchCart(param,res));
        });
    }
}