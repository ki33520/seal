'use strict'
import {combineReducers} from "redux";
import _ from "lodash";

import {
    START_FETCH_GOODS,FINISH_FETCH_GOODS,
    START_REQUEST_GOODS,FINISH_REQUEST_GOODS,
    TOGGLE_CHECKED,
    START_RESET_FILTER,FINISH_RESET_FILTER
} from "./constant.es6";

import {search} from "../common/reducer.es6";
 
function index(state={},action){
    switch(action.type){
        case START_FETCH_GOODS:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
        case FINISH_FETCH_GOODS:
            return Object.assign({},state,{
                isFetching:false,
                isFetched:action.res.isFetched,
                list:action.res.list,
                params:action.param
            });
        case START_REQUEST_GOODS:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
        case FINISH_REQUEST_GOODS:
            var list = [];
            state.list.forEach((item)=>{
                list.push(item);
            });
            action.res.list.forEach((item)=>{
                list.push(item);
            });
            return Object.assign({},state,{
                isFetching:false,
                isFetched:action.res.isFetched,
                params:action.param,
                list
            });
        case TOGGLE_CHECKED:
            var filters = {...state.filters};
            var {name,values} = action.params;
            filters[name] = values;
            return Object.assign({},state,{
                filters
            });
        case START_RESET_FILTER:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
        case FINISH_RESET_FILTER:
            var {isFetched,filters,params} = action.res;
             return Object.assign({},state,{
                isFetching:false,
                isFetched,
                filters,
                params
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    index,search
});

export default rootReducer;