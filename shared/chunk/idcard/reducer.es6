'use strict';
import {combineReducers} from "redux";
import {
    START_DELETE_IDCARD,FINISH_DELETE_IDCARD,
    START_UPLOAD_FRONTIMG,FINISH_UPLOAD_FRONTIMG,
    START_UPLOAD_BACKIMG,FINISH_UPLOAD_BACKIMG,
    START_UPDATE_IDCARD,FINISH_UPDATE_IDCARD,
    START_ADD_IDCARD,FINISH_ADD_IDCARD,
    START_FETCH_IDCARD,FINISH_FETCH_IDCARD
} from "./constant.es6";
function index(state={},action){
    switch(action.type){
    	case START_FETCH_IDCARD:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
        case FINISH_FETCH_IDCARD:
            var idcardLIst = {...state.idcardLIst};
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
        default:
            return state;
    }
}

function update(state={},action){
    switch(action.type){
         
        default:
            return state;
    }
}

function addcard(state={},action){
    switch(action.type){
        case START_UPLOAD_FRONTIMG:
            return Object.assign({},state,{
                isUploading:true,
                isUploaded:false
            });
        case FINISH_UPLOAD_FRONTIMG:
            var frontImg = state.frontImg;
            if(action.res.isUploaded){
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
            if(action.res.isUploaded){
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
    index,update,addcard
});

export default rootReducer;