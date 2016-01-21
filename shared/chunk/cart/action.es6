'use strict';
import {apiRequest} from "../../lib/util.es6";
import {
    START_DELETE_CART,FINISH_DELETE_CART,
    START_UPDATE_CART,FINISH_UPDATE_CART,
    START_TOGGLE_ITEM,FINISH_TOGGLE_ITEM,
    START_TOGGLE_ALL,FINISH_TOGGLE_ALL,
    TOGGLE_ALL_NOT
} from "./constant.es6";


function startUpdateCart(){
    return {
        type:START_UPDATE_CART
    }
}

function startDeleteCart(){
    return {
        type:START_DELETE_CART
    }
}
 
function finishUpdateCart(dispatch,param){
    apiRequest('/cart',param,{method:"POST"}).then((res)=>{
        dispatch({
            type:FINISH_UPDATE_CART,
            param,
            res
        });
    });
}

function startToggleCart(){
    return {
        type:START_TOGGLE_ITEM
    }
}

function finishToggleCart(dispatch,param,res){
    dispatch({
        type:FINISH_TOGGLE_ITEM,
        param,
        res
    });
}


function finishDeleteCart(dispatch){

    apiRequest('/cart').then((res)=>{
        dispatch({
            type:FINISH_DELETE_CART,
            res
        });
    });
}

function strtToggleAllChecked(){
    return {
        type:START_TOGGLE_ALL
    }
}

function finishToggleAllChecked(dispatch,res){

    dispatch({
        type:FINISH_TOGGLE_ALL,
        res
    });
}
 

export function updateCart(param){
    return (dispatch)=>{
        dispatch(startUpdateCart());
        apiRequest('/updateCart',param,{method:"POST"}).then((res)=>{
            res.isUpdated && finishUpdateCart(dispatch,param,res);
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

export function toggleCart(param){
    return (dispatch)=>{
        dispatch(startToggleCart());
        apiRequest('/calculatePrice',param,{method:"POST"}).then((res)=>{
            finishToggleCart(dispatch,param,res);
        })
    }
}

export function toggleAllChecked(){
    return (dispatch)=>{
        dispatch(strtToggleAllChecked());
        apiRequest('/cart').then((res)=>{
            finishToggleAllChecked(dispatch,res);
        })
    }
}

export function toggleAllNotChecked(param){
    return {
        type:TOGGLE_ALL_NOT,
        param
    }
}
