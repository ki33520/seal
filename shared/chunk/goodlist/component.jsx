'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";
import {
    SORT_NORMAL,SORT_PRICE_DESC,SORT_PRICE_ASC,SORT_SALES
} from "./action.es6";

import Refresher from "../../component/refresher.jsx";
import MaskLayer from "../../component/masklayer.jsx";
import GoTop from "../../component/gotop.jsx";
import Header from "../common/header.jsx";
import Filter from "./partial/filter.jsx";
import GoodItem from "./partial/goodItem.jsx";
import GoodSorter from "./partial/goodStore.jsx";
import FilterClassify from "./partial/filterClassify.jsx";
import FilterProduct from "./partial/filterProduct.jsx";
import FilterBrand from "./partial/filterBrand.jsx"

class GoodListApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            maskActive:false,
            popupActive:false,
            productActive:false,
            classifyActive:false,
            brandActive:false,
            showNotEmpty:false,
            sortType:SORT_NORMAL,
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

    resetFilter(){
        this.setState({
            showNotEmpty:false 
        });
    }

    togglePopupActive(){
        const popupActive = !this.state.popupActive;
        this.setState({
            popupActive:popupActive,
            maskActive:popupActive
        });
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
 

    toggleCanBuy(){
        this.setState({
            showNotEmpty:!this.state.showNotEmpty
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

    toggleSortActive(type){
        
        switch(type){
            case SORT_PRICE_DESC:
                var active = this.state.sortType;
                active = active==SORT_PRICE_DESC ? SORT_PRICE_ASC : SORT_PRICE_DESC
                this.setState({
                    sortType:active
                });
                break;
            case SORT_SALES:
                this.setState({
                    sortType:SORT_SALES
                });
                break;
            default:
                this.setState({
                    sortType:SORT_NORMAL
                });
                break;
        }
    }

    render(){
        const {isFetching,pagination} = this.props;
        var goods = [];

        if(pagination.goodsList.length > 0){
            pagination.goodsList.forEach(function(item,i){
                const key = "good-" + i;
                //item.salePrice = item.salePrice.toFixed(2);
                //item.standardPrice = item.standardPrice.toFixed(2);
                goods.push(<GoodItem goods={item} key={key} />)
            });
        }
    
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
                    <GoodSorter orderBy={this.toggleSortActive.bind(this)} sortType={this.state.sortType}/>
                    <div className="special-activity-list clearfix">
                        {goods}
                    </div>
                </div>
                <MaskLayer visible={this.state.maskActive} 
                    handleClick={this.closeAllPopups.bind(this)} />
                <Filter 
                    popupActive={this.state.popupActive}
                    showNotEmpty={this.state.showNotEmpty}
                    handleCanBuy={this.toggleCanBuy.bind(this)}
                    handleReset={this.resetFilter.bind(this)}
                    classifyFilter={this.togglePopupClassify.bind(this)}
                    productFilter={this.togglePopupProduct.bind(this)}
                    brandFilter={this.togglePopupBrandFilter.bind(this)}
                    handleClose={this.togglePopupActive.bind(this)} />
                <FilterClassify 
                    category={pagination.categoryNames}
                    active={this.state.classifyActive}
                    handleClose={this.togglePopupClassify.bind(this)} />
                <FilterBrand 
                    brands={pagination.brandNames}
                    active={this.state.brandActive}
                    handleClose={this.togglePopupBrandFilter.bind(this)} />
                <FilterProduct 
                    products={pagination.productNames}
                    active={this.state.productActive}
                    handleClose={this.togglePopupProduct.bind(this)} />
                <GoTop />
                <Refresher active={isFetching} />
            </div>
        )
    }
}

 

export default GoodListApp;