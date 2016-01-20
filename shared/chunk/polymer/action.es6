'use strict'
import {apiRequest} from "../../lib/util.es6";
import {
    REQUEST_CATEGORYBRANDS,RESPONSE_CATEGORYBRANDS,
    REQUEST_ALLBRANDS,RESPONSE_ALLBRANDS,
    REQUEST_ALLORIGINS,RESPONSE_ALLORIGINS,
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD
} from "./constants.es6";

function responseCategoryBrands(param,res){
    return {
        type:RESPONSE_CATEGORYBRANDS,
        param:param,
        res:res
    }
}

function requestCategoryBrands(param) {
    return {
        type:REQUEST_CATEGORYBRANDS,
        param:param
    }
}

export function fetchCategoryBrands(param){
    return (dispath)=>{
        dispath(requestCategoryBrands(param));
        return apiRequest("/categorybrands",param).then((res)=>{
            dispath(responseCategoryBrands(param,res))
        })
    }
}

function responseAllBrands(param,res){
    return {
        type:RESPONSE_ALLBRANDS,
        param:param,
        res:res
    }
}

function requestAllBrands(param) {
    return {
        type:REQUEST_ALLBRANDS,
        param:param
    }
}

export function fetchAllBrands(param){
    return (dispath)=>{
        dispath(requestAllBrands(param));
        return apiRequest("/allbrands",param).then((res)=>{
            dispath(responseAllBrands(param,res))
        })
    }
}

function responseAllOrigins(param,res){
    return {
        type:RESPONSE_ALLORIGINS,
        param:param,
        res:res
    }
}

function requestAllOrigins(param) {
    return {
        type:REQUEST_ALLORIGINS,
        param:param
    }
}

export function fetchAllOrigins(param){
    return (dispath)=>{
        dispath(requestAllOrigins(param));
        return apiRequest("/allorigins",param).then((res)=>{
            dispath(responseAllOrigins(param,res))
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
        apiRequest("/searchhotwords",param).then((res)=>{
            dispatch(responseHotWord(param,res));
        })
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
        apiRequest("/searchassociate",param,{method:"POST"}).then((res)=>{
            dispatch(responseAssociateWord(param,res));
        })
    }
}

export {changeField} from "../common/action.es6";