'use strict';
import {combineReducers} from "redux";
import {
    CHANGE_FIELD,
    START_DELETE_IDCARD,FINISH_DELETE_IDCARD,
    START_UPLOAD_FRONTIMG,FINISH_UPLOAD_FRONTIMG,
    START_UPLOAD_BACKIMG,FINISH_UPLOAD_BACKIMG,
    START_UPDATE_IDCARD,FINISH_UPDATE_IDCARD,
    START_ADD_IDCARD,FINISH_ADD_IDCARD,
    START_FETCH_IDCARD,FINISH_FETCH_IDCARD,
    START_CHANGE_UPDATE,FINISH_CHANGE_UPDATE
} from "./constant.es6";
import {SHOW_ALERT,HIDE_ALERT} from "../common/constant.es6";
import {alertReducer} from "../common/reducer.es6";

function cardID(state={},action){
    switch(action.type){
    	case START_FETCH_IDCARD:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
        case FINISH_FETCH_IDCARD:
            var idcardLIst = [...state.idcardLIst];
            var isFetched = false;
            if(action.res.isFetched){
                idcardLIst = action.res.idcardLIst;
                isFetched = true;
            }
            return Object.assign({},state,{
                idcardLIst,
                isFetched,
                isFetching:true
            });
        case START_DELETE_IDCARD:
            return Object.assign({},state,{
                isDeleted: false,
                isDeleting:true
            });
        case FINISH_DELETE_IDCARD:
            var isDeleted = false;
            var idcardLIst = [...state.idcardLIst];
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
        default:
            return state;
    }
}

function updateCardID(state={},action){
    switch(action.type){
        case CHANGE_FIELD:
            const {name,value} = action;
            state.idcard[name] = value;
            return Object.assign({},state);
        case FINISH_CHANGE_UPDATE:
            const {param} = action;
            return Object.assign({},state,{
                idcard: param
            });
        case START_UPLOAD_FRONTIMG:
            return Object.assign({},state,{
                isUploading:true,
                isUploaded:false
            });
        case FINISH_UPLOAD_FRONTIMG:
            if(action.res.isUploaded && action.param.type==="update"){
                state.idcard.fontImgUrl = action.res.imgUrl;
                state.idcard.fontImg = action.res.imgUri
            }
            return Object.assign({},state,{
                isUploaded:action.res.isUploaded,
                isUploading:false
            });
        case START_UPLOAD_BACKIMG:
            return Object.assign({},state,{
                isUploading:true,
                isUploaded:false
            });
        case FINISH_UPLOAD_BACKIMG:
            if(action.res.isUploaded && action.param.type==="update"){
                state.idcard.backImgUrl = action.res.imgUrl;
                state.idcard.backImg = action.res.imgUri
            }
            return Object.assign({},state,{
                isUploaded:action.res.isUploaded,
                isUploading:false
            });
        case START_UPDATE_IDCARD:
            return Object.assign({},state,{
                isUpdateCarding:true,
                isUpdateCarded:false
            });
        case FINISH_UPDATE_IDCARD:
            if(action.res.isUpdateCarded){
                state.idcard.status = "1";
                state.idcard.statusName = "未审核";
            }
            return Object.assign({},state,{
                isUpdateCarded: action.res.isUpdateCarded,
                isUpdateCarding:false,
                msg: action.res.msg
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
        case START_UPLOAD_FRONTIMG:
            return Object.assign({},state,{
                isUploading:true,
                isUploaded:false
            });
        case FINISH_UPLOAD_FRONTIMG:
            var frontImg = state.frontImg;
            if(action.res.isUploaded && action.param.type==="add"){
                frontImg = action.res.imgUrl;
            }
            return Object.assign({},state,{
                isUploaded:action.res.isUploaded,
                isUploading:false,
                frontImgUri:action.res.imgUri,
                frontImg
            });
        case START_UPLOAD_BACKIMG:
            return Object.assign({},state,{
                isUploading:true,
                isUploaded:false
            });
        case FINISH_UPLOAD_BACKIMG:
            var backImg = state.backImg;
            if(action.res.isUploaded && action.param.type==="add"){
                backImg = action.res.imgUrl;
            }
            return Object.assign({},state,{
                isUploaded:action.res.isUploaded,
                isUploading:false,
                backImgUri:action.res.imgUri,
                backImg
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
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cardID,updateCardID,addCardID
});

export default rootReducer;