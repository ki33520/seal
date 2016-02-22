'use strict'

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import dom from "../../lib/dom.es6";
import MaskLayer from "../../component/masklayer.jsx";
import Alert from "../../component/alert.jsx";
import Header from "../common/header.jsx";
import Footer from "../common/footer.jsx";

import {addCart,addFavorite} from "./action.es6";
import {alert} from "../common/action.es6";

class MemberCenter extends Component{
    constructor(props){
        super(props);
        this.state = {
            maskActive:false,
            popupActive:false
        }
    }
    togglePopupActive(){
        this.setState({
            maskActive:!this.state.popupActive,
            popupActive:!this.state.popupActive
        });
    }
    closeAllPopups(){
        this.setState({
            maskActive:false,
            popupActive:false
        })
    }
    renderBanner(){
        const {isLogined,member,api} = this.props.memberCenterByUser;
        const {loginUrl,registerUrl} = api;
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
                        <img src={member.imageUrl || "/client/asset/images/headpic.png"} />
                        <a className="user-qr iconfont icon-erweima" href="javascript:void(0);" onClick={this.togglePopupActive.bind(this)}></a>
                    </div>
                    <span>{member.nickName}</span>
                </div>
            )
        }
    }
    renderLogout(){
        const {isLogined,api} = this.props.memberCenterByUser;
        const {logoutUrl} = api;
        if(isLogined === false){
            return null;
        }else{
            return (
                <div className="helpList">
                    <a className="logoutBtn" href={logoutUrl}>
                        <dl>
                            <dt>
                                退出登录
                            </dt>
                        </dl>
                    </a>
                </div>
            )
        }
        
    }
    renderOrderBanner(){
        const {isLogined,countOrder} = this.props.memberCenterByUser;
        let count = {};
        _.forIn(countOrder, function(value, key) {
            if(value>0){
                count[key] = value < 100 ? <i>{value}</i> : <i>99+</i>
            }else{
                count[key] = null;
            }
        });
        return (
            <div className="userGoods">
                <a href="/orderlist/1" className="userGoods_1">
                    <em></em>
                    <span>待付款</span>
                    {count.paymentNum}
                </a>
                <a href="/orderlist/2" className="userGoods_2">
                    <em></em>
                    <span>待发货</span>
                    {count.sendNum}
                </a>
                <a href="/orderlist/3" className="userGoods_3">
                    <em></em>
                    <span>待收货</span>
                    {count.signNum}
                </a>
                <a href="/orderlist/4" className="userGoods_4">
                    <em></em>
                    <span>待评价</span>
                    {count.commentNum}
                </a>
            </div>
        )
        
    }
    renderPopQr(){
        const {member, isLogined} = this.props.memberCenterByUser;
        const classes = classNames({
            "pop-qr":true,
            "active":this.state.popupActive
        });
        if(isLogined === false){
            return null;
        }else{
            return (
                <div className={classes}>
                    <div className="btn-close iconfont icon-close" onClick={this.togglePopupActive.bind(this)}></div>
                    <div className="top">扫码分享</div>
                    <div className="center"><img src={member.cardImgUrl} /></div>
                    <div className="bottom">邀请小伙伴扫一扫分享给TA</div>
                </div>
            )
        }
        
    }
    render(){
        const {isFetched, member, isLogined, api,countOrder} = this.props.memberCenterByUser;
        return (
            <div className="user">
                <header>
                    <div className="top">
                        <span>个人中心</span>
                    </div>
                    <div className="userBanner">
                        {this.renderBanner()}
                    </div>
                    {this.renderOrderBanner()}
                </header>
                
                <div className="helpList">
                    <a href="/orderlist">
                        <dl>
                            <dt>
                                <img src="/client/asset/images/user_icon_1.png" />
                                全部订单
                            </dt>
                            <dd>
                                <i className="iconfont icon-right"></i>
                            </dd>
                        </dl>
                    </a>
                </div>

                <div className="helpList">
                    <a href="/receiver">
                        <dl>
                            <dt>
                                <img src="/client/asset/images/user_icon_2.png" />
                                收货地址
                            </dt>
                            <dd>
                                <i className="iconfont icon-right"></i>
                            </dd>
                        </dl>
                    </a>
                    <a href="/membercenter/collect">
                        <dl>
                            <dt>
                                <img src="/client/asset/images/user_icon_3.png" />
                                我的收藏
                            </dt>
                            <dd>
                                <i className="iconfont icon-right"></i>
                            </dd>
                        </dl>
                    </a>
                    <a href="/membercenter/comment">
                        <dl>
                            <dt>
                                <img src="/client/asset/images/user_icon_4.png" />
                                我的评论
                            </dt>
                            <dd>
                                <i className="iconfont icon-right"></i>
                            </dd>
                        </dl>
                    </a>
                    <a href="/coupon">
                        <dl>
                            <dt>
                                <img src="/client/asset/images/user_icon_5.png" />
                                优惠券
                            </dt>
                            <dd>
                                <i className="iconfont icon-right"></i>
                            </dd>
                        </dl>
                    </a>
                    <a href="/membercenter/update">
                        <dl>
                            <dt>
                                <img src="/client/asset/images/user_icon_6.png" />
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
                                <img src="/client/asset/images/user_icon_7.png" />
                                关于我们
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
                                <img src="/client/asset/images/user_icon_8.png" />
                                帮助与反馈
                            </dt>
                            <dd>
                                <i className="iconfont icon-right"></i>
                            </dd>
                        </dl>
                    </a>
                </div>
                {this.renderLogout()}
                <Footer activeIndex="4" />
                <MaskLayer visible={this.state.maskActive} handleClick={this.closeAllPopups.bind(this)}/>
                {this.renderPopQr()}
            </div>
        );
    }
}

export default MemberCenter;