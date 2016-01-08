'use strict';
import {apiRequest} from "../../lib/util.es6";

export const REQUEST_COUPON = "REQUEST_COUPON";
export const RECEIVE_COUPON = "RECEIVE_COUPON";


function requestCoupon(){
    return {
        type:REQUEST_COUPON
    }
}

function receiveCoupon(param,res){
	return {
        type:RECEIVE_COUPON,
        param,
        res
    }
}

 

export default function fetchCoupon(url,param){
	return (dispatch)=>{
        dispatch(requestCoupon());
        apiRequest('/fetchCoupon',param,{method:"POST"}).then((res)=>{
            dispatch(receiveCoupon(param,res));
        })
    }
}