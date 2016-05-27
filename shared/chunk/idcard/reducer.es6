'use strict';
import {combineReducers} from "redux";
import _ from "lodash";
import {
    START_FETCH_COUPON,FINISH_FETCH_COUPON,
    START_FETCH_DETAIL,FINISH_FETCH_DETAIL
} from "./constant.es6";

function index(state={},action){
    switch(action.type){
    	case START_FETCH_COUPON:
    		return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
    	case FINISH_FETCH_COUPON:
            const index = action.param.index;
            const {isFetched,list,pageIndex,totalPage} = action.res;
            const coupons = state.coupons.slice();
            const _list = _.union(coupons[index].list,list);
            if(isFetched){
                const coupon = {...coupons[index],list:_list,pageIndex,totalPage};
                coupons[index]=coupon;
            }
    		return Object.assign({},state,{
                coupons,
                isFetched,
                isFetching:false
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
                isFetched:false,
                coupon:null
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

const rootReducer = combineReducers({
    index,detail
});

export default rootReducer;