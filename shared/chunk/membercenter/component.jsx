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

class MemberCenter extends Component{
    constructor(props){
        super(props);
    }
    renderBanner(){
        const {isLogined,member} = this.props;
        const {loginUrl,registerUrl} = this.props.api;
        
        if(isLogined === false){
            return (
                <div className="userBtns">
                    <a href={registerUrl}>注&nbsp;册</a>
                    <a href={loginUrl}>登&nbsp;录</a>
                </div>
            )
        }else{
            return (
                <div className="userInfo">
                    <div className="userInfo_con">
                        <img id={member.nickname} src="client/asset/images/userPic.gif" />
                        <a href="javascript:void(0);"><img src="client/asset/images/user_qr.png" /></a>
                    </div>
                    <span>{member.mobile}</span>
                </div>
            )
        }
    }
    render(){
        const {isFetched, member, isLogined, api} = this.props;

        return (
            <div>
                <div className="user">
                    <header>
                        <div className="top">
                            <span>个人中心</span>
                        </div>
                        <div className="userBanner">
                            {this.renderBanner()}
                        </div>
                        
                        <div className="userGoods">
                            <a href="/membercenter/order" className="userGoods_1">
                                <em></em>
                                <span>待付款</span>
                                <i>9</i>
                            </a>
                            <a href="/membercenter/order" className="userGoods_2">
                                <em></em>
                                <span>待发货</span>
                                <i>99+</i>
                            </a>
                            <a href="/membercenter/order" className="userGoods_3">
                                <em></em>
                                <span>待收货</span>
                                <i>99+</i>
                            </a>
                            <a href="/membercenter/order" className="userGoods_4">
                                <em></em>
                                <span>待评价</span>
                                <i>99+</i>
                            </a>
                        </div>
                    </header>
                    
                    <div className="helpList">
                        <a href="/membercenter/order">
                            <dl>
                                <dt>
                                    <img src="client/asset/images/user_icon_1.png" />
                                    全部订单
                                </dt>
                                <dd>
                                    <i className="iconfont icon-right"></i>
                                </dd>
                            </dl>
                        </a>
                    </div>

                    <div className="helpList">
                        <a href="/membercenter/address">
                            <dl>
                                <dt>
                                    <img src="client/asset/images/user_icon_2.png" />
                                    收货地址
                                    <em className="dot"></em>
                                </dt>
                                <dd>
                                    <i className="iconfont icon-right"></i>
                                </dd>
                            </dl>
                        </a>
                        <a href="/membercenter/collect">
                            <dl>
                                <dt>
                                    <img src="client/asset/images/user_icon_3.png" />
                                    我的收藏
                                    <em className="dot"></em>
                                </dt>
                                <dd>
                                    <i className="iconfont icon-right"></i>
                                </dd>
                            </dl>
                        </a>
                        <a href="/membercenter/comment">
                            <dl>
                                <dt>
                                    <img src="client/asset/images/user_icon_4.png" />
                                    我的评论
                                    <em className="dot"></em>
                                </dt>
                                <dd>
                                    <i className="iconfont icon-right"></i>
                                </dd>
                            </dl>
                        </a>
                        <a href="/membercenter/coupon">
                            <dl>
                                <dt>
                                    <img src="client/asset/images/user_icon_5.png" />
                                    优惠券
                                    <em className="dot"></em>
                                </dt>
                                <dd>
                                    <i className="iconfont icon-right"></i>
                                </dd>
                            </dl>
                        </a>
                        <a href="/membercenter/update">
                            <dl>
                                <dt>
                                    <img src="client/asset/images/user_icon_6.png" />
                                    账户设置
                                </dt>
                                <dd>
                                    <i className="iconfont icon-right"></i>
                                </dd>
                            </dl>
                        </a>
                    </div>
                    
                    <div className="helpList">
                        <a href="/aboutus">
                            <dl>
                                <dt>
                                    <img src="client/asset/images/user_icon_7.png" />
                                    关于我们
                                    <em className="dot"></em>
                                </dt>
                                <dd>
                                    <i className="iconfont icon-right"></i>
                                </dd>
                            </dl>
                        </a>
                    </div>
                    
                    <div className="helpList">
                        <a href="/help">
                            <dl>
                                <dt>
                                    <img src="client/asset/images/user_icon_8.png" />
                                    帮助反馈
                                </dt>
                                <dd>
                                    <i className="iconfont icon-right"></i>
                                </dd>
                            </dl>
                        </a>
                    </div>

                </div>
            </div>
        );
    }
}

export default MemberCenter;