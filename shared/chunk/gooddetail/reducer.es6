'use strict';

import {combineReducers} from "redux";
import {RESPONSE_GOOD,REQUEST_GOOD,TOGGLE_ATTR,
    START_ADD_CART,FINISH_ADD_CART,
    REQUEST_CARTCOUNT,RESPONSE_CARTCOUNT,
    REQUEST_ISCOLLECTED,RESPONSE_ISCOLLECTED,
    REQUEST_COMMENTS,RESPONSE_COMMENTS,
    REQUEST_PROMOTIONS,RESPONSE_PROMOTIONS,
    REQUEST_FLASHBUY,RESPONSE_FLASHBUY,
START_TOGGLE_COLLECTED,FINISH_TOGGLE_COLLECTED} from "./constant.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/constant.es6";
import {alertReducer} from "../common/reducer.es6";
import _ from "lodash";

function goodById(state={},action){
    let good = {...state.good};
    switch(action.type){
        case TOGGLE_ATTR:
            good = toggleAttr(good,action.attrName,action.attrValue)
            return Object.assign({},state,{
                good
            })
        case REQUEST_GOOD:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false,
            })
        case RESPONSE_GOOD:
            good = Object.assign({},good,
                _.omit(action.res.result,["slides","attrs","selectedItem","stock"]))
            return Object.assign({},state,{
                isFetching:false,
                isFetched:action.res.isFetched,
                good
            })
        case REQUEST_ISCOLLECTED:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false,
            })
        case RESPONSE_ISCOLLECTED:
            let result = action.res.result || false
            return Object.assign({},state,{
                isCollected:result,
                isFetching:false,
                isFetched:action.res.isFetched
            })
        case START_TOGGLE_COLLECTED:
            return Object.assign({},state,{
                isToggling:true
            });
        case FINISH_TOGGLE_COLLECTED:
            let isCollected = state.isCollected
            if(action.res.result === true){
                isCollected = !isCollected
            }
            return Object.assign({},state,{
                isToggling:false,
                isCollected
            })
        case REQUEST_COMMENTS:
            return Object.assign({},state,{
                commentsFetching:true,
                commentsFetched:false,
            })
        case RESPONSE_COMMENTS:
            if(action.res.commentsFetched){
                good.comments = action.res.result
            }
            return Object.assign({},state,{
                good,
                commentsFetched:action.res.commentsFetched,
                commentsFetching:false
            })
        default:
            return state;
    }
}

function toggleAttr(good,selectedAttrName,selectedAttrValue){
    let _good = Object.assign({},good)
    let isAttrSelected = false
    _good.attrs[selectedAttrName].map((v)=>{
        if(v.value === selectedAttrValue.value){
            v.selected = !v.selected
            isAttrSelected = v.selected
        }else{
            v.selected = false
        }
        return v
    })

    let selectedAttrs = {}
    for(let attrName in _good.attrs){
        let attrValues = _good.attrs[attrName]
        if(_.some(attrValues,{selected:true,disabled:false})){
            selectedAttrs[attrName] = _.findWhere(attrValues,{selected:true}).value
        }
    }

    let isNeedValidateStock = false
    for(let attrName in _good.attrs){
        let attrValues = _good.attrs[attrName]
        if(attrName === selectedAttrName){
            continue;
        }
        // console.log('selectedAttrs',selectedAttrs)
        _good.attrs[attrName] = attrValues.map((attrValue)=>{
            let _selectedAttrs = Object.assign({},selectedAttrs,{
                [attrName]:attrValue.value
            })
            let isAttrPairExist = _.some(_good.items,(item)=>{
                return _.isEqual(_.pick(item.attrs,_.keys(_selectedAttrs)),_selectedAttrs)
            })
            attrValue.disabled = !isAttrPairExist
            if(isNeedValidateStock){
                let validItem = _.findWhere(_good.items,_selectedAttrs)
                if(validItem === 0){
                    attrValue.disabled = true
                }
            }
            if(attrValue.disabled && attrValue.selected){
                attrValue.selected = false
            }
            return attrValue
        })
        if(_.keys(selectedAttrs).length === (_.keys(_good.attrs).length - 1)){
            isNeedValidateStock = true
        }
    }

    if(_.keys(selectedAttrs).length === _.keys(_good.attrs).length){
        let selectedItem = _.findWhere(_good.items,{'attrs':selectedAttrs})
        selectedItem = selectedItem || null
        _good["selectedItem"] = selectedItem
    }else{
        _good["selectedItem"] = null
    }
    return _good
    // let attrs = 
}

function cartByUser(state={},action){
    switch(action.type){
        case REQUEST_CARTCOUNT:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false,
            })
        case RESPONSE_CARTCOUNT:
            let cartCount = action.res.result
            return Object.assign({},state,{
                cartCount,
                isFetching:false,
                isFetched:action.res.isFetched
            })
        case START_ADD_CART:
            return Object.assign({},state,{
                cartAdding:true,
                cartAdded:false
            });
        case FINISH_ADD_CART:
            var cartCount = state.cartCount;
            const buyed = action.param.buyed;
            if(action.res.cartAdded === true){
                cartCount += buyed;
            }
            return Object.assign({},state,{
                cartAdding:false,
                cartAdded:action.res.cartAdded,
                cartCount
            })
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    goodById,
    cartByUser
});

export default rootReducer;