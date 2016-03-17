'use strict';
import GoodDetail from "../../../shared/chunk/gooddetail/app.jsx";
import React from "react";
import ReactDOM from "react-dom";
// import {disableHistoryForwardCacheThen} from "../../../shared/lib/util.es6";

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
        ReactDOM.render(<GoodDetail initialState={initialState} />,document.getElementById('good-detail'));
}

// disableHistoryForwardCacheThen()

if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}