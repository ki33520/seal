'use strict';
export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";

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