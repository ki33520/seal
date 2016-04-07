'use strict'
import OrderDetail from "../../../shared/chunk/orderdetail/app.jsx";
import React from "react";
import ReactDOM from "react-dom"

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
        ReactDOM.render(<OrderDetail initialState={initialState} />,document.getElementById('order-detail'));
}

if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}