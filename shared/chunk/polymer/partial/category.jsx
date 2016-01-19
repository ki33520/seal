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
            <a href="/goodlist" className="cg" key={i}>
                <img src={child.imageUrl}/>
                <div>{child.name}</div>
            </a>
            )
        })
        return (
            <div className="rightCon">
                <a href="#" className="ad">
                    <img src={category.imageUrl}/>
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