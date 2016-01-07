'use strict'
import {apiRequest} from "../../lib/util.es6";
export const REQUEST_GOODS = "REQUEST_GOODS";
export const RECEIVE_GOODS = "RECEIVE_GOODS";

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