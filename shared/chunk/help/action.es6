'use strict';
import {apiRequest} from "../../lib/util.es6";

export const CHANGE_FIELD= "CHANGE_FIELD";
export const REQUEST_QUESTION = "REQUEST_QUESTION";
export const RESPONSE_QUESTION= "RESPONSE_QUESTION";
export const START_CHANGE_FEEDBACK = "START_CHANGE_FEEDBACK";
export const FINISH_CHANGE_FEEDBACK = "FINISH_CHANGE_FEEDBACK";

export function changeField(name,value){
    return {
        type:CHANGE_FIELD,
        name,
        value
    }
}

function requestQuestion(param){
    return {
        type:REQUEST_QUESTION,
        param
    }
}

function responseQuestion(param,res){
    return {
        type:RESPONSE_QUESTION,
        param,
        res
    }
}

export function fetchQuestion(url,param){
    return (dispatch)=>{
        dispatch(requestQuestion(param));
        apiRequest(url,param).then((res)=>{
            dispatch(responseQuestion(param,res));
        })
    }
}



function startChangeFeedback(param){
    return {
        type:START_CHANGE_FEEDBACK,
        param
    }
}

function finishChangeFeedback(param,res){
    return {
        type:FINISH_CHANGE_FEEDBACK,
        res,
        param,
        finishAt:Date.now()
    }
}

export function changeFeedback(url,param){
    return (dispatch)=>{
        dispatch(startChangeFeedback(param));
        apiRequest(url,param,{method:"POST"}).then((res)=>{
            dispatch(finishChangeFeedback(param,res));
        })
    }
}
