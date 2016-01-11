'use strict'
import {apiRequest} from "../../lib/util.es6";
import {
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD,
    RECEIVE_GOODS,REQUEST_GOODS,CHANGE_FIELD
} from "./constant.es6";

function receiveGoods(param,res){
    return {
        type:RECEIVE_GOODS,
        param:param,
        res:res
    }
}

function requestGoods (param) {
    return {
        type:REQUEST_GOODS,
        param:param
    }
}

export default function fetchGoods(url,param){
    return (dispath)=>{
        dispath(requestGoods(param));
        return apiRequest(url,param).then((res)=>{
            dispath(receiveGoods(param,res.goodsList))
        })
    }
}

function requestHotWord(param){
    return {
        type:REQUEST_HOTWORD,
        param
    }
}

function responseHotWord(param,res){
    return {
        type:RESPONSE_HOTWORD,
        param,
        res
    }
}

export function fetchHotWord(param){
    return (dispatch)=>{
        dispatch(requestHotWord(param));
        apiRequest("/searchhotwords",param).then((res)=>{
            dispatch(responseHotWord(param,res));
        })
    }
}

function requestAssociateWord(param){
    return {
        type:REQUEST_ASSOICATEWORD,
        param
    }
}

function responseAssociateWord(param,res){
    return {
        type:RESPONSE_ASSOICATEWORD,
        param,
        res
    }
}

export function fetchAssociateKeywords(param){
    return (dispatch)=>{
        dispatch(requestAssociateWord(param));
        apiRequest("/searchassociate",param,{method:"POST"}).then((res)=>{
            dispatch(responseAssociateWord(param,res));
        })
    }
}

export function changeField(param){
    return (dispatch)=>{
        dispatch({
            type:CHANGE_FIELD,
            param
        })
    }
}