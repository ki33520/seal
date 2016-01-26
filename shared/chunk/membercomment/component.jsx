'use strict'

import React,{Component} from "react";
import classNames from "classnames";
import util,{apiRequest} from "../../lib/util.es6";
import GoTop from "../../component/gotop.jsx";
import Refresher from "../../component/refresher.jsx";
import fetchComment from "./action.es6";

import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";
import Slider from "../../component/slider/slider.jsx";
import Slide from "../../component/slider/slide.jsx";
import Header from "../common/header.jsx";
import Floor from "./partial/floor.jsx";

class CommentList extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayFlag: 0
        }
    }
    beginRefresh(interval,flag){
        const {dispatch} = this.props;
        const {allComment,showComment,isFetching} =  this.props.commentByUser;
        var comments = allComment,
            fetchLink = "/membercenter/comment",
            pageCount = 1,
            nextPage = 1;
        var flag = flag !== undefined ? flag: this.state.displayFlag,
            interval = interval !== undefined ? interval : 1;
        if(flag === 1){
            fetchLink = "/membercenter/showcomment";
            comments = showComment;
        }
        if(comments){
            pageCount = Math.ceil(comments.totalCount/comments.pageSize);
            nextPage = comments.pageIndex + interval;
        };
        if(pageCount < nextPage || isFetching){
            return false;
        }
        dispatch(fetchComment(fetchLink,{
            pageIndex:nextPage
        }));
    }
    toggleFlag(flag,e){
        e && e.preventDefault();
        this.setState({
            displayFlag:flag
        });
        this.beginRefresh(0,flag);
    }
    render(){
        var {allComment,showComment,isFetching} = this.props.commentByUser;
        return (
            <div className="comment-content">
                <div className="comment-header">
                    <Header>
                        <span className="title">我的评论</span>
                    </Header>
                </div>
                <div className="tab-content">
                    <SlideTabs axis="x" activeIndex={this.state.displayFlag} navbarSlidable={false} onSelect={this.toggleFlag.bind(this)} >
                        <SlideTabsItem navigator={()=><span><b>全部评论</b></span>}>
                            <Floor comments={allComment} ref="floor"/>
                            <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)} />
                            <GoTop relative={true}/>
                        </SlideTabsItem>
                        <SlideTabsItem navigator={()=><span><b>晒单</b></span>}>
                            <Floor comments={showComment} ref="floor"/>
                            <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)} />
                            <GoTop relative={true}/>
                        </SlideTabsItem>
                    </SlideTabs>
                </div>
            </div>
        )
    }
}


export default CommentList;