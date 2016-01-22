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
                    <li><label>会员昵称: </label><span>{memberInfo.nickName}</span></li>
                    <li><label>手机号码: </label><span>{memberInfo.mobileNumber}</span></li>
                    <li><label>会员生日: </label><span>{memberInfo.birthday}</span></li>
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