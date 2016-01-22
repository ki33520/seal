'use strict';
import {apiRequest} from "../../lib/util.es6";
import {
    START_DELETE_CART,FINISH_DELETE_CART,
    START_UPDATE_CART,FINISH_UPDATE_CART,
    START_TOGGLE_ITEM,FINISH_TOGGLE_ITEM,
    START_TOGGLE_ALL,FINISH_TOGGLE_ALL
} from "./constant.es6";


function startUpdateCart(){
    return {
        type:START_UPDATE_CART
    }
}
 
function finishUpdateCart(dispatch,param){
    apiRequest('/calculatePrice',param,{method:"POST"}).then((res)=>{
        dispatch({
            type:FINISH_UPDATE_CART,
            param,
            res
        });
    });
}

function toggleChecked(param){
    return {
        type:START_TOGGLE_ITEM,
        param
    }
}

function finishChecked(dispatch,param,res){
    dispatch({
        type:FINISH_TOGGLE_ITEM,
        param,
        res
    });
}

function toggleCheckedAll(param){
    return {
        type:START_TOGGLE_ALL,
        param
    }
}

function finishCheckedAll(dispatch,param,res){
    dispatch({
        type:FINISH_TOGGLE_ALL,
        param,
        res
    });
}

function startDeleteCart(){
    return {
        type:START_DELETE_CART
    }
}

function finishDeleteCart(dispatch){
    apiRequest('/cart').then((res)=>{
        dispatch({
            type:FINISH_DELETE_CART,
            res
        });
    });
}

export function updateCart(param){
    return (dispatch)=>{
        dispatch(startUpdateCart());
        apiRequest('/updateCart',param,{method:"POST"}).then((res)=>{
            finishUpdateCart(dispatch,param,res);
        })
    }
}

export function deleteCart(param){
    return (dispatch)=>{
        dispatch(startDeleteCart());
        apiRequest('/deleteCart',param,{method:"POST"}).then((res)=>{
            if(res.isDeleted){
                finishDeleteCart(dispatch);
            }
        })
    }
}

export function toggleCartItem(param){
    return (dispatch)=>{
        dispatch(toggleChecked(param));
        apiRequest('/calculatePrice',param,{method:"POST"}).then((res)=>{
            finishChecked(dispatch,param,res);
        })
    }
}

export function toggleCartAll(param){
    return (dispatch)=>{
        dispatch(toggleCheckedAll(param));
        apiRequest('/calculatePrice',param,{method:"POST"}).then((res)=>{
            finishCheckedAll(dispatch,param,res);
        })
    }
}