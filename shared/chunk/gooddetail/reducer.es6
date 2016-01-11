'use strict';

import {combineReducers} from "redux";
import {RESPONSE_GOOD,REQUEST_GOOD,SELECT_ATTR,START_ADD_CART,FINISH_ADD_CART,
START_ADD_FAVORITE,FINISH_ADD_FAVORITE} from "./constant.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";
import _ from "lodash";

function goodById(state={},action){
    let good = {...state.good};
    switch(action.type){
        case SELECT_ATTR:
            good = selectAttr(good,action.attr,action.attrValue)
            return Object.assign({},state,{
                good:good
            })
        case REQUEST_GOOD:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false,
            })
        case RESPONSE_GOOD:
            good = Object.assign({},good,
                _.omit(action.res.result,"slides"))
            return Object.assign({},state,{
                isFetching:false,
                isFetched:action.res.isFetched,
                good
            })
        case START_ADD_FAVORITE:
            return Object.assign({},state,{
                favoriteAdding:true
            });
        case FINISH_ADD_FAVORITE:
            var favored = state.favored;
            if(action.res.code === "success"){
                favored = true
            }
            return Object.assign({},state,{
                favoriteAdding:false,
                favored
            })
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

function selectAttr(good,selectedAttr,selectedAttrValue){
    let attrs = good.attrs.map((v,k)=>{
        if(v.attrName === selectedAttr.attrName){
            v.selectedValue = selectedAttrValue;
        }else if(k !== 0){
           v.selectedValue = null
        }
        return v;
    })
    let matchedItems = getMatchedItems(attrs)
    _.each(attrs,(attr,i)=>{
        const attrName = attr.attrName
        if(attr.selectedValue !== null){
            return
        }
        attrs[i].attrValues = attr.attrValues.map((attrValue)=>{
            const value = attrValue.value
            const itemFoundPredicate = {
                attrs:{
                    [attrName]:value
                }
            };
            const itemFound = _.findWhere(matchedItems,itemFoundPredicate);
            attrValue.disabled = false;
            if(itemFound === undefined){
                // console.log("%s:%s stock not found",attrName,value)
                attrValue.disabled = true;
            }else if(itemFound.stock === 0){
                attrValue.disabled = true;
                // console.log("%s:%s stock is 0",attrName,value)
            }
            return attrValue;
        })
    })
    const notFullFilled = _.some(attrs,{selectedValue:null});
    let selectedItem = null
    if(matchedItems.length === 1 && notFullFilled === false){
        selectedItem = matchedItems[0];
    }
    good.selectedItem = selectedItem
    return good
    function getMatchedItems(attrs){
        const selectedAttrs = _.filter(attrs,(attr)=>{
            return attr.selectedValue !== null;
        })
        var itemPredicate = {attrs:{}};
        _.each(selectedAttrs,(attr)=>{
            itemPredicate.attrs[attr.attrName] = attr.selectedValue.value;
        })
        matchedItems = _.where(good.items,itemPredicate);
        return matchedItems;
    }
}


function cartByUser(state={},action){
    switch(action.type){
        case START_ADD_CART:
            return Object.assign({},state,{
                cartAdding:true,
                cartAdded:false
            });
        case FINISH_ADD_CART:
            var cartCount = state.cartCount === ""?0:state.cartCount;
            const buyed = action.param.qty;
            if(action.res.cartAdded === true){
                cartCount += buyed;
            }
            return Object.assign({},state,{
                cartAdding:false,
                cartAdded,
                cartCount
            })
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    goodById,
    cartByUser
});

export default rootReducer;