'use strict';
import FlashBuy from "../../../shared/chunk/flashbuy/app.jsx";
import React from "react";
import ReactDOM from "react-dom";
Object.assign = Object.assign || require('object-assign');
function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
        ReactDOM.render(<FlashBuy initialState={initialState} />,document.getElementById('flashbuy'));
}

require("../../../shared/lib/responsive");
if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}