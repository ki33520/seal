'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Icon from "../../component/icon.jsx";
import classNames from "classnames";
import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";
import Category from "./partial/category.jsx";
import Brand from "./partial/brand.jsx";
import Origin from "./partial/origin.jsx";

class Polymer extends Component{
    render(){
        //var {categorys,brands,origins} = this.props;
        return (
            <div className="box">
                <Header>
                    <div className="logo"><img src="/client/asset/images/indexlogo.png" /></div>
                    <div className="btn-right">
                        <Icon icon="search"/>
                    </div>
                </Header>
                <div className="polymer-list">
                    <SlideTabs navbarSlidable={false}>
                        <SlideTabsItem navigator={()=><i>类别</i>}><Category {...this.props.allCategory}/></SlideTabsItem>
                        <SlideTabsItem navigator={()=><i>品牌</i>}><Brand {...this.props}/></SlideTabsItem>
                        <SlideTabsItem navigator={()=><i>产地</i>}><Origin {...this.props}/></SlideTabsItem>
                    </SlideTabs>
                </div>
            </div>
        )
    }
}

export default Polymer;