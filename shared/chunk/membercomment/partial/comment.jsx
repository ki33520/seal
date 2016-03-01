'use strict';

import React,{Component} from "react";
import classNames from "classnames";

import GoTop from "../../../component/gotop.jsx";
import Refresher from "../../../component/refresher.jsx";
import MaskLayer from "../../../component/masklayer.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import Header from "../../common/header.jsx";

import {fetchComment} from "../action.es6";
import Floor from "./floor.jsx";

class Comment extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayFlag: 0
        }
    }
    beginRefresh(interval,flag){
        const {dispatch} = this.props;
        const {allComment,showComment,isFetching} =  this.props.commentByUser;
        var flag = flag !== undefined ? flag: this.state.displayFlag,
            interval = interval !== undefined ? interval : 1,
            comments = allComment,
            fetchLink = "/membercenter/comment",
            pageCount = 1,
            nextPage = 1;
        if(flag === 1){
            fetchLink = "/membercenter/showcomment";
            comments = showComment;
        }
        if(comments){
            pageCount = comments.pageCount;
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
        var {allComment,showComment,isFetching} = this.props.commentByUser;
        var comment = allComment;
        this.setState({
            displayFlag:flag
        });
        if(flag===1){
            comment = showComment;
        }
        if(!comment && !isFetching){
            this.beginRefresh(0,flag);
        }
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
                            <Floor comments={allComment} {...this.props} floorIndex={0} ref="floor"/>
                            <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)} />
                            <GoTop relative={true}/>
                        </SlideTabsItem>
                        <SlideTabsItem navigator={()=><span><b>晒单</b></span>}>
                            <Floor comments={showComment} {...this.props} floorIndex={1} ref="floor"/>
                            <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)} />
                            <GoTop relative={true}/>
                        </SlideTabsItem>
                    </SlideTabs>
                </div>
            </div>
        )
    }
}

export default Comment;