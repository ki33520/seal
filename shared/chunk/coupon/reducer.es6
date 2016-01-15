'use strict';

import {combineReducers} from "redux";
import {START_FETCH_COUPON,FINISH_FETCH_COUPON} from "./action.es6"; 
function couponByUser(state={},action){

    switch(action.type){
    	case START_FETCH_COUPON:
    		return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
    	case FINISH_FETCH_COUPON:
            const type = action.param.type;
            const res = action.pagination[type];
            let {pagination} = state;
            let coupons = _.union(pagination[type].coupons,res.coupons);
            pagination[type].pageIndex = res.pageIndex;
            pagination[type].totalPage = res.totalPage;
            pagination[type].coupons = coupons;
    		return Object.assign({},state,{
                isFetching:false,
                isFetched:true,
                pagination:pagination
            });
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    couponByUser
});

export default rootReducer;