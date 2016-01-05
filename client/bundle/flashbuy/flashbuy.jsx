'use strict';
import FlashBuy from "../../../shared/chunk/flashbuy/app.jsx";
import React from "react";
import ReactDOM from "react-dom";

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
        ReactDOM.render(<FlashBuy initialState={initialState} />,document.getElementById('flashbuy'));
}

if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}