'use strict'
import {apiRequest} from "../../lib/util.es6";
import {jumpURL} from "../../lib/jumpurl.es6";
import {
    START_FETCH_GOODS,FINISH_FETCH_GOODS,
    START_REQUEST_GOODS,FINISH_REQUEST_GOODS,
    TOGGLE_CHECKED,RESET_FILTER,
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
function finishResetFilter(param){
    return {
        type:RESET_FILTER,
        param
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

export function resetFilter(param){
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(finishResetFilter(param));
        },50)
    }
}

export {changeField,fetchAssociateKeywords,
    fetchHotWord,fetchSearchHistory,purgeSearchHistory
} from "../common/action.es6";