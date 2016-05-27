'use strict';
import {urlParam} from "./http.es6";

export const urlPrefix = "/shop"

const urlMap = {
    "index":urlPrefix,
    "search":urlPrefix + "/search/s.html",
    "activity":urlPrefix + "/activity",
    "topic":urlPrefix + "/topic",
    "flashbuy":urlPrefix + "/flashbuy",
    "polymer":urlPrefix + "/polymer",
    "gooddetail":urlPrefix + "/sp-",
    "trendy":urlPrefix + "/trendy",
    "cart":urlPrefix + "/cart",
    "logingateway":urlPrefix + "/logingateway",
    "logoutgateway":urlPrefix + "/logoutgateway",
    "orderlist":urlPrefix + "/orderlist",
    "orderdetail":urlPrefix + "/orderdetail",
    "confirmorder":urlPrefix + "/confirmorder",
    "coupondetail":urlPrefix + "/coupon",
    "couponlist":urlPrefix + "/coupon",
    "receiver":urlPrefix + "/receiver",
    "updatebasic":urlPrefix + "/updatebasic",
    "membercenter":urlPrefix + "/membercenter",
    "collect":urlPrefix + "/collect",
    "comment":urlPrefix + "/comment",
    "showcomment":urlPrefix + "/showcomment",
    "update":urlPrefix + "/update",
    "aboutus":urlPrefix + "/aboutus",
    "help":urlPrefix + "/help",
    "idcard":urlPrefix+"/idcard"
}

export function jumpURL(route,param=[],query=null){
    switch(route){
        case "index":
            return `${urlMap["index"]}`
            break
        case "search":
            query = query === null?"":`?${urlParam(query)}`
            return `${urlMap["search"]}${query}`
            break
        case "activity":
            param = param.join("/")
            return `${urlMap["activity"]}/${param}.html`
            break
        case "topic":
            param = param.join("/")
            return `${urlMap["topic"]}/${param}.html`
            break
        case "gooddetail":
            // param = param.join("/")
            return `${urlMap["gooddetail"]}${param[0]}.html`
            break
        case "flashbuy":
            param = param.join("/")
            return `${urlMap["flashbuy"]}/${param}.html`
            break
        case "confirmorder":
            param = param.join("/")
            return `${urlMap["confirmorder"]}/${param}.html`
            break
        case "orderlist":
            return `${urlMap["orderlist"]}.html`
            break
        case "orderlist-id":
            param = param.join("/")
            return `${urlMap["orderlist"]}/${param}.html`
            break
        case "orderdetail":
            param = param.join("/")
            return `${urlMap["orderdetail"]}/${param}.html`
            break
        case "coupon":
            param = param.join("/")
            return `${urlMap["coupon"]}/${param}.html`
            break
        case "couponlist":
            param = param.join("/")
            return `${urlMap["couponlist"]}.html`
            break
        case "membercenter":
            return `${urlMap["membercenter"]}.html`
            break
        case "collect":
            return `${urlMap["collect"]}.html`
            break
        case "comment":
            return `${urlMap["comment"]}.html`
            break
        case "showcomment":
            return `${urlMap["showcomment"]}`
            break
        case "update":
            return `${urlMap["update"]}.html`
            break
        case "aboutus":
            param = param.join("/")
            return `${urlMap["aboutus"]}.html`
            break
        case "help":
            param = param.join("/")
            return `${urlMap["help"]}.html`
            break
        case "idcard":
            return `${urlMap["idcard"]}.html`
        default:
            return `${urlMap[route]}.html`
    }
}