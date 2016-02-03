'use strict'
import {apiRequest} from "../../lib/util.es6";
import {
    RECEIVE_GOODS,REQUEST_GOODS,
    TOGGLE_CHECKED,RESET_FILTER
} from "./constant.es6";

function receiveGoods(params,res){
    return {
        type:RECEIVE_GOODS,
        params,
        res
    }
}

function requestGoods (params) {
    return {
        type:REQUEST_GOODS,
        params
    }
}

export function fetchGoods(params){
    return (dispath)=>{
        dispath(requestGoods(params));
        return apiRequest('/search',params).then((res)=>{
            dispath(receiveGoods(params,res))
        })
    }
}

export function toggleChecked(params){
    return {
        type:TOGGLE_CHECKED,
        params
    }
}

export function resetFilter(params){
    return {
        type:RESET_FILTER,
        params
    }
}
