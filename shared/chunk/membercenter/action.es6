'use strict';
import {apiRequest} from "../../lib/util.es6";

export const REQUEST_MEMBER = "REQUEST_MEMBER";
export const RECEIVE_MEMBER = "RECEIVE_MEMBER";

function requestMember(param){
    return {
        type:REQUEST_MEMBER,
        param
    }
}

function receiveMember(param,res){
    return {
        type:RECEIVE_MEMBER,
        receiveAt:Date.now(),
        param,
        res
    }
}

export default function fetchMember(url,param){
    return (dispatch)=>{
        dispatch(requestMember(param));
        return apiRequest(url,param,{
            type:"jsonp",
            jsonpcallback:"jsoncallback"
        }).then((res)=>{
            dispatch(receiveMember(param,res));
        });
    }
}