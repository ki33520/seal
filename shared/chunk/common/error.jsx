'use strict';

import React,{Component} from "react";
import Header from "./header.jsx";

class ErrorContent extends Component{
    render(){
        const {msg,code} = this.props.initialState
        return (
            <div className="empty noPadTop">
                <Header>{code}</Header>
                <img src="/client/asset/images/404.png" />
                <span>{msg}</span>
            </div>
        );
    }
}

ErrorContent.defaultProps = {
    error:{
        msg:""
    }
}

export default ErrorContent;