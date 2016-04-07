'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import _ from "lodash";
// import {Tabs,TabsItem} from "../../../component/tabs.jsx";
import {Swiper,SwiperItem} from "../../../component/swiper.jsx";
import Slider from "../../../component/slider/slider.jsx";
import Slide from "../../../component/slider/slide.jsx";

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
            return (
                <SwiperItem control={()=><b>{channel.name}</b>} key={i} scrollable={false}>
                <Floor channel={channel} {...props} index={i}/>
                </SwiperItem>
            )
        })
        return (
            <div className={classes}>
            <Header {...this.props}/>
            <Swiper controlSliding={true} contentSliding={false}  
            onSelect={this.handleSelect.bind(this)}>
            {tabs}
            </Swiper>
            <Footer activeIndex="0"/>
            </div>
        )
    }
}

Index.defaultProps = {
    changeScene:()=>{}
}

export default Index;