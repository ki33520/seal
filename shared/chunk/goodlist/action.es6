'use strict'
import {apiRequest} from "../../lib/util.es6";
import {jumpURL} from "../../lib/jumpurl.es6";
import {
    START_FETCH_GOODS,FINISH_FETCH_GOODS,
    START_REQUEST_GOODS,FINISH_REQUEST_GOODS,
    TOGGLE_CHECKED,
    START_RESET_FILTER,FINISH_RESET_FILTER
} from "./constant.es6";

function startFetchGoods(param){
    return {
        type:START_FETCH_GOODS,
        param
    }
}

function finishFetchGoods (param,res) {
    return {
        type:FINISH_FETCH_GOODS,
        param,
        res
    }
}
function startRequestGoods(param){
    return {
        type:START_REQUEST_GOODS,
        param
    }
}

function finishRequestGoods (param,res) {
    return {
        type:FINISH_REQUEST_GOODS,
        param,
        res
    }
}
function startResetFilter(){
    return {
        type:START_RESET_FILTER
    }
}
function finishResetFilter(res){
    return {
        type:FINISH_RESET_FILTER,
        res
    }
}
export function fetchGoods(param){
    return (dispatch)=>{
        dispatch(startFetchGoods(param));
        return apiRequest(jumpURL('search'),param).then((res)=>{
            dispatch(finishFetchGoods(param,res))
        });
    }
}

export function requestGoods(param){
    return (dispatch)=>{
        dispatch(startRequestGoods(param));
        return apiRequest(jumpURL('search'),param).then((res)=>{
            dispatch(finishRequestGoods(param,res))
        });
    }
}

export function toggleChecked(params){
    return {
        type:TOGGLE_CHECKED,
        params
    }
}

export function resetFilter(url){
    return (dispatch)=>{
        dispatch(startResetFilter());
        return apiRequest(url).then((res)=>{
            dispatch(finishResetFilter(res))
        });
    }
}

export {changeField,fetchAssociateKeywords,
    fetchHotWord,fetchSearchHistory,purgeSearchHistory
} from "../common/action.es6";