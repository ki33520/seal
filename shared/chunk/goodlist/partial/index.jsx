'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../../lib/util.es6";
import {fetchGoods,changeParam,changeClassItem,resetAll} from "../action.es6";
import MaskLayer from "../../../component/masklayer.jsx";
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
            areaActive:false,
            classActive:false,
            brandActive:false,
            searchParamsActive:false
        }
    }

    handleReset(){
        const {dispatch,searchParams,filters} = this.props;
        const {categoryNames,brandNames,areaNames} = filters;

        let categories = [];
        let brands = [];
        let areas = [];
        let params = Object.assign({},searchParams);

        params.isHaveGoods = false;


        categoryNames.forEach((item,i)=>{
            item.isChecked = false;
            categories.push(item);
        });

        brandNames.forEach((item,i)=>{
            item.isChecked = false;
            brands.push(item);
        });

        areaNames.forEach((item,i)=>{
            item.isChecked = false;
            areas.push(item);
        })

        dispatch(resetAll({
            searchParams:params,
            filters:{
                categoryNames:categories,
                brandNames:brands,
                areaNames:areas
            }
        }));
    }

    toggleCanBuy(isHaveGoods){
        const {dispatch,searchParams} = this.props;
        const param = Object.assign({},searchParams,{isHaveGoods});
        dispatch(changeParam(param));
    }

    togglePopupActive(){
        const popupActive = !this.state.popupActive;
        this.setState({
            popupActive:popupActive,
            maskActive:popupActive
        });
    }
    
    toggleClassActive(){
        this.setState({
            classActive:!this.state.classActive
        });
    }

    toggleBrandActive(){
        this.setState({
            brandActive:!this.state.brandActive
        });
    }

    toggleAreaActive(){
        this.setState({
            areaActive:!this.state.areaActive
        });
    }
 
    toggleCheckedClass(values){
        const {dispatch,filters} = this.props;
        let newFilters = Object.assign({},filters,{
            categoryNames:values
        });
        dispatch(changeClassItem(newFilters))
    }

    toggleCheckedBrand(values){
        const {dispatch,filters} = this.props;
        let newFilters = Object.assign({},filters,{
            brandNames:values
        });
        dispatch(changeClassItem(newFilters))
    }

    toggleCheckedArea(values){
        const {dispatch,filters} = this.props;
        let newFilters = Object.assign({},filters,{
            areaNames:values
        });
        dispatch(changeClassItem(newFilters))
    }

    handlerSave(){
        const {dispatch,filters,searchParams} = this.props;
        const {categoryNames,brandNames,areaNames} = filters;

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
            searchParams.categoryNames = categories.join(',');
        }else{
            searchParams.categoryNames = null;
        }

        if(areas.length){
            searchParams.areaNames=areas.join(',');
        }else{
            searchParams.areaNames=null;
        }

        if(brands.length){
            searchParams.brandNames=brands.join(',');
        }else{
            searchParams.brandNames=null;
        }
 
        dispatch(fetchGoods(searchParams));

        this.togglePopupActive();
    }

    toggleSortByParam(sortParam){
        const {dispatch,searchParams} = this.props;
        let newParams = Object.assign({},searchParams,sortParam);
        dispatch(fetchGoods(newParams))
    }

    render(){
        const {searchParams,filters,goods,isFetching} = this.props;
        const searchKey = searchParams.k;
        const {categoryNames,brandNames,areaNames} = filters;
        const goodList = [];
 
        if(goods.length<1){
            return (
                <div className="empty noPadTop">
                    <Header>
                        <span className="title">{searchKey}</span>
                    </Header>
                    <img src="/client/asset/images/empty_search.png" />
                    <div className="tips">抱歉，没有找到与“{searchKey}”相关的商品，<br/>您可以换个词再试试~！</div>
                </div>
            )
        }

        goods.forEach(function(item,i){
            let key = 'good-'+i;
            goodList.push(<GoodItem goods={item} key={key} />)
        });
 
        const classes=classNames({
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
                <div className={classes}>
                    <Header>
                        <div className={searchBox}>
                            <input type="search" defaultValue={searchKey} 
                            onClick={this.props.changeScene.bind(this,"search")}/>
                            <span></span>
                        </div>
                        <div className="btn-right" onClick={this.togglePopupActive.bind(this)}>筛选</div>
                    </Header>
                    <GoodSorter
                        params = {searchParams}
                        toggleSort={this.toggleSortByParam.bind(this)} />
                    <div className="special-activity-list clearfix">
                        {goodList}
                    </div>
                </div>

                <Sidebar
                    isHaveGoods={searchParams.isHaveGoods}
                    popupActive={this.state.popupActive}
                    toggleCanBuy={this.toggleCanBuy.bind(this)}
                    toggleClass = {this.toggleClassActive.bind(this)}
                    toggleBrand = {this.toggleBrandActive.bind(this)}
                    toggleArea= {this.toggleAreaActive.bind(this)}
                    handleReset = {this.handleReset.bind(this)}
                    save ={this.handlerSave.bind(this)} />
                <Filter 
                    list={categoryNames}
                    active={this.state.classActive}
                    toggleChecked={this.toggleCheckedClass.bind(this)}
                    handleGoBack ={this.toggleClassActive.bind(this)} />
                <Filter 
                    list={brandNames}
                    active={this.state.brandActive}
                    toggleChecked={this.toggleCheckedBrand.bind(this)}
                    handleGoBack ={this.toggleBrandActive.bind(this)} />
                <Filter 
                    list={areaNames}
                    active={this.state.areaActive}
                    toggleChecked={this.toggleCheckedArea.bind(this)}
                    handleGoBack ={this.toggleAreaActive.bind(this)} />
                <MaskLayer visible={this.state.maskActive} />
                 
            </div>
        )
    }
}

 

export default GoodListApp;