'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import Refresher from "../../component/refresher.jsx";
import GoTop from "../../component/gotop.jsx";
import Header from "../common/header.jsx";
import GoodItem from "./partial/goodItem.jsx";
import fetchGoods from "./action.es6";

import {shareInWeixin} from "../../lib/weixin.es6";

class Activity extends Component{
    constructor(props){
        super(props);
        this.state = {
            maskActive:false,
            shareActive:false,
            pageIndex:1
        }
    }
    componentDidMount(){
        const {weixinConfig,activityName} = this.props
        shareInWeixin({
            ...this.props.weixinConfig,
            title:`${activityName}—友阿海外购`,
            desc:"我在友阿海外购挑选商品，一起来看看吧。",
            link:location.href,
            imgUrl:`${location.origin}/client/asset/images/app.png`
        })
    }
    beginRefresh(){
        const {dispatch,totalPage,isFetching} = this.props;
        const {pageIndex} = this.state;
        const nextPage = pageIndex + 1;

        if(isFetching || totalPage <= pageIndex){
            return false;
        }

        this.setState({
            pageIndex:nextPage
        });

        dispatch(fetchGoods(window.location.href,{
            pageIndex:nextPage
        }));
    }
    handleScroll(scrollNode,scrollTop){
        if((scrollNode.offsetHeight + scrollTop + 30) >= scrollNode.scrollHeight){
            this.beginRefresh()
        }
    }
    handleShare(){
        this.setState({
            shareActive:true,
            maskActive:true
        });
    }
    cancelShare(){
        this.setState({
            shareActive:false,
            maskActive:false
        });
    }
    render(){
        const {isFetching,totalPage,activityList,imageUrl,activityName} = this.props;
        const {pageIndex} = this.state;
        let goods = [];
        activityList.forEach(function(item,i){
            goods.push(<GoodItem goods={item} key={"good-"+i} />)
        });

        return (
            <div className="inner-scroll">
                <GoTop relative={true} onScroll={this.handleScroll.bind(this)}>
                    <Header>
                        <span className="title">{activityName}</span>
                    </Header>
                    <div className="specialActivity">
                        <div className="banner">
                          <img src={imageUrl} alt="" />
                        </div>
                        <div className="specialActivity_list clearfix">
                            {goods}
                        </div>
                    </div>
                    <Refresher active={isFetching}/>
                    {pageIndex == totalPage?(<div className="no-more">已显示全部内容</div>):null} 
                </GoTop>
            </div>
        )
    }
}

 

export default Activity;