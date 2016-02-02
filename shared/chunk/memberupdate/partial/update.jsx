'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";


class Update extends Component{
    render(){
        const {basicByForm} = this.props;
        return (
            <div className="update-content">
                <Header>
                    <span className="title">账户设置</span>
                </Header>
                <div className="user-info">
                    <div className="user-headpic"><img src={basicByForm.imageUrl || "/client/asset/images/headpic.png"} /></div>
                    <ul className="user-info-list">
                        <li><label>会员昵称: </label><span>{basicByForm.nickName}</span></li>
                        <li><label>手机号码: </label><span>{basicByForm.mobileNumber}</span></li>
                        <li><label>会员生日: </label><span>{basicByForm.birthday || "未设置"}</span></li>
                    </ul>
                </div>
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