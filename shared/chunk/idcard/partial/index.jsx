'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../../lib/util.es6";
import Header from "../../common/header.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";

class IDcard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0
        }
    }
    handleClick(index){
         
    }
    render(){
         
        return (
            <div className="idcard-content">
                <Header>
                    <span className="title">身份证</span>
                </Header>
                <SlideTabs axis="x" navbarSlidable={false} onSelect={this.handleClick.bind(this)}>
                    <SlideTabsItem navigator={()=>null}>
                         
                    </SlideTabsItem>
                </SlideTabs>
            </div>
        )
    }
}

export default IDcard;