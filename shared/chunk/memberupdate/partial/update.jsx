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
                <ul className="list">
                    <li>
                        <span>头像</span>
                        <div><img src={basicByForm.imageUrl || "/client/asset/images/headpic.png"} /></div>
                    </li>
                    <li><a href="#/basic">基本信息</a></li>
                    <li><a href="#/password">修改登录密码</a></li>
                </ul>
            </div>
        );
        //<li><a href="#/membercard">绑定会员卡</a></li>
    }
}

export default Update;