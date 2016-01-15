'use strict';
import {apiRequest} from "../../lib/util.es6";

export const START_FETCH_COUPON = "START_FETCH_COUPON";
export const FINISH_FETCH_COUPON = "FINISH_FETCH_COUPON";

function requestCoupon(param){
    return {
        type:START_FETCH_COUPON,
        param
    }
}

function receiveCoupon(param,res){
	return {
        type:FINISH_FETCH_COUPON,
        pagination:res.pagination,
        param,
    }
}


export function fetchCoupons(param){
	return (dispatch)=>{
        dispatch(requestCoupon(param));
        apiRequest('/coupon',param,{method:"POST"}).then((res)=>{
            dispatch(receiveCoupon(param,res));
        })
    }
}