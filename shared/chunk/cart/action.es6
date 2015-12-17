'use strict';
import {apiRequest} from "../../lib/util.es6";

export const START_UPDATE_CART = "START_UPDATE_CART";
export const FINISH_UPDATE_CART = "FINISH_UPDATE_CART";
export const FINISH_DELETE_CART = "FINISH_DELETE_CART";
export const FINISH_TOGGLE_CART = "FINISH_TOGGLE_CART";
export const FINISH_TOGGLE_ALL = "FINISH_TOGGLE_ALL";
export const FINISH_TOGGLE_NOT = "FINISH_TOGGLE_NOT";

function startUpdateCart(){
    return {
        type:START_UPDATE_CART
    }
}
 
function finishUpdateCart(dispatch,param){
    apiRequest('/fetchCart',param,{method:"POST"}).then((res)=>{
        dispatch({
            type:FINISH_UPDATE_CART,
            param,
            res
        });
    });
}


function finishToggleCart(dispatch,param){
    apiRequest('/fetchCart',param,{method:"POST"}).then((res)=>{
        dispatch({
            type:FINISH_TOGGLE_CART,
            param,
            res
        });
    });
}


function finishDeleteCart(dispatch,param){

    apiRequest('/fetchCart',param,{method:"POST"}).then((res)=>{
        dispatch({
            type:FINISH_DELETE_CART,
            param,
            res
        });
    });
}


function finishToggleAllChecked(dispatch,param){

    apiRequest('/fetchCart',param,{method:"POST"}).then((res)=>{
        dispatch({
            type:FINISH_TOGGLE_ALL,
            param,
            res
        });
    });
}

function toggleAllChecked(dispatch,param){
    dispatch({
        type:FINISH_TOGGLE_NOT,
        param
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
        dispatch(startUpdateCart());
        apiRequest('/deleteCart',param,{method:"POST"}).then((res)=>{
            finishDeleteCart(dispatch,param);
        })
    }
}

export function toggleCart(param){
    return (dispatch)=>{
        dispatch(startUpdateCart());
        apiRequest('/updateCart',param,{method:"POST"}).then((res)=>{
            finishToggleCart(dispatch,param);
        })
    }
}

export function toggleAll(param){
    return (dispatch)=>{
        if(param.checked===false){
            toggleAllChecked(dispatch,param);
        }else{
            dispatch(startUpdateCart());
            finishToggleAllChecked(dispatch,param);
        }
    }
}