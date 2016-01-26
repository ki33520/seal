'use strict';
import {apiRequest,saveLocalCart,getLocalCartCount} from "../../lib/util.es6";
import {
    SELECT_ATTR,
    REQUEST_CARTCOUNT,RESPONSE_CARTCOUNT,
    REQUEST_ISCOLLECTED,RESPONSE_ISCOLLECTED,
    REQUEST_GOOD,RESPONSE_GOOD,
    START_ADD_CART,FINISH_ADD_CART,
    START_TOGGLE_COLLECTED,FINISH_TOGGLE_COLLECTED,
    REQUEST_COMMENTS,RESPONSE_COMMENTS,
    REQUEST_PROMOTIONS,RESPONSE_PROMOTIONS,
    REQUEST_FLASHBUY,RESPONSE_FLASHBUY
} from "./constant.es6";

export function selectAttr(attr,attrValue){
    return {
        type:SELECT_ATTR,
        attr,
        attrValue
    }
}

function requestCartCount(){
    return {
        type:REQUEST_CARTCOUNT
    }
}

function responseCartCount(res){
    return {
        type:RESPONSE_CARTCOUNT,
        res
    }
}

export function fetchCartCount(){
    return (dispatch)=>{
        dispatch(requestCartCount())
        return apiRequest("/cartcount").then((res)=>{
            if(res.logined === false){
                res.result = getLocalCartCount()
            }
            dispatch(responseCartCount(res))
        })
    }
}

function requestGood(param){
    return {
        type:REQUEST_GOOD,
        param
    }
}

function responseGood(param,res){
    return {
        type:RESPONSE_GOOD,
        param,
        res
    }
}

import {alert} from "../common/action.es6";
export {alert} from "../common/action.es6";

export function fetchGood(param){
    return (dispatch)=>{
        dispatch(requestGood(param));
        return apiRequest("/fetchgood/"+param.id,{}).then((res)=>{
            dispatch(responseGood(param,res));
        });
    }
}

function startAddCart(param){
    return {
        type:START_ADD_CART,
        param:param
    }
}

function finishAddCart(param,res){
    return {
        type:FINISH_ADD_CART,
        param,
        res,
        finishAt:Date.now()
    }
}

export function addCart(param){
    return (dispatch)=>{
        dispatch(startAddCart(param));
        apiRequest("/addcart",param).then((res)=>{
            if(res.logined === false){
                saveLocalCart(param.itemId,param.buyed,false)
                res.cartAdded = true;
            }else{
                if(res.cartAdded){
                    dispatch(alert("添加购物车成功!",3000))
                }else{
                    dispatch(alert(res.errMsg,3000))
                }
            }
            dispatch(finishAddCart(param,res));
        })
    }
}


function startToggleCollected(param){
    return {
        type:START_TOGGLE_COLLECTED,
        param:param
    }
}

function finishToggleCollected(param,res){
    return {
        type:FINISH_TOGGLE_COLLECTED,
        param,
        res,
        finishAt:Date.now()
    }
}

export function toggleCollected(param){
    return (dispatch)=>{
        dispatch(startToggleCollected(param));
        apiRequest("/togglecollected",param).then((res)=>{
            let alertMsg = "";
            if(res.isToggled){
                alertMsg = param.status ? "添加收藏成功!":"取消收藏成功!"
                dispatch(alert(alertMsg,3000))
            }else{
                dispatch(alert(res.errMsg,3000))
            }
            dispatch(finishToggleCollected(param,res));
        })
    }
}

function requestIsCollected(param){
    return {
        type:REQUEST_ISCOLLECTED,
        param
    }
}

function responseIsCollected(param,res){
    return {
        type:RESPONSE_ISCOLLECTED,
        param,
        res
    }
}

export function fetchIsCollected(param){
    return (dispatch)=>{
        dispatch(requestIsCollected(param))
        return apiRequest("/iscollected",param).then((res)=>{
            dispatch(responseIsCollected(param,res))
        })
    }
}

function requestComments(param){
    return {
        type:REQUEST_COMMENTS,
        param
    }
}

function responseComments(param,res){
    return {
        type:RESPONSE_COMMENTS,
        param,
        res
    }
}

export function fetchComments(param){
    return (dispatch)=>{
        dispatch(requestComments(param))
        return apiRequest("/goodcomment",param).then((res)=>{
            dispatch(responseComments(param,res))
        })
    }
}