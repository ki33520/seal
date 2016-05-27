'use strict';
import ConfirmOrder from "../../../shared/chunk/checkout/app.jsx";
import ErrorContent from "../../../shared/chunk/checkout/error.jsx";
import React from "react";
import ReactDOM from "react-dom";

Object.assign = Object.assign || require('object-assign')

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
    if(initialState.code == "500"){
        ReactDOM.render(<ErrorContent initialState={initialState} />,document.getElementById('confirm-order'));
    }else{
        ReactDOM.render(<ConfirmOrder initialState={initialState} />,document.getElementById('confirm-order'));
    }

}
require("../../../shared/lib/responsive");
if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}