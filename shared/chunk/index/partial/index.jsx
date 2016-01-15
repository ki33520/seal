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
    constructor(props){
        super(props)
        this.state = {
            activeChannel:0
        }
    }
    handleSelect(i,e){
        // console.log('handleSelect',i)
        this.setState({
            activeChannel:i
        })
    }
    render(){
        const {channels} = this.props.index;
        const classes = classNames({
            "index-content":true
        })
        const tabs = channels.map((channel,i)=>{
            let props = Object.assign({},this.props,{
                active: i === this.state.activeChannel
            })
            return (
                <SlideTabsItem navigator={()=><span><b>{channel.name}</b></span>} key={i}>
                <Floor channel={channel} {...props}/>
                </SlideTabsItem>
            )
        })
        return (
            <div className={classes}>
            <Header/>
            <SlideTabs axis="x" onSelect={this.handleSelect.bind(this)}>
            {tabs}
            </SlideTabs>
            <Footer activeIndex="0"/>
            </div>
        )
    }
}

export default Index;