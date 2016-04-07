'use strict';

import React,{Component} from "react";
import Header from "./header.jsx";
import {jumpURL} from "../../lib/jumpurl.es6";

class ErrorContent extends Component{
    handleReload(){
        window.location.reload()
    }
    renderError(){
        const {msg,code} = this.props.initialState
        if(code === "404"){
            return (
            <div className="error-content">
                <img src="/client/asset/images/404.png" />
                <span>{msg}</span>
            </div>
            )
        }
        return (
            <div className="error-content">
                <img src="/client/asset/images/500.png" />
                <span>{msg}</span>
                <a href="javascript:void(null)" 
                onClick={this.handleReload.bind(this)} className="reload-btn">重新加载</a>
                <a href="/" className="back-btn">返回首页</a>
            </div>
        )
    }
    render(){
        const {msg,code} = this.props.initialState
        return (
            <div className="empty noPadTop">
                <Header>{code}</Header>
                {this.renderError()}
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