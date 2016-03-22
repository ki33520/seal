'use strict'

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import Header from "../common/header.jsx";
import Footer from "../common/footer.jsx";
import dom from "../../lib/dom.es6";
import MaskLayer from "../../component/masklayer.jsx";

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
    renderBanner(){
        const {isLogined,member,api} = this.props.memberCenterByUser;
        if(isLogined === false){
            const {loginUrl,registerUrl} = api;
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
                        <a href="/membercenter/update"><img src={member.imageUrl || "/client/asset/images/headpic.png"} /></a>
                        <a className="user-qr" href="javascript:void(0);" onClick={this.togglePopupActive.bind(this)}></a>
                    </div>
                    <span>{member.nickName}</span>
                </div>
            )
        }
    }
    renderLogout(){
        const {isLogined,api,ua} = this.props.memberCenterByUser;
        var microMessenger = ua.match(/MicroMessenger/i)=="micromessenger" ? true : false;
        if(isLogined === false || microMessenger){
            return null;
        }else{
            const {logoutUrl} = api;
            return (
                <div className="helpList">
                    <a className="logoutBtn" href={logoutUrl}>
                        <dl>
                            <dt>
                                <span>退出登录</span>
                            </dt>
                        </dl>
                    </a>
                </div>
            )
        }
        
    }
    renderOrderBanner(){
        const {countOrder} = this.props.memberCenterByUser;
        let count = {};
        _.forIn(countOrder, function(v, k) {
            if(v>0){
                count[k] = v < 100 ? <i>{v}</i> : <i>99+</i>
            }else{
                count[k] = null;
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
                    <div className="center"><img src={member.promoterQr} /></div>
                    <div className="bottom">邀请小伙伴扫一扫<br />分享给TA</div>
                </div>
            )
        }
        
    }
    renderHelpList(){
        return (
            <div className="helpLists">
                <div className="helpList">
                    <a href="/orderlist">
                        <dl>
                            <dt>
                                <img src="/client/asset/images/user_icon_1.png" />
                                <span>全部订单</span>
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
                                <span>收货地址</span>
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
                                <span>我的收藏</span>
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
                                <span>我的评论</span>
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
                                <span>优惠券</span>
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
                                <span>账户设置</span>
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
                                <span>关于我们</span>
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
                                <span>帮助与反馈</span>
                            </dt>
                            <dd>
                                <i className="iconfont icon-right"></i>
                            </dd>
                        </dl>
                    </a>
                </div>
                {this.renderLogout()}
            </div>
        );
    }
    render(){
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
                {this.renderHelpList()}
                <Footer activeIndex="4" />
                <MaskLayer visible={this.state.maskActive} handleClick={this.togglePopupActive.bind(this)}/>
                {this.renderPopQr()}
            </div>
        );
    }
}

export default MemberCenter;