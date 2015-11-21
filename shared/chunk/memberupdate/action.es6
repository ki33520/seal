'use strict';
import {apiRequest} from "../../lib/util.es6";

export const REQUEST_MEMBERINFO = "REQUEST_MEMBERINFO";
export const RECEIVE_MEMBERINFO = "RECEIVE_MEMBERINFO";

function requestMemberInfo(param){
    return {
        type:REQUEST_MEMBERINFO,
        param
    }
}

function receiveMemberInfo(param,res){
    return {
        type:RECEIVE_MEMBERINFO,
        receiveAt:Date.now(),
        param,
        res
    }
}

export default function fetchMemberInfo(url,param){
    return (dispatch)=>{
        dispatch(requestMemberInfo(param));
        return apiRequest(url,param,{
            type:"jsonp",
            jsonpcallback:"jsoncallback"
        }).then((res)=>{
            dispatch(receiveMemberInfo(param,res));
        });
    }
}