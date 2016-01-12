'use strict';
import {apiRequest} from "../../lib/util.es6";

export const START_FETCH_COUPON = "START_FETCH_COUPON";
export const FINISH_YOUA_COUPON = "FINISH_YOUA_COUPON";
export const FINISH_UNION_COUPON = "FINISH_UNION_COUPON";
export const FINISH_INVALID_COUPON = "FINISH_INVALID_COUPON";

function requestCoupon(param){
    return {
        type:START_FETCH_COUPON,
        param
    }
}

function receiveYouaCoupon(param,res){
	return {
        type:FINISH_YOUA_COUPON,
        param,
        res
    }
}


export function fetchYouaCoupon(param){
	return (dispatch)=>{
        dispatch(requestCoupon(param));
        apiRequest('/coupon',param,{method:"POST"}).then((res)=>{
            dispatch(receiveYouaCoupon(param,res));
        })
    }
}

function receiveUnionCoupon(param,res){
    return {
        type:FINISH_UNION_COUPON,
        param,
        res
    }
}

export function fetchUnionCoupon(param){
    return (dispatch)=>{
        dispatch(requestCoupon(param));
        apiRequest('/coupon',param,{method:"POST"}).then((res)=>{
            dispatch(receiveUnionCoupon(param,res));
        })
    }
}

function receiveInvalidCoupon(param,res){
    return {
        type:FINISH_INVALID_COUPON,
        param,
        res
    }
}

export function fetchInvalidCoupon(param){
    return (dispatch)=>{
        dispatch(requestCoupon(param));
        apiRequest('/coupon',param,{method:"POST"}).then((res)=>{
            dispatch(receiveInvalidCoupon(param,res));
        })
    }
}