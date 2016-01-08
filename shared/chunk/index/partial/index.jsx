'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import Slider from "../../../component/slider/slider.jsx";
import Slide from "../../../component/slider/slide.jsx";


import Header from "./header.jsx";
import Footer from "../../common/footer.jsx";
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
                <Floor floors={floors} {...this.props}/>
                </SlideTabsItem>
            )
        })
        return (
            <div className={classes}>
            <Header/>
            <SlideTabs axis="x">
            {tabs}
            </SlideTabs>
            <Footer activeIndex="0"/>
            </div>
        )
    }
}

export default Index;