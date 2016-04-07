'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import MaskLayer from "../../../component/masklayer.jsx";
import Refresher from "../../../component/refresher.jsx";
import GoTop from "../../../component/gotop.jsx";
import Header from "../../common/header.jsx";
import Sidebar from "./sidebar.jsx";
import GoodItem from "./goodItem.jsx";
import GoodSorter from "./goodStore.jsx";
import Filter from "./filter.jsx";

class GoodListApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            maskActive:false,
            popupActive:false,
            filterType:null
        }
    }
    handleReset(){
        this.props.resetFilter();
    }
    togglePopupActive(){
        const popupActive = !this.state.popupActive;
        this.setState({
            popupActive:popupActive,
            maskActive:popupActive
        });
    }
    toggleFilterPopup(type){
        this.setState({
            filterType:type
        });
    }
    toggleChecked(name,values){
        this.props.toggleChecked({name,values});
    }
    handlerSave(isHaveGoods){
        const {params,filters} = this.props.index;
        const {categoryNames,brandNames,areaNames} = filters;
        let _params = Object.assign({},params,{
            isHaveGoods
        });
        let categories = [];
        let brands = [];
        let areas = [];
        categoryNames.forEach((item,i)=>{
            item.isChecked && categories.push(item.name);
        });
        brandNames.forEach((item,i)=>{
            item.isChecked && brands.push(item.name);
        });
        areaNames.forEach((item,i)=>{
            item.isChecked && areas.push(item.name);
        });
        if(categories.length){
            _params.categoryName = categories.join(',');
        }
        if(areas.length){
            _params.areaName=areas.join(',');
        }
        if(brands.length){
            _params.brandName=brands.join(',');
        }
        this.props.fetchGoods(_params);
        this.togglePopupActive();
    }
    toggleSort(order){
        const {params} = this.props.index;
        const _params = Object.assign({},params,order,{pageIndex:1});
        this.props.fetchGoods(_params);
    }
    beginRefresh(){
        const {params,totalPage,isFetching} = this.props.index;
        const curentPage = params.pageIndex;
        if(isFetching || totalPage <= curentPage){
            return false;
        }
        const _params = Object.assign({},params,{
            pageIndex : curentPage + 1
        });
        this.props.requestGoods(_params);
    }
    handleScroll(scrollNode,scrollTop){
        if((scrollNode.offsetHeight + scrollTop + 30) >= scrollNode.scrollHeight){
            this.beginRefresh()
        }
    }
    render(){
        const {keyword,totalPage,filters,list,params,isFetching} = this.props.index;
        const pageIndex = params.pageIndex;
        const goodList = [];
        if(list.length===0){
            return (
                <div className="empty noPadTop">
                    <Header>
                        <span className="title">{keyword}</span>
                    </Header>
                    <img src="/client/asset/images/empty_search.png" />
                    <div className="tips">抱歉，没有找到与“{keyword}”相关的商品，<br/>您可以换个词再试试~！</div>
                </div>
            );
        }
        list.forEach(function(item,i){
            goodList.push(<GoodItem goods={item} key={'good-'+i} />)
        });
        const popup=classNames({
            "rollOut-animate":true,
            "good-list-content":true,
            "rollOut-slideLeft":this.state.popupActive
        });
        const closebtn = classNames({
            "iconfont":true,
            "icon-close":this.state.needClear
        });
        const searchBox = classNames("search-box",{
            "search-foucs" : this.state.isFocused
        });
        return (
            <div className="list-container">
                <GoTop relative={true} onScroll={this.handleScroll.bind(this)}>
                    <div className={popup}>
                        <Header>
                            <div className={searchBox}>
                                <input type="search" defaultValue={keyword} 
                                onClick={this.props.changeScene.bind(this,"search")}/>
                                <span></span>
                            </div>
                            <div className="btn-right" onClick={this.togglePopupActive.bind(this)}>筛选</div>
                        </Header>
                        <GoodSorter toggleSort={this.toggleSort.bind(this)} />
                        <div className="special-activity-list clearfix">
                            {goodList}
                        </div>
                    </div>
                    <Sidebar
                        popupActive={this.state.popupActive}
                        toggleFilter={this.toggleFilterPopup.bind(this)}
                        handleReset={this.handleReset.bind(this)}
                        handlerSave={this.handlerSave.bind(this)} />
                    <Filter 
                        list={filters.categoryNames}
                        active={this.state.filterType==='category'}
                        toggleChecked={this.toggleChecked.bind(this,'categoryNames')}
                        handleGoBack ={this.toggleFilterPopup.bind(this)} />
                    <Filter 
                        list={filters.brandNames}
                        active={this.state.filterType==='brand'}
                        toggleChecked={this.toggleChecked.bind(this,'brandNames')}
                        handleGoBack ={this.toggleFilterPopup.bind(this)} />
                    <Filter 
                        list={filters.areaNames}
                        active={this.state.filterType==='area'}
                        toggleChecked={this.toggleChecked.bind(this,'areaNames')}
                        handleGoBack ={this.toggleFilterPopup.bind(this)} />
                    <MaskLayer visible={this.state.maskActive} />
                    <Refresher active={isFetching}/>
                     {pageIndex == totalPage?(<div className="no-more">已显示全部内容</div>):null} 
                 </GoTop>
            </div>
        )
    }
}

 

export default GoodListApp;