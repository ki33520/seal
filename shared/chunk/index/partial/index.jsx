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
        const {weather} = this.props.weatherByCityName;
        const classes = classNames({
            "index-content":true
        })
        return (
            <div className={classes}>
            <Header/>
            <SlideTabs axis="x">
            <SlideTabsItem navigator={()=><span><b>首页</b></span>}>
            <Floor ref="floor"/>
            </SlideTabsItem>
            <SlideTabsItem navigator={()=><span><b>母婴用品</b></span>}>
            <Floor ref="floor"/>
            </SlideTabsItem>
            <SlideTabsItem navigator={()=><span><b>美妆个护</b></span>}>
            <Floor ref="floor"/>
            </SlideTabsItem>
            <SlideTabsItem navigator={()=><span><b>营养保健</b></span>}>
            <Floor ref="floor"/>
            </SlideTabsItem>
            <SlideTabsItem navigator={()=><span><b>家居生活</b></span>}>
            <Floor ref="floor"/>
            </SlideTabsItem>
            <SlideTabsItem navigator={()=><span><b>国际轻奢</b></span>}>
            <Floor ref="floor"/>
            </SlideTabsItem>
            </SlideTabs>
            <nav className="bottomNav">
                <ul className="clearfix">
                    <li><a href="/" className="nav_hover"><i></i>海外购</a></li>
                    <li><a href="/"><i></i>分类</a></li>
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