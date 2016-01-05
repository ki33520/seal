'use strict';
import CategoryApp from "../../../shared/chunk/category/app.jsx";
import React from "react";
import ReactDOM from "react-dom";

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
    ReactDOM.render(<CategoryApp initialState={initialState} />,document.getElementById('category-container'));
}

if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}