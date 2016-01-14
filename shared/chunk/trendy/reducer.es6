'use strict'
import {REQUEST_GOODS,RECEIVE_GOODS} from "./action.es6";
import {combineReducers} from "redux";
import _ from "lodash";


function goodsByParam(state={},action){
    switch(action.type){
        case REQUEST_GOODS:
            return Object.assign({},state,{
                isFetching:true
            });
        case RECEIVE_GOODS:
            const {goodList,totalPages,pageIndexs} = state;
            const {index} = action.param;
            goodList[index]= _.union(goodList[index],action.res.goodList);
            totalPages[index] = action.res.totalPage;
            pageIndexs[index] = action.res.pageIndex;
            return Object.assign({},state,{
                isFetching:false,
                goodList:goodList,
                totalPages:totalPages,
                pageIndexs:pageIndexs
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    goodsByParam
});

export default rootReducer;