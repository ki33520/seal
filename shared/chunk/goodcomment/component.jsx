'use strict'

import React,{Component} from "react";
import classNames from "classnames";
import util,{apiRequest} from "../../lib/util.es6";
import GoTop from "../../component/gotop.jsx";
import Refresher from "../../component/refresher.jsx";
import fetchComment from "./action.es6";

import {Tabs,TabsItem} from "../../component/tabs.jsx";
import Header from "../common/header.jsx";
import Node from "./partial/node.jsx";


class CommentList extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayFlag: 0
        }
    }
    componentDidMount(){
        util.registerPullDownEvent(()=>{
            this.beginRefresh(1);
        }.bind(this));
    }
    beginRefresh(interval,flag){
        const {allComment,showComment,isFetching,dispatch,goodId} =  this.props;
        var comments,
            fetchLink,
            pageCount = 1,
            nextPage = 1;
        var flag = flag!= undefined ? flag: this.state.displayFlag;
        if(flag === 0){
            comments = allComment;
            fetchLink = "/goodcomment/"+goodId;
        }else{
            comments = showComment;
            fetchLink = "/goodcommentshow/"+goodId;
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
        var {allComment,showComment,activeIndex,isFetching,goodId} = this.props;
        var a=0,b=1;
        return (
            <div className="comment-content">
                <div className="comment-header">
                    <Header>
                        <span className="title">商品评论</span>
                    </Header>
                </div>
                <div className="tab-content">
                    <Tabs handleToggleFlag={this.toggleFlag.bind(this)} effect="slide" activeIndex={this.state.displayFlag}>
                        <TabsItem title="全部评论" handleTouch={this.toggleFlag.bind(this)}>
                            <Node comments={allComment} />
                        </TabsItem>
                        <TabsItem title="晒单" handleTouch={this.toggleFlag.bind(this)}>
                            <Node comments={showComment} />
                        </TabsItem>
                    </Tabs>
                    <GoTop />
                    <Refresher active={isFetching} />
                </div>
                <GoTop />
            </div>
        )
    }
}


export default CommentList;