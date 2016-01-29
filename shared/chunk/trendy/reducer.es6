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
    let categories = state.categories;
    switch(action.type){
        case REQUEST_GOODS:
            var category = {...categories[action.param.index]};
            category.isFetching = true;
            categories[action.param.index] = category;
            return Object.assign({},state,{
                categories
            });
        case RECEIVE_GOODS:
            var i = action.param.index;
            var pagination = action.res.pagination;
            var category = {...categories[i]};
            category.isFetching = false;
            category.isFetched = action.res.isFetched;
            if(action.res.isFetched){
                category.list = _.union(categories[i].list,pagination.goodList);
                category.totalPage = pagination.totalPage;
                category.pageIndex = pagination.pageIndex;
                categories[i]=category;
            }
            return Object.assign({},state,{
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