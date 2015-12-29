'use strict';
import {apiRequest} from "../../lib/util.es6";

export const REQUEST_LOGISTICS = "REQUEST_LOGISTICS";
export const RESPONSE_LOGISTICS= "RESPONSE_LOGISTICS";

function requestLogistics(param){
    return {
        type:RESPONSE_LOGISTICS,
        param
    }
}

function responseLogistics(param,res){
    return {
        type:RESPONSE_LOGISTICS,
        param,
        res
    }
}

export function fetchLogistics(url,param){
    return (dispatch)=>{
        dispatch(requestLogistics(param));
        apiRequest(url,param).then((res)=>{
            dispatch(responseLogistics(param,res));
        })
    }
}