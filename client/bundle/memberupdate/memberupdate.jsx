'use strict';
import MemberupdateApp from "../../../shared/chunk/memberupdate/app.jsx";
import React from "react";
import ReactDOM from "react-dom";

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
        ReactDOM.render(<MemberupdateApp initialState={initialState} />,document.getElementById('member-update'));
}

require("../../../shared/lib/responsive");
if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}