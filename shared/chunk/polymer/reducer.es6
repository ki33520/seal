'use strict'
import {combineReducers} from "redux";
import {
    REQUEST_CATEGORYBRANDS,RESPONSE_CATEGORYBRANDS,
    REQUEST_CATEGORYACTIVITY,RESPONSE_CATEGORYACTIVITY,
    REQUEST_ALLBRANDS,RESPONSE_ALLBRANDS,
    REQUEST_ALLORIGINS,RESPONSE_ALLORIGINS
} from "./constants.es6";
import {CHANGE_FIELD} from "../common/constant.es6";

import {search,cartByCount} from "../common/reducer.es6";

function allCategory(state={},action){
    switch(action.type){
        case REQUEST_CATEGORYACTIVITY:
            return Object.assign({},state,{
                categoryActivityFetched:false,
                categoryActivityFetching:true
            })
        case RESPONSE_CATEGORYACTIVITY:
            let categories = state.categories;
            if(action.res.isFetched){
                categories = categories.map((category)=>{
                    if(category.code === action.param.code){
                        category.activity = action.res.result
                    }
                    return category
                })
            }
            return Object.assign({},state,{
                categories,
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

const rootReducer = combineReducers({
    search,
    allCategory,
    categoryBrands,
    allBrand,
    allOrigin,
    cartByCount
});

export default rootReducer;