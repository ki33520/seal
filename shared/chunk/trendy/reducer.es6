'use strict'
import {combineReducers} from "redux";
import _ from "lodash";
import {
    REQUEST_GOODS,RECEIVE_GOODS,
} from "./constant.es6";

import {search} from "../common/reducer.es6";

function trendy(state={},action){
    switch(action.type){
        case REQUEST_GOODS:
            var categories = state.categories.slice();
            var category = {...categories[action.param.index]};
            category.isFetching = true
            category.isFetched = false
            categories[action.param.index] = category;
            return Object.assign({},state,{
                categories,
            });
        case RECEIVE_GOODS:
            var categories = state.categories.slice();
            var i = action.param.index;
            const {goodList,totalPage,pageIndex} = action.res.pagination;
            const isFetched = action.res.isFetched;
            var category = {...categories[i]};
            category.isFetching = false
            category.isFetched = isFetched
            if(isFetched){
                category.list = _.union(category.list,goodList);
                category.totalPage = totalPage;
                category.pageIndex = pageIndex;
                categories[i]=category;
            }
            return Object.assign({},state,{
                categories
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    trendy,
    search
});

export default rootReducer;