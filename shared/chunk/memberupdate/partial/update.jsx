'use strict';

import React,{Component} from "react";
import {jumpURL} from "../../../lib/jumpurl.es6";

class Update extends Component{
    render(){
        const {basicByForm,changeScene} = this.props;
        return (
            <div className="update-content">
                <header className="header">
                    <a href={jumpURL("membercenter")} className="iconfont icon-back"></a>
                    <span className="title">我的账户</span>
                </header>
                <ul className="list">
                    <li>
                        <span>头像</span>
                        <div><img src={basicByForm.imageUrl || "/client/asset/images/headpic.png"} /></div>
                    </li>
                    <li><a href="javascript:void(null)" onClick={changeScene.bind(this,"basic")}>基本信息</a></li>
                    <li><a href="javascript:void(null)" onClick={changeScene.bind(this,"password")}>修改登录密码</a></li>
                </ul>
            </div>
        );
        //<li><a href="#/membercard">绑定会员卡</a></li>
    }
}

export default Update;