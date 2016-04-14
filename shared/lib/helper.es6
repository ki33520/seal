'use strict';
import {base64} from "./crypto";
import _ from "./lodash.es6";

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
    price = Math.floor(price * 1000 / 10)
    price = parseInt(price)
    let priceStr = `${price}`
    if(price < 100 && price >= 10){
        priceStr = `0${price}`
    }else if(price < 10){
        priceStr = `00${price}`
    }
    priceStr = priceStr.replace(/(\d\d)$/,".$1")
    return priceStr
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