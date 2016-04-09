'use strict'

import React,{Component} from "react";
import Alert from "../../component/alert.jsx";
import Header from "../common/header.jsx";
import GoTop from "../../component/gotop.jsx";
import Refresher from "../../component/refresher.jsx";
import {jumpURL,urlPrefix} from "../../lib/jumpurl.es6";
import Floor from "./partial/floor.jsx";

class MembercollectList extends Component{
    beginRefresh(){
        const {dispatch,fetchCollect} = this.props;
        const {collect,isFetching} = this.props.memberCollectByUser;
        var pageCount = collect.pageCount;
        var pageIndex = collect.pageIndex;
        var nextPage = pageIndex + 1;
        if(pageCount < nextPage){
            return false;
        }
        if(isFetching === true){
            return false;
        }
        fetchCollect(jumpURL("collect"),{
            pageIndex:nextPage
        })
    }
    componentWillReceiveProps(nextProps){
        const {changeScene,fetchCollect} = this.props;
        const self = this;
        if(nextProps.memberCollectByUser.isToggling === false &&
           this.props.memberCollectByUser.isToggling === true){
            if(nextProps.memberCollectByUser.isToggled === true){
                fetchCollect(jumpURL("collect"),{
                    pageIndex:1
                })
            }
        }
    }
    handleDelete(child,e){
        e && e.preventDefault();
        e && e.preventDefault();
        const {toggleCollected} = this.props;
        toggleCollected(urlPrefix+"/togglecollected",{
            productCode:child.productCode,
            singleCode:child.singleCode,
            status: false
        });
    }
    handleScroll(scrollNode,scrollTop){
        if((scrollNode.offsetHeight + scrollTop + 30) >= scrollNode.scrollHeight){
            this.beginRefresh()
        }
    }
    render(){
        const {collect,isFetching,alertActive,alertContent} = this.props.memberCollectByUser;
        return (
            <div className="collect-content">
                <Header>
                    <span className="title">我的收藏</span>
                </Header>
                <GoTop relative={true} onScroll={this.handleScroll.bind(this)}>
                <Floor handleDelete={this.handleDelete.bind(this)} {...collect} {...this.props} />
                <Refresher active={isFetching} />
                <Alert active={alertActive}>{alertContent}</Alert>
                </GoTop>
            </div>
        );
    }
}

export default MembercollectList;