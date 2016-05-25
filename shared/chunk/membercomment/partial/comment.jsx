'use strict';

import React,{Component} from "react";
import GoTop from "../../../component/gotop.jsx";
import Refresher from "../../../component/refresher.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import Header from "../../common/header.jsx";
import {jumpURL} from "../../../lib/jumpurl.es6";
import Loading from "../../common/loading.jsx";
import Floor from "./floor.jsx";

class Comment extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayFlag: 0
        }
    }
    beginRefresh(interval,flag){
        const {dispatch,fetchComment} = this.props;
        const {allComment,showComment,isFetching} =  this.props.commentByUser;
        var flag = flag !== undefined ? flag: this.state.displayFlag,
            interval = interval !== undefined ? interval : 1,
            comments = allComment,
            fetchLink = jumpURL("comment"),
            pageCount = 1,
            nextPage = 1;
        if(flag === 1){
            fetchLink = jumpURL("showcomment");
            comments = showComment;
        }
        if(comments){
            pageCount = comments.pageCount;
            nextPage = comments.pageIndex + interval;
        };
        if(pageCount < nextPage || isFetching){
            return false;
        }
        fetchComment(fetchLink,{
            pageIndex:nextPage
        });
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
    handleScroll(scrollNode,scrollTop){
        if((scrollNode.offsetHeight + scrollTop + 30) >= scrollNode.scrollHeight){
            this.beginRefresh()
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
                    <SlideTabs axis="x" activeIndex={this.state.displayFlag} transitionDuration="0" navbarSlidable={false} onSelect={this.toggleFlag.bind(this)} >
                        <SlideTabsItem navigator={()=><span>全部评论</span>}>
                            <GoTop relative={true} onScroll={this.handleScroll.bind(this)}>
                            <Floor comments={allComment} {...this.props} floorIndex={0} ref="floor"/>
                            <Refresher active={isFetching} />
                            </GoTop>
                        </SlideTabsItem>
                        <SlideTabsItem navigator={()=><span>晒单</span>}>
                            <GoTop relative={true} onScroll={this.handleScroll.bind(this)}>
                            <Floor comments={showComment} {...this.props} floorIndex={1} ref="floor"/>
                            <Refresher active={showComment && isFetching} />
                            <Loading active={!showComment && isFetching} />
                            </GoTop>
                        </SlideTabsItem>
                    </SlideTabs>
                </div>
            </div>
        )
    }
}

export default Comment;