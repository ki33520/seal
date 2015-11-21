'use strict';
import {apiRequest} from "../../lib/util.es6";

export const REQUEST_COLLECT = "REQUEST_COLLECT";
export const RECEIVE_COLLECT = "RECEIVE_COLLECT";

function requestCollect(param){
    return {
        type:REQUEST_COLLECT,
        param
    }
}

function receiveCollect(param,res){
    return {
        type:RECEIVE_COLLECT,
        receiveAt:Date.now(),
        param,
        res
    }
}

export default function fetchCollect(url,param){
    return (dispatch)=>{
        dispatch(requestCollect(param));
        return apiRequest(url,param,{
            type:"jsonp",
            jsonpcallback:"jsoncallback"
        }).then((res)=>{
            dispatch(receiveCollect(param,res));
        });
    }
}