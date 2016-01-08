'use strict';

import {
    REQUEST_HOTWORD,
    RESPONSE_HOTWORD,
    REQUEST_SINGLERECOMMEND,RESPONSE_SINGLERECOMMEND,
    REQUEST_NEWRECOMMEND,RESPONSE_NEWRECOMMEND
} from "./constant.es6";
import {combineReducers} from "redux";

function search(state={},action){
    switch(action.type){
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
        default:
            return state;
    }
}

function index(state={},action){
    switch(action.type){
        case REQUEST_SINGLERECOMMEND:
            return Object.assign({},state,{
                singleRecommendFetched:false,
                singleRecommendFetching:true
            });
        case RESPONSE_SINGLERECOMMEND:
            const singleRecommend = action.res.result;
            const singleRecommendFetched = action.res.goodFetched;
            return Object.assign({},state,{
                singleRecommend,
                singleRecommendFetched,
                singleRecommendFetching:false
            })
        case REQUEST_NEWRECOMMEND:
            return Object.assign({},state,{
                newRecommendFetched:false,
                newRecommendFetching:true
            });
        case RESPONSE_NEWRECOMMEND:
            const newRecommend = action.res.result;
            const newRecommendFetched = action.res.goodFetched;
            return Object.assign({},state,{
                newRecommend,
                newRecommendFetched,
                newRecommendFetching:false
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    index,search
});

export default rootReducer;