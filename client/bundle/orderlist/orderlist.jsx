'use strict'
import OrderList from "../../../shared/chunk/orderlist/app.jsx";
import React from "react";
import ReactDOM from "react-dom"
Object.assign = Object.assign || require('object-assign')

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
        ReactDOM.render(<OrderList initialState={initialState} />,document.getElementById('order-list'));
}

require("../../../shared/lib/responsive");
if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}