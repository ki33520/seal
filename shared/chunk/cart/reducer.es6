'use strict';

import {combineReducers} from "redux";
import _ from "lodash";
import {START_UPDATE_CART,FINISH_UPDATE_CART,
START_FETCH_CART,FINISH_FETCH_CART,
START_DELETE_CART,FINISH_DELETE_CART} from "./action.es6";

function cartByUser(state={},action){
    switch(action.type){
        case START_UPDATE_CART:
            return Object.assign({},state,{
                isUpdating:true,
                isUpdated:false
            });
        case FINISH_UPDATE_CART:
            var isUpdated = false;
            if(action.res.isUpdated === true){
                isUpdated = true;
            }
            return Object.assign({},state,{
                isUpdating:false,
                isUpdated
            });
        case START_FETCH_CART:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
        case FINISH_FETCH_CART:
            var carts = action.res.object;
            return Object.assign({},state,{
                isFetching:false,
                isFetched:true,
                carts
            });
        case START_DELETE_CART:
            return Object.assign({},state,{
                isDeleting:true
            });
        case FINISH_DELETE_CART:
            var isDeleted = false;
            var carts = state.carts;
            if(action.res.code === "success"){
                const {cartIndex,goodInde} = action.param;
                carts.list[cartIndex].goods.splice(goodIndex,1);
                isDeleted = true
            }
            return Object.assign({},state,{
                isDeleting:false,
                isDeleted,
                carts
            });
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    cartByUser
})

export default rootReducer;