'use strict';
import {apiRequest} from "../../lib/util.es6";

export const START_UPDATE_CART = "START_UPDATE_CART";
export const FINISH_UPDATE_CART = "FINISH_UPDATE_CART";
export const START_FETCH_CART = "START_FETCH_CART";
export const FINISH_FETCH_CART = "FINISH_FETCH_CART";
 
function fetchCart(dispatch){
    dispatch(startFetchCart());
    apiRequest('/cart').then((resp)=>{
        console.log(resp)
        resp.object[0].qtys = 99;
        dispatch(finishFetchCart(resp));
    });
}

function startFetchCart(){
    return {
        type:START_FETCH_CART
    }
}

function finishFetchCart(res){
    return {
        type:FINISH_FETCH_CART,
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

function startReadCart(dispatch){
    console.log(dispatch)
}

export function updateCart(param){
    return (dispatch)=>{
        dispatch(startUpdateCart());
        apiRequest('/updateCart',param,{method:"POST"}).then((res)=>{
            dispatch(finishUpdateCart(res));
            fetchCart(dispatch) 
        })
    }
}

 