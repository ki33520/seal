'use strict';

import {
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD,
    REQUEST_SINGLERECOMMEND,RESPONSE_SINGLERECOMMEND,
    REQUEST_NEWRECOMMEND,RESPONSE_NEWRECOMMEND
} from "./constant.es6";
import {CHANGE_FIELD} from "../common/constant.es6";
import {combineReducers} from "redux";

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
            const associatewords = action.res.result;
            const associateWordFetched = action.res.associateWordFetched;
            return Object.assign({},state,{
                associatewords,
                associateWordFetched,
                associateWordFetching:false
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