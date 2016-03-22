'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import GoTop from "../../../component/gotop.jsx";
import Refresher from "../../../component/refresher.jsx";
import Swipelist from "../../common/swipelist.jsx";

class GoodComment extends Component{
    constructor(props){
        super(props);
    }
    renderStars(rate){
        let stars = []
        for(let i = 0;i < 5;i++){
            let star;
            if(i < rate){
                star = (<li key={i} className="iconfont icon-star-full"></li>);
            }else{
                star = (<li key={i} className="iconfont icon-star-empty"></li>);
            }
            stars.push(star)
        };
        return <div className="star"><ul>{stars}</ul></div>
    }
    renderComments(){
        const {comments} = this.props.goodById.good;
        if(comments && comments["list"].length > 0){
            const commentsContent = comments["list"].map((comment,i)=>{
                const commentImages = comment["commentImages"].map((img,i)=>{
                    return <a href="javascript:void(null)" 
                    onClick={()=>{
                        this.props.changeScene("thumbnail",{index:i,list:comment["commentImages"]})}
                    } 
                    key={i}><img src={img}/></a>
                })
                return (
                    <div className="comList" key={i}>
                        <div className="comList_title">
                            <img src={comment.avatar} />
                            <span>{comment.isOpen===1?comment.nickName:"匿名用户"}</span>
                            <em>{comment.createdAt}</em>
                        </div>
                        {this.renderStars(comment.rate)}
                        <p>{comment.content}</p>
                        <div className="comPics clearfix">{commentImages}</div>
                    </div>
                )
            })
            return <div className="comment-list">{commentsContent}</div>
        }
        return (
            <div className="empty">
                <img src="/client/asset/images/empty_goodsComment.png" />
                <span>目前还没有任何评论哟~</span>
            </div>
        )
    }
    renderShowups(){
        const {showups} = this.props.goodById.good;
        if(showups && showups["list"].length > 0){
            const showupsContent = showups["list"].map((comment,i)=>{
                const commentImages = comment["commentImages"].map((img,i)=>{
                    return <a href="javascript:void(null)" 
                    onClick={()=>{
                        this.props.changeScene("thumbnail",{index:i,list:comment["commentImages"]})}
                    } 
                    key={i}><img src={img}/></a>
                })
                return (
                    <div className="comList" key={i}>
                        <div className="comList_title">
                            <img src={comment.avatar} />
                            <span>{comment.nickName}</span>
                            <em>{comment.createdAt}</em>
                        </div>
                        {this.renderStars(comment.rate)}
                        <p>{comment.content}</p>
                        <div className="comPics clearfix">{commentImages}</div>
                    </div>
                )
            })
            return <div className="comment-list">{showupsContent}</div>
        }
        return (
            <div className="empty">
                <img src="/client/asset/images/empty_goodsSun.png" />
                <span>目前还没有任何晒单哟~</span>
            </div>
        )
    }
    componentDidMount(){
        const {productCode} = this.props.goodById.good
        this.props.fetchComments({productCode})
        this.props.fetchShowups({productCode})
    }
    handleRefreshComments(){
        const {pageIndex,totalPage} = this.props.goodById.good.comments
        const {commentsFetching,productCode} = this.props.goodById.good
        let nextPage = pageIndex + 1
        if(commentsFetching || totalPage <= pageIndex){
            return false;
        }
        this.props.fetchComments({
            productCode,
            pageIndex:nextPage
        })
    }
    handleRefreshShowups(){
        const {pageIndex,totalPage} = this.props.goodById.good.showups
        const {showupFetching,productCode} = this.props.goodById.good
        let nextPage = pageIndex + 1
        if(showupFetching || totalPage <= pageIndex){
            return false;
        }
        this.props.fetchShowups({
            productCode,
            pageIndex:nextPage
        })
    }
    render(){
        const {commentsFetching,showupFetching,comments,showups} = this.props.goodById.good
        return (
            <div className="good-comment">
            <Header onGoBack={this.props.changeScene.bind(this,"index")}>商品评论</Header>
            <SlideTabs navbarSlidable={false}>
            <SlideTabsItem navigator={()=><span>全部评论</span>}>
            <GoTop relative={true}>
            {this.renderComments()}
            <Refresher active={commentsFetching} handleRefresh={this.handleRefreshComments.bind(this)} />
            {(comments.pageIndex == comments.totalPage) && comments.totalPage > 1?(
                <div className="no-more">已显示全部内容</div>
            ):null}
            </GoTop>
            </SlideTabsItem>
            <SlideTabsItem navigator={()=><span>晒单</span>}>
            <GoTop relative={true}>
            {this.renderShowups()}
            <Refresher active={showupFetching} handleRefresh={this.handleRefreshShowups.bind(this)} />
            {(showups.pageIndex == showups.totalPage) && showups.length > 1?(
                <div className="no-more">已显示全部内容</div>
            ):null}
            </GoTop>
            </SlideTabsItem>
            </SlideTabs>
            </div>
        )
    }
}

export default GoodComment;