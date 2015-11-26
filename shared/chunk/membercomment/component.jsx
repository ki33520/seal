'use strict'

import React,{Component} from "react";
import Header from "../common/header.jsx";
import GoTop from "../../component/gotop.jsx";
import {Tabs,TabsItem} from "../../component/tabs.jsx";
import classNames from "classnames";
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';


class CommentList extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayFlag:"all"
        }
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
        console.log(allComment)
        allComment = allComment.map((child,i)=>{
            const key = "comment-" + i;
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
                        <div className={"stars "+child.stars}>{child.stars}</div>
                        <div className="date">{child.createAt}</div>
                    </div>
                    <div className="content">{child.content}</div>
                </li>
            )
            //<CouponRow comment={child} key={key}/>
        });
        showComment = showComment.map((child,i)=>{
            const key = "comment-" + i;
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
                        <div className={"stars "+child.stars}>{child.stars}</div>
                        <div className="date">{child.createAt}</div>
                    </div>
                    <div className="content">{child.content}</div>
                </li>
            )
            //<LegueCouponRow comment={child} key={key}/>
        });
        return (
            <div className="comment-content">
            <div className="comment-header">
                <Header title="我的评论"/>
            </div>
            <div className="comment-list">
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