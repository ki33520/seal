'use strict'
import {combineReducers} from "redux";
import _ from "lodash";
import {
    REQUEST_GOODS,RECEIVE_GOODS,
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD
} from "./constant.es6";

function trendy(state={},action){
    let categories = state.categories
    switch(action.type){
        case REQUEST_GOODS:
            categories[action.param.index]["isFetching"] = true
            return Object.assign({},state,{
                categories
            });
        case RECEIVE_GOODS:
            categories[action.param.index]["isFetching"] = false
            categories[action.param.index]["isFetched"] = action.res.isFetched
            if(action.res.isFetched){
                categories[action.param.index]["list"] = _.union(categories[action.param.index]["list"],
                    action.res.pagination.goodList)
                categories[action.param.index]["totalPage"] = action.res.pagination.totalPage
                categories[action.param.index]["pageIndex"] = action.res.pagination.pageIndex
            }
            return Object.assign({},state,{
                categories
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
    trendy
});

export default rootReducer;