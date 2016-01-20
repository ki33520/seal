'use strict';

import {
    SHOW_ALERT,HIDE_ALERT
} from "./constant.es6";

export function alertReducer(state={},action){
    switch(action.type){
        case SHOW_ALERT:
            return Object.assign({},state,{
                alertActive:true,
                alertContent:action.content
            });
        case HIDE_ALERT:
            return Object.assign({},state,{
                alertActive:false,
                alertContent:action.content
            });
        default:
            return state;
    }
}

export function sceneReducer(state={},action){
    switch(action.type){
        case CHANGE_SCENE:
            let prevScene = state.currentScene || null
            let currentScene = action.scene;
            return Object.assign({},state,{
                prevScene,currentScene
            })
        default:
            return state;
    }
}