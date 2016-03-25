'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";
import Refresher from "../../component/refresher.jsx";
import GoTop from "../../component/gotop.jsx";
import Header from "../common/header.jsx";
import GoodItem from "./partial/goodItem.jsx";
import fetchGoods from "./action.es6";

class Activity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            maskActive:false,
            shareActive:false,
            pageIndex:1
        }
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
        const {isFetching,totalPage,list,imageUrl,title} = this.props;
        const {pageIndex} = this.state;
        let goods = [];
        list.forEach(function(item,i){
            goods.push(<GoodItem goods={item} key={"good-"+i} />)
        });

        return (
            <div className="inner-scroll">
                <GoTop relative={true}>
                    <Header>
                        <span className="title">{title}</span>
                    </Header>
                    <div className="specialActivity">
                        <div className="banner">
                          <img src={imageUrl} alt="" />
                        </div>
                        <div className="specialActivity_list clearfix">
                            {goods}
                        </div>
                    </div>
                    <Refresher handleRefresh={this.beginRefresh.bind(this)} active={isFetching}/>
                    {pageIndex == totalPage?(<div className="no-more">已显示全部内容</div>):null} 
                </GoTop>
            </div>
        )
    }
}

 

export default Activity;