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

import {addCart,addFavorite} from "./action.es6";
import {alert} from "../common/action.es6";

class MemberInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            member: props.memberInfo.member,
            login: props.memberInfo.login
        }
    }
    render(){
        const {member,login} = this.state;
        const links = login ? '' : '/login';
        const loginClasses = classNames("member-center-content",{
            login: login
        });
        var tpl = (
            <div className={loginClasses}>
                <Header title="用户中心"/>
                <div className="member-info">
                    <div className="userInfo">
                        <div className="headpic"><div className="img_wrap"><img src="" /></div></div>
                        <div className="mobile">{member.mobile}</div>
                        <div className="QRcode"><img src="" /></div>
                    </div>
                    <div className="orderNav">
                        <div className="navItem"><a href="">待付款</a></div>
                        <div className="navItem"><a href="">待发货</a></div>
                        <div className="navItem"><a href="">待收货</a></div>
                        <div className="navItem"><a href="">待评价</a></div>
                    </div>
                    <ul className="list">
                        <li><a href="/order">全部订单</a></li>
                        <li><a href="/address">收货地址</a></li>
                        <li><a href="/collect">我的收藏</a></li>
                        <li><a href="/comment">我的评论</a></li>
                        <li><a href="/coupon">优惠券</a></li>
                        <li><a href="/membersetting">账户设置</a></li>
                        <li><a href="/aboutus">关于我们</a></li>
                        <li><a href="/help">帮助反馈</a></li>
                    </ul>
                </div>
            </div>
        );
        //<span><a className="memberInfoSetting iconfont icon-setting" href="membersetting">SET</a></span>
        // <div><a href={links}>用户ID:{member.id}</a></div>
        //             <div>用户名:{member.username}</div>
        //             <div>用户昵称:{member.nickname}</div>
        //             <div>用户邮箱:{member.email}</div>
        //             <div>用户手机号:{member.mobile}</div>
        //             <div>余额:{member.balanceCash}</div>
        //             <div>积分:{member.score}</div>
        //             <div>电子券:{member.balanceNonCash}</div>
        //             <div>首次登陆时间:{member.firstLoginTime}</div>
        //             <div>最后登陆时间:{member.lastLoginTime}</div>
        //             <div>未付款订单数量:{member.notPayOrderCount}</div>
        return tpl;
    }
}

export default MemberInfo;