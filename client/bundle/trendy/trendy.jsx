'use strict';
import TrendyApp from "../../../shared/chunk/trendy/app.jsx";
import React from "react";
import ReactDOM from "react-dom";
Object.assign = Object.assign || require('object-assign')
function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
        ReactDOM.render(<TrendyApp initialState={initialState} />,document.getElementById('trendy'));
}

Object.assign = Object.assign || require('object-assign')

require("../../../shared/lib/responsive");
if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}