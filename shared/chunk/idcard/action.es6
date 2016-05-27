'use strict';
import {apiRequest} from "../../lib/util.es6";
import {urlPrefix} from "../../lib/jumpurl.es6";
import {
    START_DELETE_IDCARD,FINISH_DELETE_IDCARD
} from "./constant.es6";

 
export {alert} from "../common/action.es6";

function startDeleteIDcard(param){
	return {
        type:START_DELETE_IDCARD,
        param
    }
}
function finishDeleteIDcard(param,res){
	return {
        type:FINISH_DELETE_IDCARD,
        param
    }
}
export function deleteIDcard(param){
    return (dispatch)=>{
        dispatch(startDeleteIDcard(param))
        apiRequest(urlPrefix + "/deleteidcard",param,{method:"POST"}).then((res)=>{
            dispatch(finishDeleteIDcard(param,res))
        })
    }
}