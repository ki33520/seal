'use strict';
import {apiRequest} from "../../lib/util.es6";

import {
    CHANGE_FIELD,
    REQUEST_PROVINCES,RESPONSE_PROVINCES,
    REQUEST_CITIES,RESPONSE_CITIES,
    REQUEST_DISTRICTS,RESPONSE_DISTRICTS,
    REQUEST_RECEIVER,RESPONSE_RECEIVER,
    REQUEST_RECEIVERS,RESPONSE_RECEIVERS,
    START_SAVERECEIVER,FINISH_SAVERECEIVER,
    START_CREATERECEIVER,FINISH_CREATERECEIVER,
    START_DELETERECEIVER,FINISH_DELETERECEIVER,
    START_SETDEFAULT,FINISH_SETDEFAULT
} from "./constant.es6";

export {alert} from "../common/action.es6";

function requestReceivers(){
    return {
        type:REQUEST_RECEIVERS,
    }
}

function responseReceivers(res){
    return {
        type:RESPONSE_RECEIVERS,
        res
    }
}

export function fetchReceivers(){
    return (dispatch)=>{
        dispatch(requestReceivers());
        apiRequest("/receivers").then((res)=>{
            dispatch(responseReceivers(res));
        })
    }
}

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

function requestProvinces(param,scene){
    return {
        type:REQUEST_PROVINCES,
        scene,
        param,
    }
}

function responseProvinces(param,res,scene){
    return {
        type:RESPONSE_PROVINCES,
        param,
        res,
        scene,
        responseAt:Date.now()
    }
}

export function fetchProvinces(param,scene){
    return (dispatch)=>{
        dispatch(requestProvinces(param,scene));
        apiRequest("/cascadearea",Object.assign({},param,{
            api:"findProvince"
        })).then((res)=>{
            dispatch(responseProvinces(param,res,scene));
        })
    }
}

function requestCities(param,scene){
    return {
        type:REQUEST_CITIES,
        scene,
        param,
    }
}

function responseCities(param,res,scene){
    return {
        type:RESPONSE_CITIES,
        param,
        res,
        scene,
        responseAt:Date.now()
    }
}

export function fetchCities(param,scene){
    return (dispatch)=>{
        dispatch(requestCities(param,scene));
        apiRequest("/cascadearea",Object.assign({},param,{
            api:"findCity"
        })).then((res)=>{
            dispatch(responseCities(param,res,scene));
        })
    }
}

function requestDistricts(param,scene){
    return {
        type:REQUEST_DISTRICTS,
        scene,
        param,
    }
}

function responseDistricts(param,res,scene){
    return {
        type:RESPONSE_DISTRICTS,
        param,
        res,
        scene,
        responseAt:Date.now()
    }
}

export function fetchDistricts(param,scene){
    return (dispatch)=>{
        dispatch(requestDistricts(param,scene));
        apiRequest("/cascadearea",Object.assign({},param,{
            api:"findDistrict"
        })).then((res)=>{
            dispatch(responseDistricts(param,res,scene));
        })
    }
}

function startSaveReceiver(param) {
    return {
        type:START_SAVERECEIVER,
        param
    }
}

function finishSaveReceiver(param,res){
    return {
        type:FINISH_SAVERECEIVER,
        param,
        res,
        finishAt:Date.now()
    }
}

export function saveReceiver(param){
    return (dispatch)=>{
        dispatch(startSaveReceiver(param));
        apiRequest("/savereceiver",param,{
            method:"post"
        }).then((res)=>{
            dispatch(finishSaveReceiver(param,res));
        })
    }
}

function startCreateReceiver(param){
    return {
        type:START_CREATERECEIVER,
        param
    }
}

function finishCreateReceiver(param,res){
    return {
        type:FINISH_CREATERECEIVER,
        param,
        res,
        finishAt:Date.now()
    }
}

export function createReceiver(param){
    return (dispatch)=>{
        dispatch(startCreateReceiver(param))
        apiRequest("/createreceiver",param,{
            method:"POST"
        }).then((res)=>{
            dispatch(finishCreateReceiver(param,res))
        })
    }
}

function startDeleteReceiver(param){
    return {
        type:START_DELETERECEIVER,
        param
    }
}

function finishDeleteReceiver(param,res){
    return {
        type:FINISH_DELETERECEIVER,
        param,
        res,
        finishAt:Date.now()
    }
}

export function deleteReceiver(param){
    return (dispatch)=>{
        dispatch(startDeleteReceiver(param))
        apiRequest("/deletereceiver",param,{
            method:"POST"
        }).then((res)=>{
            dispatch(finishDeleteReceiver(param,res))
        })
    }
}

function startSetDefault(param){
    return {
        type:START_SETDEFAULT,
        param
    }
}

function finishSetDefault(param,res){
    return {
        type:FINISH_SETDEFAULT,
        param,
        res,
        finishAt:Date.now()
    }
}

export function setDefault(param){
    return (dispatch)=>{
        dispatch(startSetDefault(param))
        apiRequest("/setdefaultreceiver",param,{
            method:"POST"
        }).then((res)=>{
            dispatch(finishSetDefault(param,res))
        })
    }
}