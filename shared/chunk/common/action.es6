'use strict';
import {
    CHANGE_FIELD,
    SHOW_ALERT,HIDE_ALERT
} from "./constant.es6"

export function changeField(name,value){
    return {
        type:CHANGE_FIELD,
        name,
        value
    }
}

function showAlert(content){
    return {
        type:SHOW_ALERT,
        content
    }
}

function hideAlert(content) {
    return {
        type:HIDE_ALERT,
        content
    }
}

export function alert(content="",delay=3000){
    return (dispatch)=>{
        dispatch(showAlert(content));
        setTimeout(()=>{
            dispatch(hideAlert(content));
        },delay)
    }
}