'use strict';
import {apiRequest} from "../../lib/util.es6";

export const CHANGE_NICKNAME = "CHANGE_NICKNAME";
export const CHANGE_GENDER = "CHANGE_GENDER";
export const CHANGE_BIRTHDY = "CHANGE_BIRTHDY";
export const REQUEST_MEMBERINFO = "REQUEST_MEMBERINFO";
export const RECEIVE_MEMBERINFO = "RECEIVE_MEMBERINFO";

export function changeNickname(name,value){
    return {
        type:CHANGE_NICKNAME,
        name,
        value
    }
}
export function changeGender(name,value){
    return {
        type:CHANGE_GENDER,
        name,
        value
    }
}
export function changeBirthdy(name,value){
    return {
        type:CHANGE_BIRTHDY,
        name,
        value
    }
}

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

export function postMemberInfo(url,param){
    return (dispatch)=>{
        dispatch(requestMemberInfo(param));
        apiRequest(url,param,{method:"POST"}).then((res)=>{
            dispatch(receiveMemberInfo(param,res));
        })
    }
}