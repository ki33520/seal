'use strict';
import {apiRequest} from "../../lib/util.es6";

import {
    CHANGE_FIELD,
    REQUEST_PROVINCES,RESPONSE_PROVINCES,
    REQUEST_CITIES,RESPONSE_CITIES,
    REQUEST_DISTRICTS,RESPONSE_DISTRICTS,
    REQUEST_RECEIVER,RESPONSE_RECEIVER,
    START_SAVE_RECEIVER,FINISH_SAVE_RECEIVER
} from "./constant.es6";

import {alert} from "../common/action.es6";

function requestReceiver(){
    return {
        type:REQUEST_RECEIVER,
    }
}

function responseReceiver(res){
    return {
        type:RESPONSE_RECEIVER,
        res
    }
}

export function fetchReceiver(url){
    return (dispatch)=>{
        dispatch(requestReceiver());
        apiRequest(url).then((res)=>{
            dispatch(responseReceiver(res));
        })
    }
}

export function changeField(name,value){
    return {
        type:CHANGE_FIELD,
        name,
        value
    }
}

function requestProvinces(param){
    return {
        type:REQUEST_PROVINCES,
        param,
    }
}

function responseProvinces(param,res){
    return {
        type:RESPONSE_PROVINCES,
        param,
        res,
        responseAt:Date.now()
    }
}

export function fetchProvinces(param){
    return (dispatch)=>{
        dispatch(requestProvinces(param));
        apiRequest("/cascadearea",Object.assign({},param,{
            api:"findProvince"
        })).then((res)=>{
            dispatch(responseProvinces(param,res));
        })
    }
}

function requestCities(param){
    return {
        type:REQUEST_CITIES,
        param,
    }
}

function responseCities(param,res){
    return {
        type:RESPONSE_CITIES,
        param,
        res,
        responseAt:Date.now()
    }
}

export function fetchCities(param){
    return (dispatch)=>{
        dispatch(requestCities(param));
        apiRequest("/cascadearea",Object.assign({},param,{
            api:"findCity"
        })).then((res)=>{
            dispatch(responseCities(param,res));
        })
    }
}

function requestDistricts(param){
    return {
        type:REQUEST_DISTRICTS,
        param,
    }
}

function responseDistricts(param,res){
    return {
        type:RESPONSE_DISTRICTS,
        param,
        res,
        responseAt:Date.now()
    }
}

export function fetchDistricts(param){
    return (dispatch)=>{
        dispatch(requestDistricts(param));
        apiRequest("/cascadearea",Object.assign({},param,{
            api:"findDistrict"
        })).then((res)=>{
            dispatch(responseDistricts(param,res));
        })
    }
}

function startSaveReceiver(param) {
    return {
        type:START_SAVE_RECEIVER,
        param
    }
}

function finishSaveReceiver(param,res){
    return {
        type:FINISH_SAVE_RECEIVER,
        param,
        res,
        finishAt:Date.now()
    }
}

export function saveReceiver(param){
    return (dispatch)=>{
        dispatch(startSaveReceiver(param));
        apiRequest("/savereceiver",param,{
            method:"post",
            type:"json"
        }).then((res)=>{
            dispatch(finishSaveReceiver(param,res));
        })
    }
}