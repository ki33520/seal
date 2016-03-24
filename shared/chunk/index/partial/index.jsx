'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import _ from "lodash";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import {Tabs,TabsItem} from "../../../component/tabs.jsx";
import Slider from "../../../component/slider/slider.jsx";
import Slide from "../../../component/slider/slide.jsx";
import GoTop from "../../../component/gotop.jsx";
import Loading from "../../common/loading.jsx";

import Header from "./header.jsx";
import Footer from "./footer.jsx";
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
        const {channels,activeIndex} = this.props.index;
        const classes = classNames({
            "index-content":true
        })
        const tabs = channels.map((channel,i)=>{
            let props = Object.assign({},this.props,{
                active: i === this.state.activeChannel
            })
            let {channelFetching}  = channel
            if(!props.active && _.isEmpty(channel.floors)){
                channelFetching = channelFetching || true
            }
            return (
                <TabsItem title={channel.name} key={i}>
                <GoTop relative={true}>
                <Floor channel={channel} {...props}/>
                <Loading active={channelFetching}/>
                </GoTop>
                </TabsItem>
            )
        })
        return (
            <div className={classes}>
            <Header {...this.props}/>
            <Tabs navbarSlidable={true} onSelect={this.handleSelect.bind(this)}>
            {tabs}
            </Tabs>
            <Footer activeIndex="0"/>
            </div>
        )
    }
}

Index.defaultProps = {
    changeScene:()=>{}
}

export default Index;