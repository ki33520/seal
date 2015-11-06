'use strict';
import {apiRequest} from "../../lib/util.es6";

export const REQUEST_GOOD = "REQUEST_GOOD";
export const RECEIVE_GOOD = "RECEIVE_GOOD";
export const START_ADD_CART = "START_ADD_CART";
export const FINISH_ADD_CART = "FINISH_ADD_CART";
export const START_ADD_FAVORITE = "START_ADD_FAVORITE";
export const FINISH_ADD_FAVORITE = "FINISH_ADD_FAVORITE";

function requestGood(param){
    return {
        type:REQUEST_GOOD,
        param
    }
}

function receiveGood(param,res){
    return {
        type:RECEIVE_GOOD,
        receiveAt:Date.now(),
        param,
        res
    }
}

export default function fetchGood(url,param){
    return (dispatch)=>{
        dispatch(requestGood(param));
        return apiRequest(url,param,{
            type:"jsonp",
            jsonpcallback:"jsoncallback"
        }).then((res)=>{
            dispatch(receiveGood(param,res));
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

export function addCart(url,param){
    return (dispatch)=>{
        dispatch(startAddCart(param));
        apiRequest(url,param).then((res)=>{
            dispatch(finishAddCart(param,res));
        })
    }
}


function startAddFavorite(param){
    return {
        type:START_ADD_FAVORITE,
        param:param
    }
}

function finishAddFavorite(param,res){
    return {
        type:FINISH_ADD_FAVORITE,
        param,
        res,
        finishAt:Date.now()
    }
}

export function addFavorite(url,param){
    return (dispatch)=>{
        dispatch(startAddFavorite(param));
        apiRequest(url,param).then((res)=>{
            dispatch(finishAddFavorite(param,res));
        })
    }
}