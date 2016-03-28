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
                isFetched:false,
                isLoading:action.param.isLoading
            });
    	case FINISH_FETCH_COUPON:
            const type = action.param.type;
            const {isFetched,pagination} = action.res;
            const {pageIndex,totalPage,coupons} = pagination;
            let _pagination = {...state.pagination};
            const _coupons = _.union(_pagination[type].coupons,coupons);
            _pagination[type].pageIndex = pageIndex;
            _pagination[type].totalPage = totalPage;
            _pagination[type].coupons = _coupons;
    		return Object.assign({},state,{
                isFetching:false,
                isFetched,
                isLoading:false,
                pagination:_pagination
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