'use strict';
import {apiRequest} from "../../lib/http.es6";
import {
    START_DELETE_CART,FINISH_DELETE_CART,
    START_UPDATE_CART,FINISH_UPDATE_CART,
    START_TOGGLE_ITEM,FINISH_TOGGLE_ITEM,
    START_TOGGLE_ALL,FINISH_TOGGLE_ALL,
    START_CHECK_CART,FINISH_CHECK_CART,
    START_FETCH_CART,FINISH_FETCH_CART,
    START_RELOAD_CART,FINISH_RELOAD_CART
} from "./constant.es6";
import {alert} from "../common/action.es6";
import {urlPrefix} from "../../lib/jumpurl.es6";

function errMsgByCode(errCode) {
    let errMsg = ""
    switch (errCode) {
        case -402104:
            errMsg = "商品不存在";
            break;
        case -402105:
            errMsg =  "商品已下架";
            break;
        case -402106:
            errMsg =  "超出购买限制";
            break;
        case -402107:
            errMsg =  "超出购买限制";
            break;
        case -402109:
            errMsg =  "商品购买数量低于起购数";
            break;
        case -402110:
            errMsg =  "超出购买限制";
            break;
        case -402111:
            errMsg =  "商品超出免税额度";
            break;
        case -402112:
            errMsg = "超出购买限制";
            break;
        default:
            errMsg="超出购买限制";
            break;
    }
    return errMsg;
}

function startFetchCart(param){
    return {
        type:START_FETCH_CART,
        param
    }
}
function finishFetchCart(param,res){
    return {
        type:FINISH_FETCH_CART,
        param,
        res
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

function toggleChecked(param){
    return {
        type:START_TOGGLE_ITEM,
        param
    }
}

function finishChecked(param){
    return{
        type:FINISH_TOGGLE_ITEM,
        param
    };
}

function toggleCheckedAll(param){
    return {
        type:START_TOGGLE_ALL,
        param
    }
}

function finishCheckedAll(param){
    return {
        type:FINISH_TOGGLE_ALL,
        param
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

function startCheckCart(param){
    return {
        type:START_CHECK_CART,
        param
    }
}

function finishCheckCart(param,res){
    return {
        type:FINISH_CHECK_CART,
        param,
        res
    }
}

function startReloadCart(){
    return {
        type:START_RELOAD_CART
    }
}

function finishReloadCart(res){
    return {
        type:FINISH_RELOAD_CART,
        res
    }
}

export {alert} from "../common/action.es6";
 
export function updateCart(param){
    return (dispatch)=>{
        dispatch(startUpdateCart(param));
        apiRequest(urlPrefix+'/updatecart',param,{method:"POST"}).then((res)=>{
            dispatch(finishUpdateCart(param,res));
        });
    }
}

export function deleteCart(param){
    return (dispatch)=>{
        dispatch(startDeleteCart(param));
        apiRequest(urlPrefix+'/deletecart',param,{method:"POST"}).then((res)=>{
            dispatch(finishDeleteCart(param,res));
        });
    }
}

export function toggleCartItem(param){
    return (dispatch)=>{
        dispatch(toggleChecked(param));
         setTimeout(()=>{
            dispatch(finishChecked(param));
        },50)
    }
}

export function toggleCartAll(param){
    return (dispatch)=>{
        dispatch(toggleCheckedAll(param));
         setTimeout(()=>{
            dispatch(finishCheckedAll(param));
        },50);
    }
}
 
export function checkCartInfo(param){
    return (dispatch)=>{
        dispatch(startCheckCart(param));
        apiRequest(urlPrefix+'/checkcart',param,{method:"POST"}).then((res)=>{
            if(res.returnCode !==0){
                if(res.returnCode !== -402111){
                    let content = errMsgByCode(res.returnCode);
                    dispatch(alert(content,3000));
                }
            }
            dispatch(finishCheckCart(param,res));
        })
    }
}

export function fetchCart(param){
    return (dispatch)=>{
        dispatch(startFetchCart(param));
        apiRequest(urlPrefix+'/fetchcart',param,{method:"POST"}).then((res)=>{
            dispatch(finishFetchCart(param,res));
        });
    }
}

export function reloadCart(){
    return (dispatch)=>{
        dispatch(startReloadCart());
        apiRequest(urlPrefix+'/reloadcart',{},{method:"POST"}).then((res)=>{
            dispatch(finishReloadCart(res));
        });
    }
}

export {fetchCartCount} from "../common/action.es6";
