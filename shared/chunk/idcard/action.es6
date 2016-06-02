'use strict';
import {apiRequest} from "../../lib/util.es6";
import {urlPrefix} from "../../lib/jumpurl.es6";
import {
    CHANGE_FIELD,
    START_DELETE_IDCARD,FINISH_DELETE_IDCARD,
    START_UPLOAD_CARDIMG,FINISH_UPLOAD_CARDIMG,
    START_UPDATE_IDCARD,FINISH_UPDATE_IDCARD,
    START_ADD_IDCARD,FINISH_ADD_IDCARD,
    START_FETCH_IDCARD,FINISH_FETCH_IDCARD,
    START_FETCH_IDCARDLIST,FINISH_FETCH_IDCARDLIST
} from "./constant.es6";
 
import {alert} from "../common/action.es6";
export {alert} from "../common/action.es6";

export function changeField(name,value,scene){
    return {
        type:CHANGE_FIELD,
        name,
        value,
        scene
    }
}
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
function startUploadCardImage(param,scene){
	return {
        type:START_UPLOAD_CARDIMG,
        param,
        scene
    }
}
function finishUploadCardImage(param,res,scene){
	return {
        type:FINISH_UPLOAD_CARDIMG,
        param,
        res,
        scene
    }
}
export function uploadCardImage(param,scene){
    return (dispatch)=>{
        dispatch(startUploadCardImage(param,scene))
        apiRequest(urlPrefix + "/uploadidcardimage",param.data,{
        	method:"POST",
        	processData:false
        }).then((res)=>{
            if(!res.isUploaded){
                dispatch(alert(res.errMsg,3000))
            }   
            dispatch(finishUploadCardImage(param,res,scene))
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
            dispatch(finishAddIDcard(param,res));
            if(res.isAddCarded){
                dispatch(fetchCardList());
            }
        })
    }
}


function startFetchIDcardList(param){
    return {
        type:START_FETCH_IDCARDLIST,
        param
    }
}
function finishFetchIDcardList(param,res){
    return {
        type:FINISH_FETCH_IDCARDLIST,
        param,
        res
    }
}
export function fetchCardList(param){
    return (dispatch)=>{
        dispatch(startFetchIDcardList(param));
        apiRequest(urlPrefix + "/idcard.html",param).then((res)=>{
            dispatch(finishFetchIDcardList(param,res))
        })
    }
}

function startFetchIDcardById(id){
    return {
        type:START_FETCH_IDCARD,
        id
    }
}
function finishFetchIDcardById(id,res){
    return {
        type:FINISH_FETCH_IDCARD,
        id,
        res
    }
}
export function fetchCardById(id){
    return (dispatch)=>{
        dispatch(startFetchIDcardById(id));
        apiRequest(urlPrefix + "/fetchcard",{id:id},{method:"POST"}).then((res)=>{
            dispatch(finishFetchIDcardById(id,res))
        })
    }
}
