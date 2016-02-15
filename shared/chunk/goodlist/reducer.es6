'use strict'
import {combineReducers} from "redux";
import _ from "lodash";

import {
    REQUEST_GOODS,RECEIVE_GOODS,
    TOGGLE_CHECKED,RESET_FILTER,
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD
} from "./constant.es6";

import {CHANGE_FIELD} from "../common/constant.es6";
 
function index(state={},action){
    switch(action.type){
        case REQUEST_GOODS:
            return Object.assign({},state,{
                isFetching:true
            });
        case RECEIVE_GOODS:
            return Object.assign({},state,{
                isFetching:false,
                isFetched:action.res.isFetched,
                list:action.res.list,
                params:action.params
            });
        case TOGGLE_CHECKED:
            var filters = {...state.filters};
            var {name,values} = action.params;
            filters[name] = values;
            return Object.assign({},state,{
                filters
            });
        case RESET_FILTER:
            var filters = state.filters;
            var categoryNames = filters.categoryNames.slice();
            var brandNames = filters.brandNames.slice();
            var areaNames = filters.areaNames.slice();
            categoryNames.forEach((item,i)=>{
                categoryNames[i]=Object.assign({},item,{isChecked:false});
            });
            brandNames.forEach((item,i)=>{
                brandNames[i]=Object.assign({},item,{isChecked:false});
            });
            areaNames.forEach((item,i)=>{
                areaNames[i]=Object.assign({},item,{isChecked:false});
            });
            return Object.assign({},state,{
                filters:{categoryNames,brandNames,areaNames}
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
            });
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
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    index,search
});

export default rootReducer;