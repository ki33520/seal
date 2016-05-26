'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import MaskLayer from "../../../component/masklayer.jsx";
import Refresher from "../../../component/refresher.jsx";
import GoTop from "../../../component/gotop.jsx";
import Header from "../../common/header.jsx";
import _ from "../../../lib/lodash.es6";
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
            filterActive:null
        }
    }
    filterValue(target){
        var values = [];
        _.forEach(target,(item)=>{
            if(item.isChecked){
                values.push(item.name);
            }
        });
        return values.length ? values.join(','):undefined;
    }
    handleReset(){
        const {filter} = this.props.index;
        this.props.resetFilter({
            filter,
            isHaveGoods:false,
            pageIndex:1
        });
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
            filterActive:type
        });
    }
    toggleChecked(filterIndex,itemIndex){
        const {filter} = this.props.index;
        this.props.toggleChecked({filter,filterIndex,itemIndex});
    }
    fetchParams(param){
        const {viewType,sortType,isHaveGoods,filter} = this.props.index;
        _.forEach(filter,(item)=>{
            let type = item.type;
            let values = this.filterValue(item.list);
            if(values){
                param[type] = values;
            }
        });
        if(viewType !== undefined){
            param.viewType = viewType;
        }
        if(isHaveGoods !== undefined){
            param.isHaveGoods = isHaveGoods;
        }
        if(sortType !== undefined){
            param.sortType = sortType;
        }
        return param;
    }
    handlerSave(){
        const url = window.location.href;
        const param = this.fetchParams({pageIndex:1});
        this.props.fetchGoods(url,param);
        this.togglePopupActive();
    }
    toggleSort(param){
        if(this.props.index.isFetching){
            return;
        }
        const url = window.location.href;
        this.props.toggleSort(param);
        this.props.fetchGoods(url,param);
    }
    beginRefresh(){
        const {pageIndex,totalPage,isFetching} = this.props.index;
        const url = window.location.href;
        if(isFetching || totalPage <= pageIndex){
            return false;
        }
        const param = this.fetchParams({
            pageIndex:pageIndex+1
        });
        this.props.fetchGoods(url,param);
    }
    handleScroll(scrollNode,scrollTop){
        if((scrollNode.offsetHeight + scrollTop + 30) >= scrollNode.scrollHeight){
            this.beginRefresh()
        }
    }
    notFound(keyword){
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
    renderFilter(){
        const {filter} = this.props.index;
        const active = this.state.filterActive;
        var filterList = [];
        return _.map(filter,(obj,i)=>{
            return (
                <Filter list={obj.list} active={active===i} key={i}
                toggleChecked={this.toggleChecked.bind(this,i)}
                handleGoBack ={this.toggleFilterPopup.bind(this)} />
            );
        });
    }
    render(){
        const {
            totalPage,goodsList,keyword,pageIndex,sortType,viewType,isHaveGoods,filter,isFetching
        } = this.props.index;
 
        if(goodsList.length===0){
            return this.notFound(keyword);
        }
        const goodsItems = _.map(goodsList,(item,i)=>{
            return (<GoodItem goods={item} key={'good-'+i} />);
        });
        const popup=classNames({
            "rollOut-animate":true,
            "good-list-content":true,
            "rollOut-slideLeft":this.state.popupActive
        });
        return (
            <div className="list-container">
                <GoTop relative={true} onScroll={this.handleScroll.bind(this)}>
                    <div className={popup}>
                        <Header>
                            <div className="search-box">
                                <input type="search" defaultValue={keyword} 
                                onClick={this.props.changeScene.bind(this,"search")}/>
                                <span></span>
                            </div>
                            <div className="filter-btn btn-right" onClick={this.togglePopupActive.bind(this)}>筛选</div>
                        </Header>
                        <GoodSorter sortType={sortType} viewType={viewType} toggleSort={this.toggleSort.bind(this)} />
                        <div className="special-activity-list clearfix">
                            {goodsItems}
                        </div>
                    </div>
                    <Sidebar
                        popupActive={this.state.popupActive} isHaveGoods={isHaveGoods} filter={filter}
                        toggleFilter={this.toggleFilterPopup.bind(this)}
                        handleReset={this.handleReset.bind(this)} handlerSave={this.handlerSave.bind(this)}
                        {...this.props} />
                    {this.renderFilter()}
                    <MaskLayer visible={this.state.maskActive} />
                    <Refresher active={isFetching}/>
                    {pageIndex == totalPage?(<div className="no-more">已显示全部内容</div>):null} 
                 </GoTop>
            </div>
        )
    }
}

export default GoodListApp;
