'use strict'
import reqwest from "reqwest";
import {base64} from "./crypto";
import _ from "lodash";
import md5 from "md5";
import moment from "moment";

export function apiRequest(url,param={}, options = {
    method:"GET",
    type:"json"
}){
    options = Object.assign({},options,{
        url,
        data:param
    });
    // console.log('url',url,param)
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

export function destPriceForGoods(goods){
    if(goods.useMobilePrice){
        return {
            destPrice:goods.mobilePrice,
            discount:goods.mobileDiscount
        }  
    }else{
        return {
            destPrice:goods.salesPrice,
            discount:goods.discount
        }
    }
}

export function formatPrice(price){
    if(price == 0){
        return "0.00"
    }
    if(_.isNumber(price) === false){
        if(_.isString(price)){
            if(/^(\d+)(\.)?(\d)*$/.test(price) === false){
                return "0.00"
            }           
        }
        price = parseFloat(price)
        if(_.isNaN(price)){
            return "0.00"
        }
    }
    price = price * 100
    price = parseInt(price)
    let priceStr = `${price}`
    if(price < 100 && price > 10){
        priceStr = `0${price}`
    }else if(price < 10){
        priceStr = `00${price}`
    }
    priceStr = priceStr.replace(/(\d\d)$/,".$1")
    return priceStr
}

export function formateIDCard(idCard){
    idCard = _.words(idCard,/\w{1}/g)
    idCard = _.map(idCard,function(v,i){
        if(i > 5 && i < 14){
            v = "*"
        }
        return v
    })
    return idCard.join("")
}

export function validTimeRegion(startTime,endTime){
    if(moment().isBefore(startTime) === true){
        return -1
    }else if(moment().isAfter(endTime) === true){
        return 1
    }else{
        return 0
    }
}

export function registerPullDownEvent(callback) {
    this.bindEvent(window,'scroll',()=>{
        var scrollTop = this.scrollTop();
        if (document.documentElement.clientHeight + scrollTop >= document.documentElement.scrollHeight) {
            callback();
        }
    });
}

export function disableHistoryForwardCacheThen(callback= ()=>{
    document.body.style.display = "none"
    window.location.reload()
}){
    let localStorage = window.localStorage
    window.onpageshow = (evt)=>{
        let id = md5(window.location.href)
        if(localStorage.getItem(id)){
            // console.log('reload because of history back')
            localStorage.removeItem(id)
            callback()
        }else{
            localStorage.setItem(id,true)
        }
    }
}