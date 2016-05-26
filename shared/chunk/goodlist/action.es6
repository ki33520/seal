'use strict'
import {apiRequest} from "../../lib/util.es6";
//import {jumpURL} from "../../lib/jumpurl.es6";
import {
    START_FETCH_GOODS,FINISH_FETCH_GOODS,
    TOGGLE_CHECKED,TOGGLE_SORTED,TOGGLE_HAVE_GOODS,
    TOGGLE_RESET_FILTER
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

export function toggleSort(param){
    return {
        type:TOGGLE_SORTED,
        param
    }
}

export function fetchGoods(url,param){
    return (dispatch)=>{
        dispatch(startFetchGoods(param));
        return apiRequest(url,param).then((res)=>{
            dispatch(finishFetchGoods(param,res))
        });
    }
}

export function toggleChecked(param){
    return {
        type:TOGGLE_CHECKED,
        param
    }
}

export function toggleHaveGoods(param){
    return {
        type:TOGGLE_HAVE_GOODS,
        param
    }
}
export function resetFilter(param){
    return {
        type:TOGGLE_RESET_FILTER,
        param
    }
}

export {changeField,fetchAssociateKeywords,
    fetchHotWord,fetchSearchHistory,purgeSearchHistory
} from "../common/action.es6";