'use strict'
import {combineReducers} from "redux";
import {
    REQUEST_CATEGORYBRANDS,RESPONSE_CATEGORYBRANDS,
    REQUEST_CATEGORYACTIVITY,RESPONSE_CATEGORYACTIVITY,
    REQUEST_ALLBRANDS,RESPONSE_ALLBRANDS,
    REQUEST_ALLORIGINS,RESPONSE_ALLORIGINS,
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD
} from "./constants.es6";
import {CHANGE_FIELD} from "../common/constant.es6";

function allCategory(state={},action){
    switch(action.type){
        case REQUEST_CATEGORYACTIVITY:
            return Object.assign({},state,{
                categoryActivityFetched:false,
                categoryActivityFetching:true
            })
        case RESPONSE_CATEGORYACTIVITY:
            let categoryactivity = null
            if(action.res.isFetched){
                categoryactivity = action.res.result
            }
            return Object.assign({},state,{
                categoryactivity,
                categoryActivityFetching:false,
                categoryActivityFetched:action.res.isFetched,
            })
        default:
            return state;
    }
}

function categoryBrands(state={},action){
    switch(action.type){
        case REQUEST_CATEGORYBRANDS:
            return Object.assign({},state,{
                categoryBrandsFetched:false,
                categoryBrandsFetching:true
            });
        case RESPONSE_CATEGORYBRANDS:
            const categorybrands = action.res.result;
            const categoryBrandsFetched = action.res.categoryBrandsFetched;
            return Object.assign({},state,{
                ...categorybrands,
                categoryBrandsFetched,
                categoryBrandsFetching:false
            })
        default:
            return state
    }
}

function allBrand(state={},action){
    switch(action.type){
        case REQUEST_ALLBRANDS:
            return Object.assign({},state,{
                brandsFetched:false,
                brandsFetching:true
            });
        case RESPONSE_ALLBRANDS:
            const brands = action.res.result;
            const brandsFetched = action.res.brandsFetched;
            return Object.assign({},state,{
                brands,
                brandsFetched,
                brandsFetching:false
            })
        default:
            return state
    }
}

function allOrigin(state={},action){
    switch(action.type){
        case REQUEST_ALLORIGINS:
            return Object.assign({},state,{
                originFetched:false,
                originFetching:true
            });
        case RESPONSE_ALLORIGINS:
            const origins = action.res.result;
            const originFetched = action.res.originFetched;
            return Object.assign({},state,{
                origins,
                originFetched,
                originFetching:false
            })
        default:
            return state
    }
}

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

const rootReducer = combineReducers({
    search,
    allCategory,
    categoryBrands,
    allBrand,
    allOrigin
});

export default rootReducer;