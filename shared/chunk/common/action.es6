'use strict';
import {
    CHANGE_FIELD,
    CHANGE_SCENE,
    SHOW_ALERT,HIDE_ALERT,
    SHOW_ACTIVITYINDICATOR,HIDE_ACTIVITYINDICATOR
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

export function showActivityIndicator(content){
    return {
        type:SHOW_ACTIVITYINDICATOR,
        content
    }
}

export function hideActivityIndicator(content){
    return {
        type:HIDE_ACTIVITYINDICATOR,
        content
    }
}


export function changeScene(param){
    return {
        type:CHANGE_SCENE,
        param
    }
}