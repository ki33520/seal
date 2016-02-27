'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import _ from "lodash"
import Slider from "../../../component/slider/slider.jsx";
import Slide from "../../../component/slider/slide.jsx";
import Image from "../../../component/image.jsx";
import ScrollSpy from "../../../component/scrollspy.jsx";
import Loading from "../../common/loading.jsx";
import Timer from "../../common/timer.jsx";
import {validTimeRegion,formatPrice} from "../../../lib/util.es6";

class Floor extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        if(this.props.active){
            const {fetchNewRecommend,fetchSingleRecommend} = this.props;
            const {newRecommend,singleRecommend} = this.props.channel.floors
            if(newRecommend && newRecommend.goods === null){
                fetchNewRecommend({activityId:newRecommend.id},this.props.channel.id)
            }
            if(singleRecommend && singleRecommend.goods === null){
                fetchSingleRecommend({activityId:singleRecommend.id},this.props.channel.id)
            }
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.active && !this.props.active){
            if(_.isEmpty(this.props.channel.floors)){
                this.handleActive()
            }
        }
    }
    handleActive(){
        // const {fetchSingleRecommend,fetchNewRecommend} = this.props;
        const {fetchChannel,channel} = this.props;
        fetchChannel({
            id:channel.id
        })
    }
    renderSingleRecommend(){
        let {singleRecommend} = this.props.channel.floors;
        if(singleRecommend && singleRecommend.goods && singleRecommend.goods.length > 0){
            let goods = singleRecommend.goods.map((good,i)=>{
                return (
                    <a href={"/gooddetail/"+good.singleCode} className="clearfix" key={i}>
                        <img src={good.imageUrl} />
                        <span className="name">{good.title}</span>
                        <p>{good.subTitle}</p>
                        <span className="country"><i><img src="/client/asset/images/ico_flag.png"/></i>荷兰直采</span>
                        <span className="singlePrice">
                            <span className="nowPrice">&yen;{good.salePrice}</span>
                            <span className="oldPrice">&yen;{good.originPrice}</span>
                        </span>
                    </a>
                )
            })
            return (
                <div className="indexSingle">
                    <div className="title">
                        <span><i></i>单品推荐</span>
                    </div>
                    {goods}
                </div>
            )
        }
        return null
    }
    renderNewRecommend(){
        let {newRecommend} = this.props.channel.floors;
        if(newRecommend && newRecommend.goods && newRecommend.goods.length > 0){
            let goods = newRecommend.goods.map((good,i)=>{
                return (
                    <a href={"/gooddetail/"+good.singleCode} className="clearfix" key={i}>
                        <img src={good.imageUrl} />
                        <div className="right">
                            <span className="name">{good.title}</span>
                            <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                            <span className="nowPrice">&yen;{good.salePrice}</span>
                            <span className="oldPrice">&yen;{good.originPrice}</span>
                        </div>
                    </a>
                )   
            })
            return (
                <div className="activityGeneral">
                    <div className="title">
                        <span><i></i>新品推荐</span>
                    </div>
                    {goods}
                </div>
            )
        }
        return null
    }
    renderSlider(){
        let {slides} = this.props.channel.floors;
        if(slides && slides.length > 0){
            slides = slides.map((slide,i)=>{
                return (
                    <Slide key={i}>
                        <a href={slide.jumpUrl}>
                            <img src={slide.imageUrl} alt=""/>
                        </a>
                    </Slide>
                )
            })
            return (
                <Slider ref="slider" autoPlay={true} touchEnabled={false} effect="fade">
                {slides}
                </Slider>
            )
        }
        return null
    }
    renderBadges(){
        let {badges} = this.props.channel.floors;
        if(badges && badges.length > 0){
            badges = badges.map((badge,i)=>{
                return <a href={badge.jumpUrl} key={i}><span><img src={badge.imageUrl}/><p>{badge.title}</p></span></a>
            })
            return <div className="m-entry">{badges}</div>
        }
        return null
    }
    renderRushBuy(){
        let {rushbuys} = this.props.channel.floors;
        if(rushbuys){
            return rushbuys.map((rushbuy,i)=>{
                let timer = (
                    <span><i><img src="/client/asset/images/flashClock.png" />
                    </i>距本期活动结束：<Timer endTime={rushbuy.endTime} dayEnable={true} 
                        template="<%= day %>天<%= hour %>时<%= minute %>分<%= second %>秒"/>
                    </span>
                )
                let validTime = validTimeRegion(rushbuy.startTime,rushbuy.endTime)
                if(validTime === -1){
                    timer = (
                    <span><i><img src="/client/asset/images/flashClock.png" />
                    </i>距本期活动开始：<Timer endTime={rushbuy.startTime} dayEnable={true} 
                        template="<%= day %>天<%= hour %>时<%= minute %>分<%= second %>秒"/>
                    </span>
                    )
                }else if(validTime === 1){
                    timer = (
                    <span><i><img src="/client/asset/images/flashClock.png" />
                    </i>活动已结束</span>
                    )
                    return null
                }
                return <a href={rushbuy.jumpUrl} key={i}>
                    <image src={rushbuy.imageUrl} />{timer}
                </a>
            })
        }
        return null
    }
    renderFlashBuy(){
        let {flashbuys,flashbuyId} = this.props.channel.floors;
        if(flashbuys){
            let goods = null;
            flashbuys = flashbuys.forEach((flashbuy,i)=>{
                let validTime = validTimeRegion(flashbuy.startTime,flashbuy.endTime)
                if(validTime === 0){
                    goods = flashbuy.goods.map((good,i)=>{
                        let timer = (
                            <Timer endTime={flashbuy.endTime} dayEnable={true} 
                            template="<i><%= day %></i>天<i><%= hour %></i>时<i><%= minute %></i>分<i><%= second %></i>秒"/>
                        )
                        return (
                        <a href={"/gooddetail/"+good.singleCode} className="clearfix" key={i}>
                            <img src={good.imageUrl}/>
                            <div className="right">
                                <p>距本期闪购结束<em>{timer}</em></p>
                                <div className="flashDot"></div>
                                <span className="name">{good.title}</span>
                                <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                                <span className="nowPrice">&yen;{good.salePrice}</span>
                                <span className="oldPrice">&yen;{good.originPrice}</span>
                            </div>
                        </a>
                        )
                    })
                }
            })
            return (
                <div className="flashBuy">
                    <div className="title">
                        <span><i></i>闪购精选</span>
                        <a href={"/flashbuy/"+flashbuyId}>更多<i><img src="/client/asset/images/ico_more.png" /></i></a>
                    </div>
                    {goods}
                </div>
            )
        }
        return null
    }
    renderActivityOne(){
        let {activityOne} = this.props.channel.floors;
        if(activityOne && activityOne.length > 0){
            return (
                <div className="activity">
                <ul className="clearfix">
                    <li>
                        <a href={activityOne[0].jumpUrl}>
                            <img src={activityOne[0].imageUrl} alt="" />
                            <span></span>
                        </a>
                    </li>
                    <li>
                        {activityOne[1]?(
                        <a href={activityOne[1].jumpUrl}>
                            <img src={activityOne[1].imageUrl} alt="" />
                            <span></span>
                        </a>
                        ):null}
                        {activityOne[2]?(
                        <a href={activityOne[2].jumpUrl}>
                            <img src={activityOne[2].imageUrl} alt="" />
                            <span></span>
                        </a>
                        ):null}
                    </li>
                </ul>
                </div>
            )
        }
        return null
    }
    renderActivityTwo(){
        let {activityTwo} = this.props.channel.floors;
        if(activityTwo){
            return activityTwo.map((activity,i)=>{
                return (
                    <li key={i}>
                        <a href={activity.jumpUrl}>
                            <img src={activity.imageUrl} alt="" />
                            <span></span>
                        </a>
                    </li>
                )
            })
        }
        return null
    }
    renderActivityThree(){
        let {activityThree} = this.props.channel.floors;
        if(activityThree && activityThree.length > 0){
            return (
                <ul className="clearfix">
                    <li>
                        <a href={activityThree[0].jumpUrl}>
                            <img src={activityThree[0].imageUrl} alt="" />
                            <span></span>
                        </a>
                    </li>
                    <li>
                        <div className="clearfix">
                        <a href={activityThree[1].jumpUrl}>
                            <img src={activityThree[1].imageUrl} alt=""/>
                        </a>
                        <a href={activityThree[2].jumpUrl}>
                            <img src={activityThree[2].imageUrl} alt=""/>
                        </a>
                        </div>
                        <a href={activityThree[3].jumpUrl}>
                            <img src={activityThree[3].imageUrl} alt=""/>
                        </a>
                    </li>
                </ul>
            )
        }
        return null
    }
    render(){
        let {channelFetching}  = this.props.channel
        if(!this.props.active && _.isEmpty(this.props.channel.floors)){
            channelFetching = channelFetching || true
        }
        return (
            <div className="floor-content">
                {this.renderSlider()}
                {this.renderBadges()}
                <div className="panic">
                {this.renderRushBuy()}
                </div>
                {this.renderActivityOne()}
                <div className="activity_2">
                    <ul className="clearfix">{this.renderActivityTwo()}</ul>
                </div>
                {this.renderFlashBuy()}
                <div className="activity_3">{this.renderActivityThree()}</div>
                {this.renderSingleRecommend()}
                {this.renderNewRecommend()}
                <Loading active={channelFetching}/>
            </div>
        )
    }
}

export default Floor;