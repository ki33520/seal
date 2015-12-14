'use strict'

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import dom from "../../lib/dom.es6";
import {apiRequest} from "../../lib/util.es6";
import Alert from "../../component/alert.jsx";
import Header from "../common/header.jsx";
import GoTop from "../../component/gotop.jsx";
import Refresher from "../../component/refresher.jsx";

import {Tabs,TabsItem} from "../../component/tabs.jsx";
import fetchComment from "./action.es6";
import {alert} from "../common/action.es6";


class CommentList extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayFlag:"all"
        }
    }
    componentDidMount(){
        dom.registerPullDownEvent(()=>{
            this.beginRefresh();
        }.bind(this));
    }
    beginRefresh(){
        const {dispatch} = this.props;
        const {collect,isFetching,pageSize} = this.props;
        var pageCount = Math.ceil(collect.totalPage/pageSize);
        var pageIndex = collect.pageIndex;
        var nextPage = pageIndex + 1;
        if(pageCount < nextPage){
            // this.setState({isFetching:false});
            return false;
        }
        if(isFetching === true){
            return false;
        }
        dispatch(fetchCollect(window.location.href,{
            pageIndex:nextPage
        }))
    }
    toggleFlag(flag,e){
        e && e.preventDefault();
        this.setState({
            displayFlag:flag
        });
    }
    renderTab(){
        const firstClasses = classNames({
            active:this.state.displayFlag === "all"
        })            
        const secondClasses = classNames({
            active:this.state.displayFlag === "show"
        })
        return (
        <nav>
            <a href="javascript:void(null)" className={firstClasses} 
            onClick={this.toggleFlag.bind(this,"all")}>全部评论</a>
            <a href="javascript:void(null)" className={secondClasses} 
            onClick={this.toggleFlag.bind(this,"show")}>晒单</a>
        </nav>
        )
    }
    render(){
        var {allComment,showComment} = this.props;
        
        allComment = allComment.map((child,i)=>{
            const key = "comment-" + i;
            var stars = [];
            for(let i=0;i<5;i++){
                let star;
                if(i<child.stars){
                    star = (<div key={i} className="iconfont icon-starA"></div>);
                }else{
                    star = (<div key={i} className="iconfont icon-starB"></div>);
                }
                stars.push(star)
            };
            return (
                <li id={child.goodId} key={key}>
                    <div className="product">
                        <div className="col col-left">
                            <img src={child.imageUrl} />
                        </div>
                        <div className="col col-right">
                            <div className="origin"><img src={child.originImageUrl} />{child.origin}</div>
                            <div className="title">{child.title}</div>
                        </div>
                    </div>
                    <div className="stars-culm">
                        <div className={"stars stars-"+child.stars}>
                            {stars}
                        </div>
                        <div className="date">{child.createAt}</div>
                    </div>
                    <div className="content">{child.content}</div>
                </li>
            )
        });
        showComment = showComment.map((child,i)=>{
            const key = "comment-" + i;
            var stars = [];
            for(let i=0;i<5;i++){
                let star;
                if(i<child.stars){
                    star = (<div key={i} className="iconfont icon-starA"></div>);
                }else{
                    star = (<div key={i} className="iconfont icon-starB"></div>);
                }
                stars.push(star)
            };
            return (
                <li id={child.goodId} key={key}>
                    <div className="product">
                        <div className="col col-left">
                            <img src={child.imageUrl} />
                        </div>
                        <div className="col col-right">
                            <div className="origin"><img src={child.originImageUrl} />{child.origin}</div>
                            <div className="title">{child.title}</div>
                        </div>
                    </div>
                    <div className="stars-culm">
                        <div className={"stars stars-"+child.stars}>
                            {stars}
                        </div>
                        <div className="date">{child.createAt}</div>
                    </div>
                    <div className="content">{child.content}</div>
                </li>
            )
        });
        return (
            <div className="comment-content">
            <div className="comment-header">
                <Header>
                    <span className="title">我的评论</span>
                </Header>
            </div>
            <div className="tab-content">
                <Tabs effect="slide">
                    <TabsItem title="全部评论"><ul className="comment-list">{allComment}</ul></TabsItem>
                    <TabsItem title="晒单"><ul className="comment-list">{showComment}</ul></TabsItem>
                </Tabs>
            </div>
            <GoTop />
            </div>
        )
    }
}


export default CommentList;