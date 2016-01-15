'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../../lib/util.es6";
import {fetchGoods,toggleCanBuy} from "../action.es6";
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
            searchActive:false
        }
    }

    handClick(){
        window.location.href="#/search";
    }

    handleReset(){
        const {dispatch,pageIndex,params} = this.props;
        let newParam = {
            keyword:params.keyword,
            pageIndex:pageIndex
        }
        dispatch(fetchGoods(newParam));
    }

    toggleCanBuy(){
        const {dispatch,params} = this.props;
        params.isHaveGoods = !params.isHaveGoods;
        dispatch(toggleCanBuy(params));
    }

    togglePopupActive(){
        const popupActive = !this.state.popupActive;
        this.setState({
            popupActive:popupActive,
            maskActive:popupActive
        });
    }
 

    togglePopupCategory(){
        const {classActive} = this.state;
        this.setState({
            classActive:!classActive
        })
    }

    togglePopupArea(){
        const {areaActive} = this.state;
        this.setState({
            areaActive:!areaActive
        })
    }
    
    togglePopupBrand(){
        const {brandActive} = this.state;
         this.setState({
            brandActive:!brandActive
        })
    }

    toggleSortByParam(param){
        const {dispatch} = this.props;
        dispatch(fetchGoods(param));
    }

    changeParam(orderParam){
        const {param} = this.state;
        const newParam = _.extend(param,orderParam);
        this.setState({
            param:newParam
        });
    }

    toggleCategory(values){
        this.changeParam({
            categoryNames:values
        })
    }

    toggleBrandName(values){
        this.changeParam({
            brandNames:values
        })
    }

    toggleAreaName(values){
        this.changeParam({
            areaNames:values
        })
    }

    handlerSave(){
        //const {dispatch,params} = this.props;
        //dispatch(fetchGoods(params));
        this.togglePopupActive();
    }

    render(){
        const {goods,params,isFetching,sideBar} = this.props;
        const {areaNames,brandNames,categoryNames}=sideBar;
        let keyword = params.keyword;
       
        if(goods.length<1){
            return (
                <div className="empty noPadTop">
                    <Header>
                        <span className="title">{keyword}</span>
                    </Header>
                    <img src="/client/asset/images/empty_search.png" />
                    <div className="tips">抱歉，没有找到与“{keyword}”相关的商品，<br/>您可以换个词再试试~！</div>
                </div>
            )
        }

        let goodList = [];
       
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
                            <input type="search" defaultValue={keyword} onClick={this.handClick}/>
                            <span></span>
                        </div>
                        <div className="btn-right" onClick={this.togglePopupActive.bind(this)}>筛选</div>
                    </Header>
                    <GoodSorter 
                        handleSort={this.toggleSortByParam.bind(this)}
                        params={params} />
                    <div className="special-activity-list clearfix">
                        {goodList}
                    </div>
                </div>

                <Sidebar 
                    params={params}
                    popupActive={this.state.popupActive}
                    toggleCanBuy={this.toggleCanBuy.bind(this)}
                    popupClass = {this.togglePopupCategory.bind(this)}
                    popupArea = {this.togglePopupArea.bind(this)}
                    popupBrand = {this.togglePopupBrand.bind(this)}
                    handleReset = {this.handleReset.bind(this)}
                    save ={this.handlerSave.bind(this)} />
                <Filter 
                    names={categoryNames}
                    active={this.state.classActive}
                    changeParam={this.toggleCategory.bind(this)}
                    closePanel ={this.togglePopupCategory.bind(this)} />
                <Filter 
                    names={brandNames}
                    active={this.state.brandActive}
                    changeParam={this.toggleBrandName.bind(this)}
                    closePanel ={this.togglePopupBrand.bind(this)} />
                <Filter 
                    names={areaNames}
                    active={this.state.areaActive}
                    changeParam={this.toggleAreaName.bind(this)}
                    closePanel ={this.togglePopupArea.bind(this)} />
              
                <MaskLayer visible={this.state.maskActive} />
                 
            </div>
        )
    }
}

 

export default GoodListApp;