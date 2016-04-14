'use strict'
import {apiRequest} from "../../lib/http.es6";

export const REQUEST_GOODS = "REQUEST_GOODS";
export const RECEIVE_GOODS = "RECEIVE_GOODS";


function requestGoods (param) {
    return {
        type:REQUEST_GOODS,
        param:param
    }
}

function receiveGoods(param,res){
    return {
        type:RECEIVE_GOODS,
        param,
        res
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