'use strict';
import {apiRequest} from "../../lib/util.es6";

export const REQUEST_COLLECT = "REQUEST_COLLECT";
export const RECEIVE_COLLECT = "RECEIVE_COLLECT";
export const START_TOGGLE_COLLECTED = "REQUEST_DELETE";
export const FINISH_TOGGLE_COLLECTED = "RECEIVE_DELETE";

import {alert} from "../common/action.es6";
export {alert} from "../common/action.es6";

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

export function fetchCollect(url,param){
    return (dispatch)=>{
        dispatch(requestCollect(param));
        return apiRequest(url,param).then((res)=>{
            dispatch(receiveCollect(param,res));
        });
    }
}


function startToggleCollected(param){
    return {
        type:START_TOGGLE_COLLECTED,
        param:param
    }
}

function finishToggleCollected(param,res){
    return {
        type:FINISH_TOGGLE_COLLECTED,
        param,
        res,
        finishAt:Date.now()
    }
}

export function toggleCollected(url,param){
    return (dispatch)=>{
        dispatch(startToggleCollected(param));
        apiRequest(url,param).then((res)=>{
            let alertMsg = "";
            if(res.isToggled){
                alertMsg = param.status ? "添加收藏成功!":"取消收藏成功!"
                dispatch(alert(alertMsg,1000))
            }else{
                dispatch(alert(res.errMsg,1000))
            }
            dispatch(finishToggleCollected(param,res));
            //setTimeout(window.location.reload(),2000);
        })
    }
}
