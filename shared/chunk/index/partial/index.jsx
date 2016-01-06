'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import Slider from "../../../component/slider/slider.jsx";
import Slide from "../../../component/slider/slide.jsx";


import Header from "./header.jsx";
import Floor from "./floor.jsx";

class Index extends Component{
    render(){
        const {channels,floors} = this.props.index;
        const classes = classNames({
            "index-content":true
        })
        const tabs = channels.map((channel,i)=>{
            return (
                <SlideTabsItem navigator={()=><span><b>{channel.name}</b></span>} key={i}>
                <Floor floors={floors}/>
                </SlideTabsItem>
            )
        })
        return (
            <div className={classes}>
            <Header/>
            <SlideTabs axis="x">
            {tabs}
            </SlideTabs>
            <nav className="bottomNav">
                <ul className="clearfix">
                    <li><a href="/" className="nav_hover"><i></i>海外购</a></li>
                    <li><a href="/category"><i></i>分类</a></li>
                    <li><a href="/trendy"><i></i>爆款</a></li>
                    <li><a href="/cart"><i></i>购物车</a></li>
                    <li><a href="/membercenter"><i></i>个人中心</a></li>
                </ul>
            </nav>
            </div>
        )
    }
}

export default Index;