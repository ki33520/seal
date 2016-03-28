'use strict'
import {combineReducers} from "redux";
import _ from "lodash";
import {
    REQUEST_GOODS,RECEIVE_GOODS,
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD
} from "./constant.es6";
import {CHANGE_FIELD} from "../common/constant.es6";

function trendy(state={},action){
    switch(action.type){
        case REQUEST_GOODS:
            var categories = state.categories.slice();
            var category = {...categories[action.param.index]};
            categories[action.param.index] = category;
            return Object.assign({},state,{
                categories,
                isFetching:true,
                isFetched:false
            });
        case RECEIVE_GOODS:
            var categories = state.categories.slice();
            var i = action.param.index;
            const {goodList,totalPage,pageIndex} = action.res.pagination;
            const isFetched = action.res.isFetched;
            if(isFetched){
                var category = {...categories[i]};
                category.list = _.union(category.list,goodList);
                category.totalPage = totalPage;
                category.pageIndex = pageIndex;
                categories[i]=category;
            }
            return Object.assign({},state,{
                isFetching:false,
                isFetched,
                categories
            });
        default:
            return state;
    }
}

function search(state={},action){
    switch(action.type){
        case CHANGE_FIELD:
            const {name,value} = action;
            return Object.assign({},state,{
                [name]:value
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
            })
        case REQUEST_ASSOICATEWORD:
            return Object.assign({},state,{
                associateWordFetched:false,
                associateWordFetching:true
            });
        case RESPONSE_ASSOICATEWORD:
            const associateWords = action.res.result;
            const associateWordFetched = action.res.associateWordFetched;
            return Object.assign({},state,{
                associateWords,
                associateWordFetched,
                associateWordFetching:false
            })
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    trendy,
    search
});

export default rootReducer;