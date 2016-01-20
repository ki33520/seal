'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";


class Update extends Component{
    render(){
        const {memberInfo} = this.props.detailByUser;
        return (
            <div className="update-content">
                <Header>
                    <span className="title">账户设置</span>
                </Header>
                <ul className="userInfo">
                    <li>会员昵称: {memberInfo.nickName}</li>
                    <li>手机号码: {memberInfo.mobileNumber}</li>
                    <li>会员生日: {memberInfo.birthday}</li>
                </ul>
                <ul className="list">
                    <li><a href="#/basic">基本信息</a></li>
                    <li><a href="#/password">修改登录密码</a></li>
                </ul>
            </div>
        );
        //<li><a href="#/membercard">绑定会员卡</a></li>
    }
}

export default Update;