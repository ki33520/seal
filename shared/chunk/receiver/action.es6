'use strict';
import util from "../../lib/util.es6";

export const CHANGE_FIELD= "CHANGE_FIELD";
export const REQUEST_PROVINCES = "REQUEST_PROVINCES";
export const RESPONSE_PROVINCES = "RESPONSE_PROVINCES";
export const REQUEST_CITIES = "REQUEST_CITIES";
export const RESPONSE_CITIES = "RESPONSE_CITIES";
export const REQUEST_DISTRICTS = "REQUEST_DISTRICTS";
export const RESPONSE_DISTRICTS = "RESPONSE_DISTRICTS";
export const CHANGE_AREA = "CHANGE_AREA";
export const REQUEST_RECEIVER = "REQUEST_RECEIVER";
export const RESPONSE_RECEIVER = "RESPONSE_RECEIVER";
export const START_SAVE_RECEIVER = "START_SAVE_RECEIVER";
export const FINISH_SAVE_RECEIVER = "FINISH_SAVE_RECEIVER";

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
        util.apiRequest(url).then((res)=>{
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

export function fetchProvinces(url,param){
    return (dispatch)=>{
        dispatch(requestProvinces(param));
        util.apiRequest(url,param).then((res)=>{
            // console.log('provinces',res)
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

export function fetchCities(url,param){
    return (dispatch)=>{
        dispatch(requestCities(param));
        util.apiRequest(url,param).then((res)=>{
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

export function fetchDistricts(url,param){
    return (dispatch)=>{
        dispatch(requestDistricts(param));
        util.apiRequest(url,param).then((res)=>{
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
        util.apiRequest("/savereceiver",param,{
            method:"post",
            type:"json"
        }).then((res)=>{
            dispatch(finishSaveReceiver(param,res));
        })
    }
}