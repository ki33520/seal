'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";

class GoodComment extends Component{
    constructor(props){
        super(props);
    }
    renderStars(rate){
        let stars = []
        for(let i = 0;i < 5;i++){
            let star;
            if(i < rate){
                star = (<div key={i} className="iconfont icon-star-full"></div>);
            }else{
                star = (<div key={i} className="iconfont icon-star-empty"></div>);
            }
            stars.push(star)
        };
        return <div className="star"><ul>{stars}</ul></div>
    }
    renderComments(){
        const {allComments} = this.props.goodById;
        if(allComments && allComments.length > 0){
            const comments = allComments.map((comment,i)=>{
                <div className="comList">
                    <div className="comList_title">
                        <img src="/client/asset/images/picFace.png" />
                        <span>A**n</span>
                        <em>2015-05-26 14:36:12</em>
                    </div>
                    {this.renderStars()}
                    <p>东西很好很不错！！~东西很好很不错！！~东西很好很不错！！~东西很好很不错！！！！！！~~~~~</p>
                    <div className="comPics clearfix">
                        <a href="javascript:void(0);"><img src="/client/asset/images/965_G_1445533723842.gif" /></a>
                    </div>
                </div>
            })
            return <div className="comment-list">{comments}</div>
        }
        return null
    }
    renderShowups(){

    }
    render(){
        return (
            <div className="good-comment">
            <Header onGoBack={this.props.changeScene.bind(this,"index")}>商品评论</Header>
            <SlideTabs navbarSlidable={false}>
            <SlideTabsItem navigator={()=><span>全部评论</span>}></SlideTabsItem>
            <SlideTabsItem navigator={()=><span>晒单</span>}></SlideTabsItem>
            </SlideTabs>
            </div>
        )
    }
}

export default GoodComment;