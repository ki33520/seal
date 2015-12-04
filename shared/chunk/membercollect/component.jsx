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

import Node from "./partial/node.jsx";
import fetchCollect from "./action.es6";
import {alert} from "../common/action.es6";

class MembercollectList extends Component{
    constructor(props){
        super(props);
        const {collect,isFetching,isFetched} = props;
        this.state = {
            collect,
            isFetching,
            isFetched
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
        console.log(pageCount,nextPage);
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
        //console.log(this.props)
        const {collect} = this.props;
        var tpl = (
            <div className="collect-content">
                <Header>
                    <span className="title">我的收藏</span>
                    <span className="btn-right">+</span>
                </Header>
                <Node {...collect} />
                <GoTop />
                <Refresher />
            </div>
        );
        return tpl;
    }
}

export default MembercollectList;