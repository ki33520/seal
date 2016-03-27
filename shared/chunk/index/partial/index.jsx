'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import _ from "lodash";
// import {Tabs,TabsItem} from "../../../component/tabs.jsx";
import {Swiper,SwiperItem} from "../../../component/swiper.jsx";
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
        const {fetchSingleRecommend,fetchNewRecommend} = this.props
        const {newRecommend,singleRecommend} = channel.floors
        if(channel.singleRecommendFetching || channel.newRecommendFetching){
            return false
        }
        // console.log('singleRecommend',singleRecommend,newRecommend)
        if(singleRecommend === undefined){
            if(newRecommend && newRecommend.pageIndex === undefined){
                fetchNewRecommend({activityId:newRecommend.id,pageIndex:1},channel.id)
            }
        }else if(singleRecommend.pageIndex == singleRecommend.totalPage){
            if(newRecommend && newRecommend.pageIndex === undefined){
                fetchNewRecommend({activityId:newRecommend.id,pageIndex:1},channel.id)
            }
        }else if(singleRecommend.pageIndex < singleRecommend.totalPage){
            fetchSingleRecommend({
                activityId:singleRecommend.id,
                pageIndex:singleRecommend.pageIndex + 1
            },channel.id)
        }
        if(newRecommend === undefined || newRecommend.pageIndex === newRecommend.totalPage){
            return false
        }else if(newRecommend.pageIndex < newRecommend.totalPage){
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
                <SwiperItem control={()=><b>{channel.name}</b>} key={i} scrollable={false}>
                <GoTop relative={true}>
                <Floor channel={channel} {...props}/>{i>0?(
                <Loading active={channelFetching}/>
                ):null}
                <Refresher handleRefresh={this.beginRefresh.bind(this,channel)} threshold={30}
                active={channel.singleRecommendFetching || channel.newRecommendFetching}/>
                {isNoMore?
                    (<div className="no-more">已显示全部内容</div>):null}
                </GoTop>
                </SwiperItem>
            )
        })
        return (
            <div className={classes}>
            <Header {...this.props}/>
            <Swiper controlSliding={true} 
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