'use strict';
import PolymerApp from "../../../shared/chunk/polymer/app.jsx";
import React from "react";
import ReactDOM from "react-dom";
Object.assign = Object.assign || require('object-assign');
function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
    ReactDOM.render(<PolymerApp initialState={initialState} />,document.getElementById('polymer'));
}
Object.assign = Object.assign || require('object-assign')

if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}