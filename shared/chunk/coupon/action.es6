'use strict';
import {apiRequest} from "../../lib/util.es6";

export const START_FETCH_COUPON = "START_FETCH_COUPON";
export const FINISH_YOUA_COUPON = "FINISH_YOUA_COUPON";
export const FINISH_UNION_COUPON = "FINISH_UNION_COUPON";
export const FINISH_INVALID_COUPON = "FINISH_INVALID_COUPON";

function startFetchCoupon(){
    return {
        type:START_FETCH_COUPON
    }
}

function finishYouaCoupon(param,res){
	return {
        type:FINISH_YOUA_COUPON,
        param,
        res
    }
}

function finishUnionCoupon(param,res){
	return {
        type:FINISH_UNION_COUPON,
        param,
        res
    }
}

function finishInvalidCoupon(param,res){
	return {
        type:FINISH_INVALID_COUPON,
        param,
        res
    }
}

export function fetchYouaCoupons(param){
	return (dispatch)=>{
        dispatch(startFetchCoupon());
        apiRequest('/fetchCoupon',param,{method:"POST"}).then((res)=>{
            dispatch(finishYouaCoupon(param,res));
        })
    }
}

export function fetchUnionCoupons(param){
	return (dispatch)=>{
        dispatch(startFetchCoupon());
        apiRequest('/fetchCoupon',param,{method:"POST"}).then((res)=>{
            dispatch(finishUnionCoupon(param,res));
        })
    }
}

export function fetchInvalidCoupons(param){
	return (dispatch)=>{
        dispatch(startFetchCoupon());
        apiRequest('/fetchCoupon',param,{method:"POST"}).then((res)=>{
            dispatch(finishInvalidCoupon(param,res));
        })
    }
}