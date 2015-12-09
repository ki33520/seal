'use strict';
import {apiRequest} from "../../lib/util.es6";

export const START_UPDATE_CART = "START_UPDATE_CART";
export const FINISH_UPDATE_CART = "FINISH_UPDATE_CART";
export const START_DELETE_CART = "START_DELETE_CART";
export const FINISH_DELETE_CART = "FINISH_DELETE_CART";
export const TOGGLE_ITEM = "TOGGLE_ITEM";
export const TOGGLE_CART = "TOGGLE_CART";
export const TOGGLE_ALL = "TOGGLE_ALL";
export const START_CALCULATE_PRICE = "START_CALCULATE_PRICE";
export const FINISH_CALCULATE_PRICE = "FINISH_CALCULATE_PRICE";

function startCalculatePrice(param){
    return {
        type:START_CALCULATE_PRICE,
        param
    }
}

function finishCalculatePrice(param,res){
    return {
        type:FINISH_CALCULATE_PRICE,
        param,
        res,
        finishAt:Date.now()
    }
}

export function calculatePrice(url,param){
    return (dispatch)=>{
        dispatch(startCalculatePrice(param));
        apiRequest(url,param).then((resp)=>{
            dispatch(finishCalculatePrice(param,res));
        })
    }
}

export function toggleAll(checked){
    return (dispatch)=>{
        dispatch(toggleAllChecked(checked));
        setTimeout(()=>{
            dispatch(calculateSumPrice());
        },100)
    }
}

function toggleAllChecked(checked){
    return {
        type:TOGGLE_ALL,
        checked
    }
}

function toggleCartChecked(cartIndex,checked){
    return {
        type:TOGGLE_CART,
        cartIndex,
        checked
    }
}

export function toggleCart(cartIndex,checked){
    return (dispatch)=>{
        dispatch(toggleCartChecked(cartIndex,checked));
        setTimeout(()=>{
            dispatch(calculateSumPrice());    
        },100)
    }
}

function toggleItemChecked(cartIndex,goodIndex,checked){
    return {
        type:TOGGLE_ITEM,
        cartIndex,
        goodIndex,
        checked
    }
}

export function toggleItem(cartIndex,goodIndex,checked){
    return (dispatch)=>{
        dispatch(toggleItemChecked(cartIndex,goodIndex,checked));
        setTimeout(()=>{
            dispatch(calculateSumPrice());    
        },100)
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

export function updateCart(url,param){
    return (dispatch)=>{
        dispatch(startUpdateCart(param));
        apiRequest(url,param,{method:"POST"}).then((res)=>{
            dispatch(finishUpdateCart(param,res));
        })
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

export function deleteCart(url,param){
    return (dispatch)=>{
        dispatch(startDeleteCart(param));
        apiRequest(url,param,{method:"POST"}).then((res)=>{
            dispatch(finishDeleteCart(param,res))
        })
    }
}