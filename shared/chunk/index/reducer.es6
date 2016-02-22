'use strict';

import {
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_SEARCHHISTORY,RESPONSE_SEARCHHISTORY,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD,
    REQUEST_SINGLERECOMMEND,RESPONSE_SINGLERECOMMEND,
    REQUEST_NEWRECOMMEND,RESPONSE_NEWRECOMMEND,
    REQUEST_CHANNEL,RESPONSE_CHANNEL
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
        case REQUEST_SEARCHHISTORY:
            return Object.assign({},state,{
                historyFetched:false,
                historyFetching:true
            });
        case RESPONSE_SEARCHHISTORY:
            const history = action.res.result;
            const historyFetched = action.res.isFetched;
            return Object.assign({},state,{
                history,
                historyFetched,
                historyFetching:false
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

function index(state={},action){
    let channels = state.channels
    switch(action.type){
        case REQUEST_SINGLERECOMMEND:
            return Object.assign({},state,{
                singleRecommendFetched:false,
                singleRecommendFetching:true
            });
        case RESPONSE_SINGLERECOMMEND:
            if(action.res.goodFetched){
                channels = channels.map((channel)=>{
                    if(channel.id === action.channelId){
                        channel["floors"].singleRecommend.goods = action.res.result
                    }
                    return channel
                })
            }
            return Object.assign({},state,{
                channels,
                singleRecommendFetched:action.res.goodFetched,
                singleRecommendFetching:false
            })
        case REQUEST_NEWRECOMMEND:
            return Object.assign({},state,{
                newRecommendFetched:false,
                newRecommendFetching:true
            });
        case RESPONSE_NEWRECOMMEND:
            if(action.res.goodFetched){
                channels = channels.map((channel)=>{
                    if(channel.id === action.channelId){
                        channel["floors"].newRecommend.goods = action.res.result
                    }
                    return channel
                })
            }
            return Object.assign({},state,{
                channels,
                newRecommendFetched:action.res.goodFetched,
                newRecommendFetching:false
            })
        case REQUEST_CHANNEL:
            channels = channels.map((channel)=>{
                if(channel.id === action.param.id){
                    channel.channelFetching = true
                    channel.channelFetched = false
                }
                return channel
            })
            return Object.assign({},state,{
                channels
            });
        case RESPONSE_CHANNEL:
            const {channelFetched,result} = action.res
            channels = channels.map((channel)=>{
                if(channel.id === action.param.id){
                    if(channelFetched){
                        channel.floors = result
                    }
                    channel.channelFetched = channelFetched
                    channel.channelFetching = false
                }
                return channel
            })
            return Object.assign({},state,{
                channels,
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    index,search
});

export default rootReducer;