'use strict';
import GoodDetail from "../../../shared/chunk/gooddetail/app.jsx";
import ErrorContent from "../../../shared/chunk/gooddetail/error.jsx";
import React from "react";
import ReactDOM from "react-dom";

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
    if(initialState.code == "500"){
        ReactDOM.render(<ErrorContent initialState={initialState} />,document.getElementById('good-detail'));
    }else{
        ReactDOM.render(<GoodDetail initialState={initialState} />,document.getElementById('good-detail'));
    }

    const {user,good} = initialState
    /*统计代码*/
    _adwq.push([ '_setDataType', 'view' ])
    _adwq.push(['_setCustomer',user?user.userName:""])
    _adwq.push(['_setItem',good.code,good.title,good.salePrice,"1","A123","分类",good.originPrice,good.imageUrl[0],"Y",location.href])
    _adwq.push([ '_trackTrans'])
}
Object.assign = Object.assign || require('object-assign')

require("../../../shared/lib/responsive");
if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}