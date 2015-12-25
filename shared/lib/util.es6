'use strict'
import reqwest from "reqwest";
import {base64} from "./crypto";

export function apiRequest(url,param, options = {
    method:"GET",
    type:"json"
}){
    options = Object.assign({},options,{
        url,
        data:param
    });
    return reqwest(options);
}

export function base64Encode(str){
    return base64.encode(str)
}
export function base64Decode(encodedStr){
    return base64.decode(encodedStr)
}
export function base64EncodeForURL(str){
    var encodedStr = base64.encode(str);
    return encodedStr.replace(/=/g, "_").replace(/\//g, ",").replace(/\+/g, "-")
}
export function base64DecodeForURL(encodedStr){
    encodedStr = encodedStr.replace(/_/g, "=").replace(/,/g, "/").replace(/-/g, "+");
    return base64.decode(encodedStr)
}
export function urlParam(param){
    var paramStr = [];
    for(var key in param){
        paramStr.push(`${key}=${param[key]}`);
    }
    return paramStr.join("&");
}
export function dispatchEvent(el,event){
    var e = document.createEvent('Event');
    e.initEvent(event,true,true);
    el.dispatchEvent(e);
}
export function bindEvent(el,event,listener){
    if(el.addEventListener){
        el.addEventListener(event,listener,false);
    }else if(el.attachEvent){
        el.attachEvent("on${event}",(e)=>{
            listener.call(el,e||window.event);
        });
    }
}
export function unbindEvent(el,event,listener){
    if(el.removeEventListener){
        el.removeEventListener(event,listener);
    }else if(el.detachEvent){
        el.detachEvent("on${event}",listener);
    }
}
export function scrollTop(value){
    let isCSS1Compat = (document.compatMode === 'CSS1Compat');
    let supportPageOffset = window.pageYOffset !== undefined;
    let scrollTop = supportPageOffset ? window.pageYOffset : 
                    isCSS1Compat? document.documentElement.scrollTop:
                    document.body.scrollTop;
    let scrollLeft = supportPageOffset ? window.pageXOffset : 
                    isCSS1Compat? document.documentElement.scrollLeft:
                    document.body.scrollLeft;
    if(value !== undefined){
        window.scrollTo(scrollLeft,value);
    }
    return scrollTop;
}
export function registerPullDownEvent(callback) {
    this.bindEvent(window,'scroll',()=>{
        var scrollTop = this.scrollTop();
        if (document.documentElement.clientHeight + scrollTop >= document.documentElement.scrollHeight) {
            callback();
        }
    });
}
const util = {
    bindEvent,
    unbindEvent,
    scrollTop,
    registerPullDownEvent
}
export default util;