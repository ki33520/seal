'use strict'
import {apiRequest} from "../../lib/util.es6";
import {
    REQUEST_CATEGORYBRANDS,RESPONSE_CATEGORYBRANDS,
    REQUEST_CATEGORYACTIVITY,RESPONSE_CATEGORYACTIVITY,
    REQUEST_ALLBRANDS,RESPONSE_ALLBRANDS,
    REQUEST_ALLORIGINS,RESPONSE_ALLORIGINS,
} from "./constants.es6";

import {urlPrefix} from "../../lib/jumpurl.es6";

function responseCategoryActivity(param,res){
    return {
        type:RESPONSE_CATEGORYACTIVITY,
        param:param,
        res:res
    }
}

function requestCategoryActivity(param) {
    return {
        type:REQUEST_CATEGORYACTIVITY,
        param:param
    }
}

export function fetchCategoryActivity(param){
    return (dispath)=>{
        dispath(requestCategoryActivity(param));
        return apiRequest(urlPrefix + "/categoryactivity",param).then((res)=>{
            dispath(responseCategoryActivity(param,res))
        })
    }
}

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
        return apiRequest(urlPrefix + "/categorybrands",param).then((res)=>{
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
        return apiRequest(urlPrefix + "/allbrands",param).then((res)=>{
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
        return apiRequest(urlPrefix + "/allorigins",param).then((res)=>{
            dispath(responseAllOrigins(param,res))
        })
    }
}

export {changeField,fetchAssociateKeywords,
    fetchHotWord,fetchSearchHistory,purgeSearchHistory
} from "../common/action.es6";