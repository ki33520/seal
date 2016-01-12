'use strict';
import {apiRequest} from "../../lib/util.es6";

export const REQUEST_ORDER = "REQUEST_ORDER";
export const RECEIVE_ORDER = "RECEIVE_ORDER";

function requestOrder(param){
    return {
        type:REQUEST_ORDER,
        param
    }
}

function receiveOrder(param,res){
    return {
        type:RECEIVE_ORDER,
        receiveAt:Date.now(),
        param,
        res
    }
}

export default function fetchOrder(url,param){
    return (dispatch)=>{
        dispatch(requestOrder(param));
        return apiRequest(url,param).then((res)=>{
            dispatch(receiveOrder(param,res));
        });
    }
}