'use strict'
import {apiRequest} from "../../lib/util.es6";

export const SORT_NORMAL = "SORT_NORMAL";
export const SORT_PRICE_DESC = "SORT_PRICE_DESC";
export const SORT_PRICE_ASC = "SORT_PRICE_ASC";
export const SORT_SALES = "SORT_SALES";

function receiveGoods(param,res){
    return {
        type:RECEIVE_GOODS,
        param:param,
        pagination:res.page,
        receiveAt:Date.now()
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
            dispath(receiveGoods(param,res))
        })
    }
}