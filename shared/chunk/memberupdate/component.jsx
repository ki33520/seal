'use strict'

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import dom from "../../lib/dom.es6";
import {apiRequest} from "../../lib/util.es6";
import Slider from "../../component/slider/slider.jsx";
import Slide from "../../component/slider/slide.jsx";
import NumberPicker from "../../component/numberpicker.jsx";
import PullHook from "../../component/pullhook.jsx";
import Alert from "../../component/alert.jsx";
import Header from "../common/header.jsx";

import {fetchMemberInfo} from "./action.es6";
import {alert} from "../common/action.es6";

class MemberUpdate extends Component{
    constructor(props){
        super(props);
        this.state = {
            memberInfo: props.memberInfoByUser.memberInfo
        }
    }
    render(){
        const {memberInfo} = this.state;
        var tpl = (
            <div className="memberupdate-content">
                <Header title="账户设置"/>
                <ul className="list">
                    <li><a href="/membercenter/update/basic">基本信息</a></li>
                    <li><a href="/membercenter/update/password">修改登录密码</a></li>
                    <li><a href="/membercenter/update/membercard">绑定会员卡</a></li>
                </ul>
            </div>
        );
        return tpl;
    }
}

export default MemberUpdate;