'use strict';

import {
    SHOW_ALERT,HIDE_ALERT,CHANGE_FIELD,
    SHOW_ACTIVITYINDICATOR,HIDE_ACTIVITYINDICATOR,
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_SEARCHHISTORY,RESPONSE_SEARCHHISTORY,
    START_PURGE_SEARCHHISTORY,FINISH_PURGE_SEARCHHISTORY,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD,
    REQUEST_CARTCOUNT,RESPONSE_CARTCOUNT
} from "./constant.es6";

export function alertReducer(state={},action){
    switch(action.type){
        case SHOW_ALERT:
            return Object.assign({},state,{
                alertActive:true,
                alertContent:action.content
            });
        case HIDE_ALERT:
            return Object.assign({},state,{
                alertActive:false,
                alertContent:action.content
            });
        default:
            return state;
    }
}

export function activityIndicatorReducer(state={},action){
    switch(action.type){
        case SHOW_ACTIVITYINDICATOR:
            return Object.assign({},state,{
                activityIndicatorContent:action.content,
                activityIndicatorActive:true
            })
        case HIDE_ACTIVITYINDICATOR:
            return Object.assign({},state,{
                activityIndicatorActive:false,
                activityIndicatorContent:action.content  
            })
    }
}

export function sceneReducer(state={},action){
    switch(action.type){
        case CHANGE_SCENE:
            let prevScene = state.currentScene || null
            let currentScene = action.scene;
            return Object.assign({},state,{
                prevScene,currentScene
            })
        default:
            return state;
    }
}

export function search(state={},action){
    let history = null;
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
        case REQUEST_SEARCHHISTORY:
            return Object.assign({},state,{
                historyFetched:false,
                historyFetching:true
            });
        case RESPONSE_SEARCHHISTORY:
            history = action.res.result
            const historyFetched = action.res.isFetched;
            return Object.assign({},state,{
                history,
                historyFetched,
                historyFetching:false
            })
        case START_PURGE_SEARCHHISTORY:
            return Object.assign({},state,{
                historyPurged:false,
                historyPurging:true
            })
        case FINISH_PURGE_SEARCHHISTORY:
            history = state.history
            if(action.res.isFinished){
                history = []
            }
            return Object.assign({},state,{
                history,
                historyPurged:action.res.isFinished,
                historyPurging:false
            })
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
            })
        default:
            return state;
    }
}

export function cartByCount(state={},action){
    switch(action.type){
        case REQUEST_CARTCOUNT:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false,
            });
        case RESPONSE_CARTCOUNT:
            const {isFetched,result} = action.res;
            return Object.assign({},state,{
                isFetching:false,
                isFetched:isFetched,
                amount:result
            });
        default:
            return state;
    }
}
