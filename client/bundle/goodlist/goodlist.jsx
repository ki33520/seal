'use strict'
import GoodListApp from "../../../shared/chunk/goodlist/app.jsx";
import React from "react";
import ReactDOM from "react-dom";

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
    ReactDOM.render(<GoodListApp initialState={initialState} />,document.getElementById('good-list-container'));
}

if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}
