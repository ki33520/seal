'use strict';

import {combineReducers} from "redux";
import {START_FETCH_COUPON,FINISH_YOUA_COUPON,
	FINISH_UNION_COUPON,FINISH_INVALID_COUPON} from "./action.es6"; 
function couponByUser(state={},action){
    switch(action.type){
    	case START_FETCH_COUPON:
    		return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
    	case FINISH_YOUA_COUPON:
    		var pageIndex = action.res.pageIndex;
    		var coupons = action.res.coupons;
    		return Object.assign({},state,{
                isFetching:false,
                isFetched:true,
                enableCoupons:coupons,
                enableIndex:pageIndex,
            });
        case FINISH_UNION_COUPON:
    		var pageIndex = action.res.pageIndex;
    		var coupons = action.res.coupons;
    		return Object.assign({},state,{
                isFetching:false,
                isFetched:true,
                legueCoupons:coupons,
                legueIndex:pageIndex,

            });
        case FINISH_INVALID_COUPON:
    		var pageIndex = action.res.pageIndex;
    		var coupons = action.res.coupons;
    		return Object.assign({},state,{
                isFetching:false,
                isFetched:true,
                invalidCoupons:coupons,
                invalidIndex:pageIndex,

            });
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    couponByUser
});

export default rootReducer;