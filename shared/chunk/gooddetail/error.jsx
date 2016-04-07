'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import {jumpURL} from "../../lib/jumpurl.es6";

class ErrorContent extends Component{
    renderError(){
        const {msg,code} = this.props.initialState
        return (
            <div className="error-content">
                <img src="/client/asset/images/empty_goodsUnshelf.png" />
                <span>{msg}</span>
                <a href="/" className="back-btn">返回首页</a>
            </div>
        )
    }
    render(){
        const {msg,code} = this.props.initialState
        return (
            <div className="empty noPadTop">
                <Header>商品详情</Header>
                {this.renderError()}
            </div>
        );
    }
}

export default ErrorContent;