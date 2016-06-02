'use strict';
import {combineReducers} from "redux";
import {
    CHANGE_FIELD,
    START_DELETE_IDCARD,FINISH_DELETE_IDCARD,
    START_UPLOAD_CARDIMG,FINISH_UPLOAD_CARDIMG,
    START_UPDATE_IDCARD,FINISH_UPDATE_IDCARD,
    START_ADD_IDCARD,FINISH_ADD_IDCARD,
    START_FETCH_IDCARD,FINISH_FETCH_IDCARD,
    START_FETCH_IDCARDLIST,FINISH_FETCH_IDCARDLIST
} from "./constant.es6";
import {SHOW_ALERT,HIDE_ALERT} from "../common/constant.es6";
import {alertReducer} from "../common/reducer.es6";

function cardID(state={},action){
    switch(action.type){
        case START_FETCH_IDCARDLIST:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
        case FINISH_FETCH_IDCARDLIST:
            var idcardLIst = [...state.idcardLIst];
            var isFetched = false;
            if(action.res.isFetched){
                idcardLIst = action.res.idcardLIst;
                isFetched = true;
            }
            return Object.assign({},state,{
                isFetching:false,
                idcardLIst,
                isFetched
            });
        case START_DELETE_IDCARD:
            return Object.assign({},state,{
                isDeleted: false,
                isDeleting:true
            });
        case FINISH_DELETE_IDCARD:
            var idcardLIst = [...state.idcardLIst];
            var isDeleted = false;
            var index = action.param.index;
            if(action.res.isDeleted){
                isDeleted = true;
                idcardLIst.splice(index,1);
            }
            return Object.assign({},state,{
                isDeleted,
                idcardLIst,
                isDeleting:false
            });
        case FINISH_UPDATE_IDCARD:
            if(action.res.isUpdateCarded){
                state.idcardLIst.map((v,k)=>{
                    if(v.id === action.param.id){
                        state.idcardLIst[k] = Object.assign({},v,action.param,{state:"1",statusName:"未审核"});
                    }
                })
            }
            return Object.assign({},state);
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

function updateCardID(state={},action){
    switch(action.type){
        case START_FETCH_IDCARD:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
        case FINISH_FETCH_IDCARD:
            var card = {...state.card};
            var isFetched = false;
            if(action.res.isFetched){
                card = action.res.card;
                isFetched = true;
            }
            return Object.assign({},state,{
                isFetching:false,
                isFetched,
                card
            });
        case CHANGE_FIELD:
            var card = {...state.card};
            var {name,value,scene} = action;
            if(scene === "updatecard"){
                card[name] = value;
                return Object.assign({},state,{
                    card
                });
            }
            return state
        case START_UPLOAD_CARDIMG:
            return Object.assign({},state,{
                isUploading:true,
                isUploaded:false
            });
        case FINISH_UPLOAD_CARDIMG:
            var card = {...state.card};
            var {fieldname,isUploaded,imgUrl,imgUri} = action.res;
            if(isUploaded && action.scene==="updatecard"){
                card[fieldname+"Url"] = imgUrl;
                card[fieldname+'Uri'] = imgUri;
                isUploaded = true;
            }
            return Object.assign({},state,{
                isUploading:false,
                isUploaded,
                card
            });
        case START_UPDATE_IDCARD:
            return Object.assign({},state,{
                isUpdateCarding:true,
                isUpdateCarded:false
            });
        case FINISH_UPDATE_IDCARD:
            var isUpdateCarded = false;
            if(action.res.isUpdateCarded){
                isUpdateCarded = true;
            }
            return Object.assign({},state,{
                isUpdateCarding:false,
                isUpdateCarded
            });
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

function addCardID(state={},action){
    switch(action.type){
        case CHANGE_FIELD:
            var card = {...state.card};
            var {name,value,scene} = action;
            if(scene === "add"){
                card[name] = value;
                return Object.assign({},state,{
                    card
                });
            }
            return state
        case START_UPLOAD_CARDIMG:
            return Object.assign({},state,{
                isUploading:true,
                isUploaded:false
            });
        case FINISH_UPLOAD_CARDIMG:
            var card = {...state.card};
            var {fieldname,isUploaded,imgUrl,imgUri} = action.res;
            if(isUploaded && action.scene==="add"){
                card[fieldname+"Url"] = imgUrl;
                card[fieldname+'Uri'] = imgUri;
                isUploaded = true;
            }
            return Object.assign({},state,{
                isUploading:false,
                isUploaded,
                card
            });
        case START_ADD_IDCARD:
            return Object.assign({},state,{
                isAddCarding:true,
                isAddCarded:false
            });
        case FINISH_ADD_IDCARD:
            var isAddCarded = false;
            if(action.res.isAddCarded){
                isAddCarded = true;
            }
            return Object.assign({},state,{
                isAddCarding:false,
                isAddCarded
            });
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cardID,updateCardID,addCardID
});

export default rootReducer;