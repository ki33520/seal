'use strict';
import ActivityApp from "../../../shared/chunk/activity/app.jsx";
import React from "react";
import ReactDOM from "react-dom";
Object.assign = Object.assign || require('object-assign');
function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
    ReactDOM.render(<ActivityApp initialState={initialState} />,document.getElementById('activity'));
}
Object.assign = Object.assign || require('object-assign')

if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}