'use strict';
import {
    CHANGE_FIELD,
    CHANGE_SCENE,
    SHOW_ALERT,HIDE_ALERT,
    SHOW_ACTIVITYINDICATOR,HIDE_ACTIVITYINDICATOR,
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_SEARCHHISTORY,RESPONSE_SEARCHHISTORY,
    START_PURGE_SEARCHHISTORY,FINISH_PURGE_SEARCHHISTORY,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD,
} from "./constant.es6"
import {apiRequest} from "../../lib/util.es6";
import {urlPrefix} from "../../lib/jumpurl.es6";

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

function requestAssociateWord(param){
    return {
        type:REQUEST_ASSOICATEWORD,
        param
    }
}

function responseAssociateWord(param,res){
    return {
        type:RESPONSE_ASSOICATEWORD,
        param,
        res
    }
}

export function fetchAssociateKeywords(param){
    return (dispatch)=>{
        dispatch(requestAssociateWord(param));
        apiRequest(urlPrefix + "/searchassociate",param,{method:"POST"}).then((res)=>{
            dispatch(responseAssociateWord(param,res));
        })
    }
}

function requestHotWord(param){
    return {
        type:REQUEST_HOTWORD,
        param
    }
}

function responseHotWord(param,res){
    return {
        type:RESPONSE_HOTWORD,
        param,
        res
    }
}

export function fetchHotWord(param){
    return (dispatch)=>{
        dispatch(requestHotWord(param));
        apiRequest(urlPrefix + "/searchhotwords",param).then((res)=>{
            dispatch(responseHotWord(param,res));
        })
    }
}

function requestSearchHistory(param){
    return {
        type:REQUEST_SEARCHHISTORY,
        param
    }
}

function responseSearchHistory(param,res){
    return {
        type:RESPONSE_SEARCHHISTORY,
        param,
        res
    }
}

export function fetchSearchHistory(param){
    return (dispatch)=>{
        dispatch(requestSearchHistory(param));
        apiRequest(urlPrefix + "/searchhistory",param).then((res)=>{
            dispatch(responseSearchHistory(param,res));
        })
    }
}

function startPurgeSearchHistory(param){
    return {
        type:START_PURGE_SEARCHHISTORY,
        param
    }
}

function finishPurgeSearchHistory(param,res){
    return {
        type:FINISH_PURGE_SEARCHHISTORY,
        param,
        res
    }
}

export function purgeSearchHistory(param){
    return (dispatch)=>{
        dispatch(startPurgeSearchHistory(param));
        apiRequest(urlPrefix + "/purgesearchhistory",param).then((res)=>{
            dispatch(finishPurgeSearchHistory(param,res));
        })
    }
}