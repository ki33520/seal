'use strict';
import {apiRequest} from "../../lib/util.es6";

export const START_UPDATE_CART = "START_UPDATE_CART";
export const FINISH_UPDATE_CART = "FINISH_UPDATE_CART";
export const START_FETCH_CART = "START_FETCH_CART";
export const FINISH_FETCH_CART = "FINISH_FETCH_CART";
export const START_DELETE_CART = "START_DELETE_CART";
export const FINISH_DELETE_CART = "FINISH_DELETE_CART";
export const FINISH_UPDATE_BUYED="FINISH_UPDATE_BUYED";
export const FINISH_UPDATE_ITEM = "FINISH_UPDATE_ITEM";
 
function updateBuyed(dispatch,param){
    //dispatch(startFetchCart());
    apiRequest('/fetchCart',param,{method:"POST"}).then((res)=>{
        dispatch(finishUpdateBuyed(res,param));
    });
}

function updateItem(dispatch,param){
    dispatch(startFetchCart());
    apiRequest('/fetchCart',param,{method:"POST"}).then((res)=>{
        dispatch(finishUpdateItem(res,param));
    });
}

function startFetchCart(){
    return {
        type:START_FETCH_CART
    }
}

function finishUpdateBuyed(res,param){
    return {
        type:FINISH_UPDATE_BUYED,
        param,
        res
    }
}

function finishUpdateItem(res,param){
    return {
        type:FINISH_UPDATE_ITEM,
        param,
        res
    }
}

function startUpdateCart(){
    return {
        type:START_UPDATE_CART
    }
}

function finishUpdateCart(res){
    return {
        type:FINISH_UPDATE_CART,
        res
    }
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

export function changeBuyed(param){
    return (dispatch)=>{
        dispatch(startUpdateCart());
        apiRequest('/updateCart',param,{method:"POST"}).then((res)=>{
            dispatch(finishUpdateCart(res));
            updateBuyed(dispatch,param);
        })
    }
}

export function deleteCart(cartId){
    return (dispatch)=>{
        dispatch(startDeleteCart(cartId));
        apiRequest('/deleteCart',cartId,{method:"POST"}).then((res)=>{
            dispatch(finishDeleteCart(cartId,res));
            //fetchCart(dispatch,param);
        })
    }
}

export function changeItem(param){
    return (dispatch)=>{
        dispatch(startUpdateCart());
        apiRequest('/updateCart',param,{method:"POST"}).then((res)=>{
            dispatch(finishUpdateCart(res));
            updateItem(dispatch,param);
        })
    }
}

 