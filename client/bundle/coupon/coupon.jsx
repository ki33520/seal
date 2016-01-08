'use strict';
import CouponApp from "../../../shared/chunk/coupon/app.jsx";
import React from "react";
import ReactDOM from "react-dom";

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
    ReactDOM.render(<CouponApp initialState={initialState} />,document.getElementById('coupon'));
}

if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}