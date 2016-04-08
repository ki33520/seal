'use strict'
import Receiver from "../../../shared/chunk/receiver/app.jsx";
import React from "react";
import ReactDOM from "react-dom";
Object.assign = Object.assign || require('object-assign')

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
        ReactDOM.render(<Receiver initialState={initialState} />,document.getElementById('receiver'));
}


if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}

window.onpageshow = function(event) {
    // console.log('onpageshow',event.persisted)
    if (event.persisted) {
        window.location.reload() 
    }
};