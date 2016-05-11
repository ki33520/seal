'use strict';
import MembercollectApp from "../../../shared/chunk/membercollect/app.jsx";
import React from "react";
import ReactDOM from "react-dom";

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
        ReactDOM.render(<MembercollectApp initialState={initialState} />,document.getElementById('member-collect'));
}

require("../../../shared/lib/responsive");
if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}