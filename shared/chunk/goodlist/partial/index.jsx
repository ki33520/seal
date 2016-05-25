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
            filterType:null
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
    resetValue(target){
        var values = [];
        _.forEach(target,(item)=>{
            let _item = _.assign({},item,{
                isChecked:false
            })
            values.push(_item);
        });
        return values;
    }
    handleReset(param){
        const {categoryNames,brandNames,areaNames} = this.props.index;
        param.categoryNames = this.resetValue(categoryNames);
        param.brandNames = this.resetValue(brandNames);
        param.areaNames = this.resetValue(areaNames);
        param.pageIndex = 1;
        this.props.resetFilter(param);
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
    fetchParams(param){
        const {viewType,sortType,isHaveGoods,categoryNames,brandNames,areaNames} = this.props.index;
        const categoryName = this.filterValue(categoryNames);
        const brandName = this.filterValue(brandNames);
        const areaName = this.filterValue(areaNames);

        if(viewType !== undefined){
            param.viewType = viewType;
        }
        if(isHaveGoods !== undefined){
            param.isHaveGoods = isHaveGoods;
        }
        if(sortType !== undefined){
            param.sortType = sortType;
        }
        if(brandName !== undefined){
            param.brandName = brandName;
        }
        if(categoryName !== undefined){
            param.categoryName = categoryName;
        }
        if(areaName !== undefined){
            param.areaName = areaName;
        }
        return param;
    }
    handlerSave(){
        const url = window.location.href;
        var param = this.fetchParams({pageIndex:1});
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
        var param = this.fetchParams({pageIndex:pageIndex+1});
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
    render(){
        const {
            totalPage,categoryNames,brandNames,areaNames,goodsList,
            keyword,pageIndex,sortType,viewType,isHaveGoods,isFetching
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
                        popupActive={this.state.popupActive}
                        toggleFilter={this.toggleFilterPopup.bind(this)}
                        handleReset={this.handleReset.bind(this)}
                        handlerSave={this.handlerSave.bind(this)}
                        isHaveGoods={isHaveGoods}
                        {...this.props} />
                    <Filter 
                        list={categoryNames}
                        active={this.state.filterType==='category'}
                        toggleChecked={this.toggleChecked.bind(this,'categoryNames')}
                        handleGoBack ={this.toggleFilterPopup.bind(this)} />
                    <Filter 
                        list={brandNames}
                        active={this.state.filterType==='brand'}
                        toggleChecked={this.toggleChecked.bind(this,'brandNames')}
                        handleGoBack ={this.toggleFilterPopup.bind(this)} />
                    <Filter 
                        list={areaNames}
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
