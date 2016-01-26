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
import fetchCollect from "./action.es6";
import {alert} from "../common/action.es6";

class MembercollectList extends Component{
    componentDidMount(){
        dom.registerPullDownEvent(()=>{
            this.beginRefresh();
        }.bind(this));
    }
    beginRefresh(){
        const {dispatch} = this.props;
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
        dispatch(fetchCollect(window.location.href,{
            pageIndex:nextPage
        }))
    }
    render(){
        const {collect,isFetching} = this.props.memberCollectByUser;
        return (
            <div className="collect-content">
                <Header>
                    <span className="title">我的收藏</span>
                </Header>
                <Floor {...collect} {...this.props} />
                <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)} />
                <GoTop relative={true}/>
            </div>
        );
    }
}

export default MembercollectList;