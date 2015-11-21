'use strict';
import {apiRequest} from "../../lib/util.es6";

export const CHANGE_FIELD= "CHANGE_FIELD";
export const START_CHANGE_PASSWORD = "START_CHANGE_PASSWORD";
export const FINISH_CHANGE_PASSWORD = "FINISH_CHANGE_PASSWORD";

export function changeField(name,value){
    return {
        type:CHANGE_FIELD,
        name,
        value
    }
}

function startChangeBasic(param){
    return {
        type:START_CHANGE_PASSWORD,
        param
    }
}

function finishChangeBasic(param,res){
    return {
        type:FINISH_CHANGE_PASSWORD,
        res,
        param,
        finishAt:Date.now()
    }
}

export function changeBasic(param){
    return (dispatch)=>{
        dispatch(startChangeBasic(param));
        apiRequest("/updatebasic",param,{method:"POST"}).then((res)=>{
            dispatch(finishChangeBasic(param,res));
        })
    }
}