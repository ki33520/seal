'use strict'
import {combineReducers} from "redux";
import _ from "lodash";
 
import {
    REQUEST_GOODS,RECEIVE_GOODS,
    TOGGLE_CHECKED,RESET_FILTER
} from "./constant.es6";

function goodsByParam(state={},action){
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

const rootReducer = combineReducers({
    goodsByParam
});

export default rootReducer;