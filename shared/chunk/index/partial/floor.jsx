'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import _ from "lodash"
import Slider from "../../../component/slider/slider.jsx";
import Slide from "../../../component/slider/slide.jsx";

class Floor extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        if(this.props.active){
            if(_.isEmpty(this.props.floors)){
                this.handleActive()
            }
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.active && !this.props.active){
            if(_.isEmpty(this.props.floors)){
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
        if(singleRecommend && singleRecommend.goods){
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
        if(newRecommend && newRecommend.goods){
            return newRecommend.goods.map((good,i)=>{
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
        }
        return null
    }
    renderSlider(){
        let {slides} = this.props.channel.floors;
        if(slides){
            slides = slides.map((slide,i)=>{
                return (
                    <Slide key={i}>
                        <a href={"/activity/"+slide.id}>
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
                return <span key={i}>{badge.title}</span>
            })
            return <div className="m-entry">{badges}</div>
        }
        return null
    }
    renderRushBuy(){
        let {rushbuys} = this.props.channel.floors;
        if(rushbuys){
            return rushbuys.map((rushbuy,i)=>{
                return <a href={"/activity/"+rushbuy.id} key={i}>
                    <img src={rushbuy.imageUrl} />
                    <span><i><img src="/client/asset/images/flashClock.png" /></i>距本期活动结束：01天34时10分46秒</span>
                </a>
            })
        }
        return null
    }
    renderFlashBuy(){
        let {flashbuys} = this.props.channel.floors;
        if(flashbuys){
            flashbuys = flashbuys.map((good,i)=>{
                return (
                <a href={"/gooddetail/"+good.singleCode} className="clearfix" key={i}>
                    <img src="/client/asset/images/pic8.gif" />
                    <div className="right">
                        <p>距本期闪购结束<em><i>01</i>天<i>34</i>时<i>10分</i><i>46秒</i></em></p>
                        <div className="flashDot"></div>
                        <span className="name">{good.title}</span>
                        <span className="country"><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</span>
                        <span className="nowPrice">&yen;{good.salePrice}</span>
                        <span className="oldPrice">&yen;{good.originPrice}</span>
                    </div>
                </a>
                )
            })
            return (
                <div className="flashBuy">
                    <div className="title">
                        <span><i></i>闪购精选</span>
                        <a href={"/flashbuy/"+this.props.index.currentChannel}>更多<i><img src="/client/asset/images/ico_more.png" /></i></a>
                    </div>
                    {flashbuys}
                </div>
            )
        }
        return null
    }
    renderActivityOne(){
        let {activityOne} = this.props.channel.floors;
        if(activityOne){
            let mobileonly = activityOne["手机专享"];
            let finest = activityOne["海外精选"];
            let stockup = activityOne["今日海囤"];
            if(mobileonly && finest && stockup){
                return (
                    <div className="activity">
                    <ul className="clearfix">
                        <li>
                            <a href={"/mobileonly/"+mobileonly.id}>
                                <img src={mobileonly.imageUrl} alt="" />
                                <span></span>
                            </a>
                        </li>
                        <li>
                            <a href={"/finest/"+finest.id}>
                                <img src={finest.imageUrl} alt="" />
                                <span></span>
                            </a>
                            <a href={"/stockup/"+stockup.id}>
                                <img src={stockup.imageUrl} alt="" />
                                <span></span>
                            </a>
                        </li>
                    </ul>
                    </div>
                )
            }
            return null
        }
        return null
    }
    renderActivityTwo(){
        let {activityTwo} = this.props.channel.floors;
        if(activityTwo){
            return activityTwo.map((activity,i)=>{
                return (
                    <li key={i}>
                        <a href={"/activity/"+activity.id}>
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
        if(activityThree){
            return (
                <ul className="clearfix">
                    <li>
                        <a href={"/activity/"+activityThree[0].id}>
                            <img src={activityThree[0].imageUrl} alt="" />
                            <span></span>
                        </a>
                    </li>
                    <li>
                        <div className="clearfix">
                        <a href={"/activity/"+activityThree[1].id}>
                            <img src={activityThree[1].imageUrl} alt=""/>
                        </a>
                        <a href={"/activity/"+activityThree[2].id}>
                            <img src={activityThree[2].imageUrl} alt=""/>
                        </a>
                        </div>
                        <a href={"/activity/"+activityThree[3].id}>
                            <img src={activityThree[3].imageUrl} alt=""/>
                        </a>
                    </li>
                </ul>
            )
        }
        return null
    }
    render(){
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
                <div className="activityGeneral">
                    <div className="title">
                        <span><i></i>新品推荐</span>
                    </div>
                    {this.renderNewRecommend()}
                </div>
            </div>
        )
    }
}

export default Floor;