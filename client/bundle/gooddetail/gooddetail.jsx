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
}
Object.assign = Object.assign || require('object-assign')

require("../../../shared/lib/responsive");
if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}