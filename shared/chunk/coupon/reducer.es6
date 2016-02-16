'use strict';
import {combineReducers} from "redux";
import {
    START_FETCH_COUPON,FINISH_FETCH_COUPON,
    START_FETCH_DETAIL,FINISH_FETCH_DETAIL,
    FETCH_COUPON_ID
} from "./constant.es6";

function index(state={},action){
    switch(action.type){
    	case START_FETCH_COUPON:
    		return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
    	case FINISH_FETCH_COUPON:
            const type = action.param.type;
            const res = action.res;
            let pagination = {...state.pagination};
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

function detail(state={},action){
    switch(action.type){
        case START_FETCH_DETAIL:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
        case FINISH_FETCH_DETAIL:
            return Object.assign({},state,{
                isFetching:false,
                isFetched:true,
                coupon:action.res
            });
        default:
            return state;
    }
}

function rule(state={},action){
    switch(action.type){
        case FETCH_COUPON_ID:
            return Object.assign({},state,{
                couponNo:action.param.id
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    index,detail,rule
});

export default rootReducer;