'use strict'
import {combineReducers} from "redux";
import _ from "lodash";
 
import {
    REQUEST_GOODS,RECEIVE_GOODS,
    REQUEST_HOTWORD,RESPONSE_HOTWORD,CHANGE_FIELD,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD
} from "./constant.es6";

function goodsByParam(state={},action){
    switch(action.type){
        case REQUEST_GOODS:
            return Object.assign({},state,{
                isFetching:true
            });
        case RECEIVE_GOODS:
            return Object.assign({},state,{
                isFetching:action.res.isFetching,
                goods:action.res.goods,
                page:action.res.page
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
            
            search = {
                keyword:action.param.keyword,
                hotwords:associatewords
            }
            return Object.assign({},state,{
                keyword:action.param.keyword,
                hotwords:associatewords,
                associateWordFetched,
                associateWordFetching:false
            });
        case CHANGE_FIELD:
            return Object.assign({},state,{
                keyword:action.param.keyword
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    goodsByParam
});

export default rootReducer;