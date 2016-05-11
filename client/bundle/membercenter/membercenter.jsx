'use strict';
import MembercenterApp from "../../../shared/chunk/membercenter/app.jsx";
import React from "react";
import ReactDOM from "react-dom";

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
        ReactDOM.render(<MembercenterApp initialState={initialState} />,document.getElementById('member-center'));
}

require("../../../shared/lib/responsive");
if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}