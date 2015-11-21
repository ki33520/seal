'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";


class Update extends Component{
    render(){
        const {memberInfo} = this.props.memberInfoByUser;
        return (
            <div className="update-content">
                <Header title="账户设置"/>
                <ul className="userInfo">
                    <li>nickname: {memberInfo.nickname}</li>
                    <li>email: {memberInfo.email}</li>
                    <li>mobileNumber: {memberInfo.mobileNumber}</li>
                </ul>
                <ul className="list">
                    <li><a href="#/basic">基本信息</a></li>
                    <li><a href="#/password">修改登录密码</a></li>
                    <li><a href="#/membercard">绑定会员卡</a></li>
                </ul>
            </div>
        );
    }
}

export default Update;