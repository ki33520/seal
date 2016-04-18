'use strict'
import {apiRequest} from "../../lib/http.es6";

import {
    RECEIVE_GOODS,REQUEST_GOODS,
} from "./constant.es6";

import {urlPrefix} from "../../lib/jumpurl.es6";

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

export function fetchGoods(param){
    return (dispath)=>{
        dispath(requestGoods(param));
        return apiRequest(urlPrefix + "/trendyActivity",param,{method:"POST"}).then((res)=>{
            dispath(receiveGoods(param,res))
        })
    }
}

export {changeField,fetchAssociateKeywords,
    fetchHotWord,fetchSearchHistory,purgeSearchHistory
} from "../common/action.es6";