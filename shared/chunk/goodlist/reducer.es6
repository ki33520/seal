'use strict'
import {combineReducers} from "redux";
import _ from "lodash";
 
import {
    REQUEST_GOODS,RECEIVE_GOODS,
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD,
    CHANGE_PARAM,CHANGE_ClASS_ITEM,CHANGE_BRAND_ITEM,CHANGE_AREA_ITEM,
    RESET_ALL_ITEM
} from "./constant.es6";

function goodsByParam(state={},action){
    switch(action.type){
        case REQUEST_GOODS:
            return Object.assign({},state,{
                isFetching:true
            });
        case CHANGE_PARAM:
            return Object.assign({},state,{
                searchParams:action.param
            });
        case CHANGE_ClASS_ITEM:
            return Object.assign({},state,{
                filters:action.param
            });
        case RESET_ALL_ITEM:
            return Object.assign({},state,{
                isFetching:action.res.isFetching,
                goods:action.res.goods,
                searchParams:action.param,
                pageIndex:action.param.pageIndex
            });
        case RECEIVE_GOODS:
            return Object.assign({},state,{
                isFetching:action.res.isFetching,
                goods:action.res.goods,
                searchParams:action.param,
                pageIndex:action.param.pageIndex
            });
        case REQUEST_HOTWORD:
            return Object.assign({},state,{
                hotwordFetched:false,
                hotwordFetching:true
            });
        case RESPONSE_HOTWORD:
            const hotwords = action.res.result;
            const hotwordFetched = action.res.hotwordFetched;
            return Object.assign({},state,{
                hotwords,
                hotwordFetched,
                hotwordFetching:false
            });
        case REQUEST_ASSOICATEWORD:
            return Object.assign({},state,{
                associateWordFetched:false,
                associateWordFetching:true
            });
        case RESPONSE_ASSOICATEWORD:
            const associatewords = action.res.result;
            const associateWordFetched = action.res.associateWordFetched;
            return Object.assign({},state,{
                associatewords,
                associateWordFetched,
                associateWordFetching:false
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    goodsByParam
});

export default rootReducer;