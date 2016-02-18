'use strict';
import {apiRequest} from "../../lib/util.es6";

export const REQUEST_COMMENT = "REQUEST_COMMENT";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

function requestComment(param){
    return {
        type:REQUEST_COMMENT,
        param
    }
}

function receiveComment(param,res){
    return {
        type:RECEIVE_COMMENT,
        receiveAt:Date.now(),
        param,
        res
    }
}

export function fetchComment(url,param){
    return (dispatch)=>{
        dispatch(requestComment(param));
        return apiRequest(url,param).then((res)=>{
            dispatch(receiveComment(param,res));
        });
    }
}