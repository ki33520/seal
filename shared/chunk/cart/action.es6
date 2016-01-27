'use strict';
import {apiRequest} from "../../lib/util.es6";
import {
    START_DELETE_CART,FINISH_DELETE_CART,
    START_UPDATE_CART,FINISH_UPDATE_CART,
    START_TOGGLE_ITEM,FINISH_TOGGLE_ITEM,
    START_TOGGLE_ALL,FINISH_TOGGLE_ALL,
    CHANGE_CART_BUYED
} from "./constant.es6";


function startUpdateCart(){
    return {
        type:START_UPDATE_CART
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

function finishChecked(param,res){
    return{
        type:FINISH_TOGGLE_ITEM,
        param,
        res
    };
}

function toggleCheckedAll(param){
    return {
        type:START_TOGGLE_ALL,
        param
    }
}

function finishCheckedAll(param,res){
    return {
        type:FINISH_TOGGLE_ALL,
        param,
        res
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

export function updateCart(param){
    return (dispatch)=>{
        dispatch(startUpdateCart());
        apiRequest('/updatecart',param,{method:"POST"}).then((res)=>{
            if(res.isUpdated){
                apiRequest('/fetchcart',param,{method:"POST"}).then((resp)=>{
                    resp.isUpdated = true;
                    dispatch(finishUpdateCart(param,resp));
                });
            }else{
                dispatch(finishUpdateCart(param,res));
            }
        })
    }
}

export function deleteCart(param){
    return (dispatch)=>{
        dispatch(startDeleteCart(param));
        apiRequest('/deletecart',param,{method:"POST"}).then((res)=>{
            if(res.isDeleted){
                apiRequest('/fetchcart',param,{method:"POST"}).then((resp)=>{
                    resp.isDeleted = true;
                    dispatch(finishDeleteCart(param,resp));
                });
            }else{
                dispatch(finishDeleteCart(param,res));
            }
        })
    }
}

export function toggleCartItem(param){
    return (dispatch)=>{
        dispatch(toggleChecked(param));
        apiRequest('/fetchcart',param,{method:"POST"}).then((res)=>{
            dispatch(finishChecked(param,res));
        })
    }
}

export function toggleCartAll(param){
    return (dispatch)=>{
        dispatch(toggleCheckedAll(param));
        apiRequest('/fetchcart',param,{method:"POST"}).then((res)=>{
            dispatch(finishCheckedAll(param,res));
        })
    }
}

export function testBuyed(param){
    return {
        type:CHANGE_CART_BUYED,
        param
    }
}
