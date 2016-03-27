'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import _ from "lodash";
import {Tabs,TabsItem} from "../../../component/tabs.jsx";
// import {Swiper,SwiperItem} from "../../../component/swiper.jsx";
import Slider from "../../../component/slider/slider.jsx";
import Slide from "../../../component/slider/slide.jsx";
import GoTop from "../../../component/gotop.jsx";
import Refresher from "../../../component/refresher.jsx";
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
    beginRefresh(channel){
        // console.log('channel',channel)
        const {fetchSingleRecommend,fetchNewRecommend} = this.props
        const {newRecommend,singleRecommend} = channel.floors
        if((singleRecommend === undefined || singleRecommend.pageIndex == singleRecommend.totalPage) && newRecommend.totalPage === undefined){
            if(channel.newRecommendFetching){
                return false
            }
            // console.log('start newRecommend')
            fetchNewRecommend({activityId:newRecommend.id,pageIndex:1},channel.id)
        }else if(singleRecommend && singleRecommend.pageIndex < singleRecommend.totalPage && singleRecommend.pageIndex > 1){
            if(channel.singleRecommendFetching){
                return false
            }
            fetchSingleRecommend({
                activityId:singleRecommend.id,
                pageIndex:singleRecommend.pageIndex + 1
            },channel.id)
        }
        if(newRecommend.pageIndex < newRecommend.totalPage && newRecommend.pageIndex > 1){
            if(channel.newRecommendFetching){
                return false
            }
            // console.log('newRecommend',newRecommend)
            fetchNewRecommend({
                activityId:newRecommend.id,
                pageIndex:newRecommend.pageIndex + 1
            },channel.id)
        }
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
            const {singleRecommend,newRecommend} = channel.floors
            let isNoMore = false
            if(singleRecommend === undefined && newRecommend){
                if(newRecommend.pageIndex !== undefined ){
                    if(newRecommend.pageIndex == newRecommend.totalPage){
                        isNoMore = true
                    }
                }
            }
            if(singleRecommend && newRecommend){
                if(newRecommend.pageIndex !== undefined ){
                    if(singleRecommend.pageIndex == singleRecommend.totalPage && newRecommend.pageIndex == newRecommend.totalPage){
                        isNoMore = true
                    }
                }
            }
            return (
                <TabsItem title={channel.name} key={i}>
                <GoTop relative={true}>
                <Floor channel={channel} {...props}/>{i>0?(
                <Loading active={channelFetching}/>
                ):null}
                <Refresher handleRefresh={this.beginRefresh.bind(this,channel)} 
                active={channel.singleRecommendFetching || channel.newRecommendFetching}/>
                {isNoMore?
                    (<div className="no-more">已显示全部内容</div>):null}
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