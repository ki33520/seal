'use strict';
import Topic from "../../../shared/chunk/topic/app.jsx";
import React from "react";
import ReactDOM from "react-dom";

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
        ReactDOM.render(<Topic initialState={initialState} />,document.getElementById('topic'));
}

Object.assign = Object.assign || require('object-assign')

require("../../../shared/lib/responsive");
if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}