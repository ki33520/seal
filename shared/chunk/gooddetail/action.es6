'use strict';
import {apiRequest} from "../../lib/util.es6";
import {
    SELECT_ATTR,
    REQUEST_GOOD,RESPONSE_GOOD,
    START_ADD_CART,FINISH_ADD_CART,
    START_ADD_FAVORITE,FINISH_ADD_FAVORITE
} from "./constant.es6";

export function selectAttr(attr,attrValue){
    return {
        type:SELECT_ATTR,
        attr,
        attrValue
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

export function addFavorite(param){
    return (dispatch)=>{
        dispatch(startAddFavorite(param));
        apiRequest("/addfavorite",param).then((res)=>{
            dispatch(finishAddFavorite(param,res));
        })
    }
}