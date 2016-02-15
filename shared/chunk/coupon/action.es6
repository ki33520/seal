'use strict';
import {apiRequest} from "../../lib/util.es6";
import {START_FETCH_COUPON,FINISH_FETCH_COUPON} from "./constant.es6";

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


export function fetchCoupons(param){
	return (dispatch)=>{
        dispatch(requestCoupon(param));
        apiRequest('/coupon',param,{method:"POST"}).then((res)=>{
            dispatch(receiveCoupon(param,res));
        })
    }
}