'use strict';

import React,{Component} from "react";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";

class Category extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.handleSelect(0)
    }
    handleSelect(i){
        const {categories} = this.props
        const category = categories[i]
        this.props.fetchCategoryActivity({
            code:category.code
        })
    }
    renderCategory(category){
        let children = category.children.map((child,i)=>{
            return (
            <a href={"/search?categoryNames="+child.name} className="cg" key={i}>
                <img src={child.imageUrl}/>
                <div>{child.name}</div>
            </a>
            )
        })
        return (
            <div className="rightCon">
                {category.activity?(
                <a href={category.activity.jumpUrl} className="ad">
                    <img src={category.activity.imageUrl}/>
                </a>
                ):null}
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
                <SlideTabs axis="y" contentSlidable={false} onSelect={this.handleSelect.bind(this)}>
                {tabs}
                </SlideTabs>
            </div>
        )
    }
}

export default Category