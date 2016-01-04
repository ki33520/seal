'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Icon from "../../component/icon.jsx";
import classNames from "classnames";
import {Tabs,TabsItem} from "../../component/tabs.jsx";

class Topic extends Component{
    render(){
        const {title} = this.props.topic;
        return (
            <div className="topic-content">
            <Header>{title}</Header>
            <div className="flashBuy">
                <a href="/gooddetail/1" className="clearfix">
                    <img src="/client/asset/images/pic8.gif" />
                    <div className="right">
                        <span className="name">荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（...</span>
                        <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                        <span className="nowPrice">&yen;99.0</span>
                        <span className="oldPrice">&yen;199.0</span>
                    </div>
                </a>
                <a href="/gooddetail/1" className="clearfix">
                    <img src="/client/asset/images/pic8.gif" />
                    <div className="right">
                        <span className="name">荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（...</span>
                        <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                        <span className="nowPrice">&yen;99.0</span>
                        <span className="oldPrice">&yen;199.0</span>
                    </div>
                </a>
                <a href="/gooddetail/1" className="clearfix">
                    <img src="/client/asset/images/pic8.gif" />
                    <div className="right">
                        <span className="name">荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（...</span>
                        <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                        <span className="nowPrice">&yen;99.0</span>
                        <span className="oldPrice">&yen;199.0</span>
                    </div>
                </a>
            </div>
            </div>
        )
    }
}

export default Topic