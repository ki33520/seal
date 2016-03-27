'use strict';

import {
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_SEARCHHISTORY,RESPONSE_SEARCHHISTORY,
    START_PURGE_SEARCHHISTORY,FINISH_PURGE_SEARCHHISTORY,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD,
    REQUEST_SINGLERECOMMEND,RESPONSE_SINGLERECOMMEND,
    REQUEST_NEWRECOMMEND,RESPONSE_NEWRECOMMEND,
    REQUEST_CHANNEL,RESPONSE_CHANNEL,
    REQUEST_UPDATEGOODS,RESPONSE_UPDATEGOODS
} from "./constant.es6";
import {CHANGE_FIELD} from "../common/constant.es6";
import {combineReducers} from "redux";
import _ from "lodash";

function search(state={},action){
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

function index(state={},action){
    let channels = state.channels
    switch(action.type){
        case REQUEST_SINGLERECOMMEND:
            channels = channels.map((channel)=>{
                if(channel.id === action.param.id){
                    channel.singleRecommendFetching = true
                    channel.singleRecommendFetched = false
                }
                return channel
            })
            return Object.assign({},state,{
                channels
            });
        case RESPONSE_SINGLERECOMMEND:
                channels = channels.map((channel)=>{
                    if(action.res.goodFetched){
                        if(channel.id === action.channelId && channel["floors"].singleRecommend){
                            channel["floors"].singleRecommend.goods = _.union(channel["floors"].singleRecommend.goods,action.res.result.list)
                            channel["floors"].singleRecommend.totalPage = action.res.result.totalPage
                            channel["floors"].singleRecommend.pageIndex = action.res.result.pageIndex
                        }
                    }
                    channel.singleRecommendFetched = action.res.goodFetched
                    channel.singleRecommendFetching = false
                    return channel
                })
            return Object.assign({},state,{
                channels,
            })
        case REQUEST_NEWRECOMMEND:
            channels = channels.map((channel)=>{
                if(channel.id === action.param.id){
                    channel.newRecommendFetching = true
                    channel.newRecommendFetched = false
                }
                return channel
            })
            return Object.assign({},state,{
                channels
            });
        case RESPONSE_NEWRECOMMEND:
                channels = channels.map((channel)=>{
                    if(action.res.goodFetched){
                        if(channel.id === action.channelId && channel["floors"].newRecommend){
                            channel["floors"].newRecommend.goods = _.union(channel["floors"].newRecommend.goods,action.res.result.list)
                            channel["floors"].newRecommend.totalPage = action.res.result.totalPage
                            channel["floors"].newRecommend.pageIndex = action.res.result.pageIndex
                        }
                    }
                    channel.newRecommendFetched = action.res.goodFetched
                    channel.newRecommendFetching = false
                    return channel
                })
            return Object.assign({},state,{
                channels
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
        case REQUEST_UPDATEGOODS:
            return Object.assign({},state,{
                goodsUpdated:false,
                goodsUpdating:true
            })
        case RESPONSE_UPDATEGOODS:
            if(action.res.goodsUpdated){
                let _channels = []
                channels.forEach((channel)=>{
                    let _channel = Object.assign({},channel)
                    if(_channel.id = action.channelId){
                        if(action.floor === "flashbuys"){
                            if(_channel["floors"]["flashbuys"]){
                            _channel["floors"]["flashbuys"] = _channel["floors"]["flashbuys"].map((flashbuy)=>{
                                flashbuy["goods"] = floorGoods(flashbuy["goods"],
                                action.res.result)
                                return flashbuy
                            })
                            }
                        }else{
                            _channel["floors"][action.floor]["goods"] = floorGoods(_channel["floors"][action.floor]["goods"],
                                action.res.result)
                        }
                    }
                    _channels.push(_channel)
                })
            }
            return Object.assign({},state,{
                goodsUpdated:action.res.goodsUpdated,
                goodsUpdating:false,
                channels,
            })
        default:
            return state
    }
}

function floorGoods(goods,updatedGoods){
    let _goods = goods.map((good)=>{
        let updatedGood = updatedGoods[good.singleCode]
        good = Object.assign({},good,updatedGood)
        return good
    })
    return _goods
}

const rootReducer = combineReducers({
    index,search
});

export default rootReducer;