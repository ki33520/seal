'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";


class Normal extends Component{
    render(){
        const {helpInfo} = this.props;
        return (
            <div className="help-content">
                <Header>
                    <span className="title">注册登陆常见问题</span>
                </Header>
                <div className="help-text">
                    <h3>1.如何注册成为会员？</h3>
                    <p>进入个人中心-点击立即注册输入相关信息提交即可注册，目前仅支持手机注册，或友阿实体会员卡首次登陆注册。</p>

                    <h3>2.注册失败？</h3>
                    <p>可能是网络问题或输入信息有误，建议确保网络畅通情况下，关闭后再重新进入尝试操作，或及时咨询客服。</p>

                    <h3>3.手机号码注册不了新账户？</h3>
                    <p>目前手机号码注册特品汇账号时会同时进行绑定手机验证，即用户注册的手机号码必须接收验证码，同时该手机号码必须没有绑定过特品汇账号才能注册成功。如您的手机号码已与其他账号绑定，则无法注册新账户，如需注册，建议使用其他号码即可，或是用该手机找回密码登陆原注册账号即可。造成不便，敬请谅解！</p>

                    <h3>4.忘记登陆密码？</h3>
                    <p>您可进入个人中心，点击登陆界面右下角“忘记密码”，根据提示找回密码。</p>

                </div>
            </div>
        );
    }
}

export default Normal;