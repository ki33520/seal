'use strict'
import {
    REQUEST_GOODS,RECEIVE_GOODS
} from "./action.es6";
import {combineReducers} from "redux";
import _ from "lodash";


function goodsByParam(state={},action){
    switch(action.type){
        case REQUEST_GOODS:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
        case RECEIVE_GOODS:
            const {list,isFetched} = action.res;
            let _list = _.union(state.list,list);
            return Object.assign({},state,{
                isFetching:false,
                list:_list,
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