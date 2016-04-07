'use strict';

import {combineReducers} from "redux";
import {RECEIVE_COMMENT,REQUEST_COMMENT,CHANGE_PHOTOS} from "./action.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/constant.es6";
import {alertReducer} from "../common/reducer.es6";

function commentByUser(state={},action){
    switch(action.type){
        case CHANGE_PHOTOS:
            return Object.assign({},state,{
                photos: action.photos
            })
        case REQUEST_COMMENT:
            return Object.assign({},state,{
                isFetched:false,
                isFetching:true
            })
        case RECEIVE_COMMENT:
            var cState = {...state};
            var {allComment,showComment} = action.res;
            if(allComment){
                allComment.list = _.union(cState.allComment.list,allComment.list);
            }
            if(showComment){
                showComment.list = cState.showComment && cState.showComment.list ? _.union(cState.showComment.list,showComment.list) : showComment.list;
            };
            return Object.assign({},state,{
                isFetching:false
            },action.res)
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    commentByUser
});

export default rootReducer;