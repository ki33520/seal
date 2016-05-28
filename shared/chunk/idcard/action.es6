'use strict';
import {apiRequest} from "../../lib/util.es6";
import {urlPrefix} from "../../lib/jumpurl.es6";
import {
    START_DELETE_IDCARD,FINISH_DELETE_IDCARD,
    START_UPLOAD_IDCARD,FINISH_UPLOAD_IDCARD,
    START_UPDATE_IDCARD,FINISH_UPDATE_IDCARD,
    START_ADD_IDCARD,FINISH_ADD_IDCARD
} from "./constant.es6";

 
export {alert} from "../common/action.es6";

function startDeleteIDcard(param){
	return {
        type:START_DELETE_IDCARD,
        param
    }
}
function finishDeleteIDcard(param,res){
	return {
        type:FINISH_DELETE_IDCARD,
        param,
        res
    }
}
export function deleteIDcard(param){
    return (dispatch)=>{
        dispatch(startDeleteIDcard(param))
        apiRequest(urlPrefix + "/deleteidcard",param,{method:"POST"}).then((res)=>{
            dispatch(finishDeleteIDcard(param,res))
        })
    }
}
function startUploadIDcardImage(param){
	return {
        type:START_UPLOAD_IDCARD,
        param
    }
}
function finishUploadIDcardImage(param,res){
	return {
        type:FINISH_UPLOAD_IDCARD,
        param,
        res
    }
}
export function uploadIDcardImage(param){
    return (dispatch)=>{
        dispatch(startUploadIDcardImage(param))
        apiRequest(urlPrefix + "/uploadidcardImage",param,{method:"POST"}).then((res)=>{
            dispatch(finishUploadIDcardImage(param,res))
        })
    }
}
function startUpdateIDcard(param){
	return {
        type:START_UPDATE_IDCARD,
        param
    }
}
function finishUpdateIDcard(param,res){
	return {
        type:FINISH_UPDATE_IDCARD,
        param,
        res
    }
}
export function updateIDcard(param){
    return (dispatch)=>{
        dispatch(startUpdateIDcard(param))
        apiRequest(urlPrefix + "/updateidcard",param,{method:"POST"}).then((res)=>{
            dispatch(finishUpdateIDcard(param,res))
        })
    }
}
function startAddIDcard(param){
	return {
        type:START_ADD_IDCARD,
        param
    }
}
function finishAddIDcard(param,res){
	return {
        type:FINISH_ADD_IDCARD,
        param,
        res
    }
}
export function addIDcard(param){
    return (dispatch)=>{
        dispatch(startAddIDcard(param))
        apiRequest(urlPrefix + "/addidcard",param,{method:"POST"}).then((res)=>{
            dispatch(finishAddIDcard(param,res))
        })
    }
}

