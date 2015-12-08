'use strict'
import OrderList from "../../../shared/chunk/orderlist/app.jsx";
import React from "react";
import ReactDOM from "react-dom"

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
        ReactDOM.render(<OrderList initialState={initialState} />,document.getElementById('order-list'));
}

if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}