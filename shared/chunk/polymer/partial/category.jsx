'use strict';

import React,{Component} from "react";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";

class Category extends Component{
    constructor(props){
        super(props);
    }
    renderCategory(category){
        let children = category.children.map((child,i)=>{
            return (
            <a href="/" className="cg" key={i}>
                <img src="/client/asset/images/965_G_1445533723842.gif"/>
                <div>{child.fullName}</div>
            </a>
            )
        })
        return (
            <div className="rightCon">
                <a href="#" className="ad">
                    <img src="/client/asset/images/pic24.gif"/>
                </a>
                <div className="content">
                    <div className="title">热门分类</div>
                    {children}
                </div>
            </div>
        )
    }
    render(){
        let {categories} = this.props
        const tabs = categories.map((category,i)=>{
            return (
                <SlideTabsItem navigator={()=><span>{category.name}</span>} key={i}>{this.renderCategory(category)}</SlideTabsItem>
            )
        })
        return (
            <div className="category-list">
                <SlideTabs axis="y" contentSlidable={false}>
                {tabs}
                </SlideTabs>
            </div>
        )
    }
}

export default Category