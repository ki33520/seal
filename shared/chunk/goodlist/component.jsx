'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";
import fetchGoods from "./action.es6";
import Refresher from "../../component/refresher.jsx";
import MaskLayer from "../../component/masklayer.jsx";
import GoTop from "../../component/gotop.jsx";
import Header from "../common/header.jsx";
import Filter from "./partial/filter.jsx";
import GoodItem from "./partial/goodItem.jsx";
import GoodSorter from "./partial/goodStore.jsx";
import FilterClassify from "./partial/filterClassify.jsx";

class GoodListApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            maskActive:false,
            popupActive:false,
            productActive:false,
            classifyActive:false,
            brandActive:false,
            needClear:false,
            isFocused:false,
            keywords:props.keywords
        }
    }

    closeAllPopups(){
        this.setState({
            maskActive:false,
            popupActive:false,
            classifyActive:false,
            brandActive:false,
            productActive:false,
        });
    }

    togglePopupActive(){
        const popupActive = !this.state.popupActive;
        this.setState({
            popupActive:popupActive,
            maskActive:popupActive
        });
    }
    handleChangeFilter(type){
        switch(type){
            case 'classfiy':
                this.togglePopupClassify();
                break;
            case 'brand':
                this.togglePopupBrandFilter();
                break;
            case 'product':
                this.togglePopupProduct();
                break;
            default:
                break;
        }
    }
    togglePopupClassify(){
        this.setState({
            classifyActive:!this.state.classifyActive
        });
    }

    togglePopupProduct(){
        this.setState({
            productActive:!this.state.productActive
        });
    }
    
    togglePopupBrandFilter(){
        this.setState({
            brandActive:!this.state.brandActive
        });
    }
 

    handleChange(e){
        e.preventDefault();
        const keywords = e.target.value;
        if(keywords !== this.state.keywords){
            this.setState({
                keywords:keywords
            });
        }

        if(keywords.length>0){
            this.setState({
                needClear:true
            });
        }
    }

    handleBlur(){
        this.setState({
            needClear:false,
            isFocused:false
        });
    }

    handleFocus(e){
        var needClear = this.state.keywords.length > 0 ? true : false
        e.preventDefault();
        this.setState({
            needClear:needClear,
            isFocused:true
        });
    }

    handleClearInput(e){
        e.preventDefault();
        this.setState({
            keywords:'',
            isFocused:true
        });
    }

    toggleSortActive(param){
        const {dispatch} = this.props;
        const keywords = this.state.keywords;
        const url = '/goodlist/'+keywords;
        dispatch(fetchGoods(url,param));
    }

    render(){
        const {isFetching,pagination,keywords} = this.props;
        var goods = [];

        if(!pagination.goodsList.length){
            return (
                <div className="empty noPadTop">
                    <Header>
                        <span className="title">{keywords}</span>
                    </Header>
                    <img src="/client/asset/images/empty_search.png" />
                    <div className="tips">抱歉，没有找到与“{keywords}”相关的商品，<br/>您可以换个词再试试~！</div>
                </div>
            )
        }

       
        pagination.goodsList.forEach(function(item,i){
            const key = "good-" + i;
            goods.push(<GoodItem goods={item} key={key} />)
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
            <div>
                <div className={classes}>
                    <Header>
                        <div className={searchBox}>
                            <input type="search" value={this.state.keywords} 
                            onChange={this.handleChange.bind(this)}
                            onBlur={this.handleBlur.bind(this)}
                            onFocus={this.handleFocus.bind(this)} />
                            <span></span>
                            <i className={closebtn} onClick={this.handleClearInput.bind(this)}></i>
                        </div>
                        <span className="btn-right" onClick={this.togglePopupActive.bind(this)}>筛选</span>
                    </Header>
                    <GoodSorter orderBy={this.toggleSortActive.bind(this)} />
                    <div className="special-activity-list clearfix">
                        {goods}
                    </div>
                </div>
                <MaskLayer visible={this.state.maskActive} 
                    handleClick={this.closeAllPopups.bind(this)} />
                <Filter 
                    popupActive={this.state.popupActive}
                    handleCanBuy={this.toggleSortActive.bind(this)}
                    filter={this.handleChangeFilter.bind(this)}
                    handleClose={this.togglePopupActive.bind(this)} />
                <FilterClassify 
                    category={pagination.categoryNames}
                    active={this.state.classifyActive}
                    handleClose={this.togglePopupClassify.bind(this)} />
                <FilterClassify 
                    category={pagination.brandNames}
                    active={this.state.brandActive}
                    handleClose={this.togglePopupBrandFilter.bind(this)} />
                <FilterClassify 
                    category={pagination.productNames}
                    active={this.state.productActive}
                    handleClose={this.togglePopupProduct.bind(this)} />
                <GoTop />
                <Refresher active={isFetching} />
            </div>
        )
    }
}

 

export default GoodListApp;