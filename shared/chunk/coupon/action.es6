'use strict';
import {apiRequest} from "../../lib/util.es6";
import {
    START_FETCH_COUPON,FINISH_FETCH_COUPON,
    START_FETCH_DETAIL,FINISH_FETCH_DETAIL,
    FETCH_COUPON_ID
} from "./constant.es6";
import {urlPrefix} from "../../lib/jumpurl.es6";
function requestCoupon(param){
    return {
        type:START_FETCH_COUPON,
        param
    }
}

function receiveCoupon(param,res){
	return {
        type:FINISH_FETCH_COUPON,
        res,
        param,
    }
}

function startFetchCouponDetail(param){
    return {
        type:START_FETCH_DETAIL,
        param
    }
}
function finishFetchCouponDetail(param,res){
    return {
        type:FINISH_FETCH_DETAIL,
        param,
        res
    }
}
export function fetchCoupons(param){
	return (dispatch)=>{
        dispatch(requestCoupon(param));
        apiRequest(urlPrefix+'/coupon',param).then((res)=>{
            dispatch(receiveCoupon(param,res));
        });
    }
}

export function fetchCouponDetail(param){
    return (dispatch)=>{
        dispatch(startFetchCouponDetail(param));
        apiRequest(urlPrefix+'/coupon/'+param.id,{}).then((res)=>{
            dispatch(finishFetchCouponDetail(param,res));
        });
    }
}

export function fetchCouponId(param){
    return {
        type:FETCH_COUPON_ID,
        param
    }
}
