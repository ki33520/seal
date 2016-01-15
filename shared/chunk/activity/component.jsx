'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";

import Refresher from "../../component/refresher.jsx";
import GoTop from "../../component/gotop.jsx";
import Icon from "../../component/icon.jsx";
import Header from "../common/header.jsx";
import GoodItem from "./partial/goodItem.jsx";
import ShareBox from "./partial/shareBox.jsx";
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
    componentDidMount(){
        util.registerPullDownEvent(()=>{
            this.beginRefresh();
        }.bind(this));
    }

    beginRefresh(){
        const {dispatch,totalPage,isFetching} = this.props;
        let {pageIndex} = this.state;
        let nextPage = pageIndex + 1;

        if(isFetching || totalPage < pageIndex){
            return false;
        }

        this.setState({
            pageIndex:nextPage
        })

        dispatch(fetchGoods(window.location.href,{
            pageIndex:nextPage
        }));
    }

    handleShare(){
        this.setState({
            shareActive:true,
            maskActive:true
        })
    }

    cancelShare(){
        this.setState({
            shareActive:false,
            maskActive:false
        })
    }
  

    render(){
        const {isFetching,list,imageUrl,title} = this.props;
        let goods = [];
 
        list.forEach(function(item,i){
            goods.push(<GoodItem goods={item} key={"good-"+i} />)
        });

        return (
            <div>
                <Header>
                    <span className="title">{title}</span>
                    <div className="btn-right" onClick={this.handleShare.bind(this)}>
                        <Icon icon="share"/>
                    </div>
                </Header>
                 
                <div className="specialActivity">
                    <div className="banner">
                      <img src={imageUrl} alt="" />
                    </div>
                    <div className="specialActivity_list clearfix">
                        {goods}
                    </div>
                </div>
                <ShareBox visible={this.state.shareActive} cancelShare={this.cancelShare.bind(this)} />
                <Refresher active={isFetching}/>
                <GoTop />
            </div>
        )
    }
}

 

export default Activity;