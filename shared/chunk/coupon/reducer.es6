'use strict';

import {combineReducers} from "redux";
import {START_FETCH_COUPON,FINISH_YOUA_COUPON,
	FINISH_UNION_COUPON,FINISH_INVALID_COUPON} from "./action.es6"; 
function couponByUser(state={},action){
    let list;
    switch(action.type){
    	case START_FETCH_COUPON:
    		return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
    	case FINISH_YOUA_COUPON:
            list = _.union(state.youaCoupons.coupons,action.res.pagination.coupons);
            action.res.pagination.coupons = list;
            action.res.pagination.pageIndex = action.param.pageIndex;
    		return Object.assign({},state,{
                isFetching:false,
                isFetched:true,
                youaCoupons:action.res.pagination
            });
        case FINISH_UNION_COUPON:
            list = _.union(state.legueCoupons.coupons,action.res.pagination.coupons);
            action.res.pagination.coupons = list;
            action.res.pagination.pageIndex = action.param.pageIndex;
    		return Object.assign({},state,{
                isFetching:false,
                isFetched:true,
                legueCoupons:action.res.pagination

            });
        case FINISH_INVALID_COUPON:
    		list = _.union(state.invalidCoupons.coupons,action.res.pagination.coupons);
            action.res.pagination.coupons = list;
            action.res.pagination.pageIndex = action.param.pageIndex;
    		return Object.assign({},state,{
                isFetching:false,
                isFetched:true,
                invalidCoupons:action.res.pagination

            });
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    couponByUser
});

export default rootReducer;