'use strict'
import {
    REQUEST_GOODS,RECEIVE_GOODS
} from "./action.es6";
import {combineReducers} from "redux";
import _ from "../../lib/lodash.es6";

function goodsByParam(state={},action){
    switch(action.type){
        case REQUEST_GOODS:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
        case RECEIVE_GOODS:
            const {activityList,isFetched} = action.res;
            let _list = _.union(state.activityList,activityList);
            return Object.assign({},state,{
                isFetching:false,
                activityList:_list,
                isFetched
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    goodsByParam
});

export default rootReducer;