'use strict'

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import dom from "../../lib/dom.es6";
import util,{apiRequest} from "../../lib/util.es6";
import Alert from "../../component/alert.jsx";
import Header from "../common/header.jsx";
import GoTop from "../../component/gotop.jsx";
import Refresher from "../../component/refresher.jsx";

import Floor from "./partial/floor.jsx";
import {alert} from "../common/action.es6";

class MembercollectList extends Component{
    componentDidMount(){
        dom.registerPullDownEvent(()=>{
            this.beginRefresh();
        }.bind(this));
    }
    beginRefresh(){
        const {dispatch,fetchCollect} = this.props;
        const {collect,isFetching} = this.props.memberCollectByUser;
        var pageCount = collect.pageCount;
        var pageIndex = collect.pageIndex;
        var nextPage = pageIndex + 1;
        if(pageCount < nextPage){
            // this.setState({isFetching:false});
            return false;
        }
        if(isFetching === true){
            return false;
        }
        fetchCollect("/membercenter/collect",{
            pageIndex:nextPage
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.memberCollectByUser.isToggling === false &&
           this.props.memberCollectByUser.isToggling === true){
            if(nextProps.memberCollectByUser.isToggled === true){
                this.beginRefresh();
            }
        }
    }
    handleDelete(child,e){
        e && e.preventDefault();
        e && e.preventDefault();
        const {toggleCollected} = this.props;
        toggleCollected({
            productCode:child.productCode,
            singleCode:child.singleCode,
            status: false
        });
    }
    render(){
        const {collect,isFetching,alertActive,alertContent} = this.props.memberCollectByUser;
        return (
            <div className="collect-content">
                <Header>
                    <span className="title">我的收藏</span>
                </Header>
                <Floor handleDelete={this.handleDelete.bind(this)} {...collect} {...this.props} />
                <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)} />
                <Alert active={alertActive}>{alertContent}</Alert>
                <GoTop relative={false}/>
            </div>
        );
    }
}

export default MembercollectList;