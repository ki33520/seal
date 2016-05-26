'use strict'
import {combineReducers} from "redux";
import _ from "lodash";

import {
    START_FETCH_GOODS,FINISH_FETCH_GOODS,
    START_REQUEST_GOODS,FINISH_REQUEST_GOODS,
    TOGGLE_CHECKED,TOGGLE_SORTED,TOGGLE_HAVE_GOODS,
    TOGGLE_RESET_FILTER
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
            var {goodsList,pageIndex} = action.res;
            if(pageIndex>1){
                let stateList = [...state.goodsList];
                goodsList = stateList.concat(goodsList);
            }
            return Object.assign({},state,{
                isFetching:false,
                isFetched:action.res.isFetched,
                goodsList,
                pageIndex
            });
        case TOGGLE_SORTED:
            return Object.assign({},state,{
                sortType:action.param.sortType,
                viewType:action.param.viewType
            });
        case TOGGLE_HAVE_GOODS:
            return Object.assign({},state,{
                isHaveGoods:action.param.isHaveGoods
            });
        case TOGGLE_RESET_FILTER:
            var {isHaveGoods,categoryNames,brandNames,areaNames} = action.param;
            return Object.assign({},state,{
                isHaveGoods,
                categoryNames,
                brandNames,
                areaNames
            });
        case TOGGLE_CHECKED:
            var {name,values} = action.param;
            return Object.assign({},state,{
                [name]:values
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    index,search
});

export default rootReducer;