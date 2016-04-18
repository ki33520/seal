'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import {jumpURL} from "../../lib/jumpurl.es6";

class ErrorContent extends Component{
    renderError(){
        const {keyword} = this.props.initialState
        return (
            <div className="error-content">
                <img src="/client/asset/images/empty_search.png" />
                <span>{'抱歉，没有找到与“'+keyword+'”相关的商品'}</span>
                <a href="javascript:;" onClick={()=>window.history.back()} className="back-btn">返回</a>
            </div>
        )
    }
    render(){
        return (
            <div className="empty noPadTop">
                <Header>搜索结果</Header>
                {this.renderError()}
            </div>
        );
    }
}

export default ErrorContent;