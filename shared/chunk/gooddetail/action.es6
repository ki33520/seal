'use strict';
import {apiRequest} from "../../lib/http.es6";
import {
    TOGGLE_ATTR,CHANGE_BUYED,
    REQUEST_CARTCOUNT,RESPONSE_CARTCOUNT,
    REQUEST_ISCOLLECTED,RESPONSE_ISCOLLECTED,
    REQUEST_GOOD,RESPONSE_GOOD,
    START_ADD_CART,FINISH_ADD_CART,
    START_TOGGLE_COLLECTED,FINISH_TOGGLE_COLLECTED,
    REQUEST_COMMENTS,RESPONSE_COMMENTS,SELECT_COMMENTIMAGE,
    REQUEST_SHOWUPS,RESPONSE_SHOWUPS,
    REQUEST_PROMOTIONS,RESPONSE_PROMOTIONS,
    REQUEST_FLASHBUY,RESPONSE_FLASHBUY,
    REQUEST_SHAREDWEIXIN,RESPONSE_SHAREDWEIXIN
} from "./constant.es6";

import {jumpURL,urlPrefix} from "../../lib/jumpurl.es6";

export function changeBuyed(buyed){
    return {
        type:CHANGE_BUYED,
        buyed
    }
}

export function toggleAttr(attrName,attrValue){
    return {
        type:TOGGLE_ATTR,
        attrName,
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
        return apiRequest(urlPrefix + "/cartcount").then((res)=>{
            // if(res.logined === false){
            //     res.result = getLocalCartCount()
            // }
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
        return apiRequest(jumpURL("gooddetail",[param.id]),{}).then((res)=>{
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
        apiRequest(urlPrefix + "/addcart",param).then((res)=>{
            // if(res.logined === false){
            //     saveLocalCart(param.itemId,param.buyed,false)
            //     res.cartAdded = true;
            // }else{
            if(res.cartAdded){
                dispatch(alert("已成功加入购物车",1000))
            }else{
                dispatch(alert(res.errMsg,1000))
            }
            // }
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
        apiRequest(urlPrefix + "/togglecollected",param).then((res)=>{
            let alertMsg = "";
            if(res.isToggled){
                alertMsg = param.status ? "已成功收藏":"已取消收藏"
                dispatch(alert(alertMsg,1000))
            }else{
                dispatch(alert(res.errMsg,1000))
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
        return apiRequest(urlPrefix + "/iscollected",param).then((res)=>{
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
        return apiRequest(urlPrefix + "/goodcomment",Object.assign({},param,{
            hasImage:false
        })).then((res)=>{
            dispatch(responseComments(param,res))
        })
    }
}

function requestShowups(param){
    return {
        type:REQUEST_SHOWUPS,
        param
    }
}

function responseShowups(param,res){
    return {
        type:RESPONSE_SHOWUPS,
        param,
        res
    }
}

export function fetchShowups(param){
    return (dispatch)=>{
        dispatch(requestShowups(param))
        return apiRequest(urlPrefix + "/goodcomment",Object.assign({},param,{
            hasImage:true
        })).then((res)=>{
            dispatch(responseShowups(param,res))
        })
    }
}

export function selectCommentImage(index,list){
    return {
        type:SELECT_COMMENTIMAGE,
        index,
        list
    }
}

function requestSharedWeixin(param){
    return {
        type:REQUEST_SHAREDWEIXIN,
        param
    }
}

function responseSharedWeixin(param,res){
    return {
        type:RESPONSE_SHAREDWEIXIN,
        param,
        res
    }
}

export function fetchSharedWeixin(param){
    return (dispatch)=>{
        dispatch(requestSharedWeixin(param))
        return apiRequest(urlPrefix + "/sharedweixin",param).then((res)=>{
            dispatch(responseSharedWeixin(param,res))
        })
    }
}