'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";
import {SORT_NORMAL,SORT_PRICE_DESC,SORT_PRICE_ASC,SORT_SALES} from "./action.es6";

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
            popupClassifyActive:false,
            popupBrandActive:false,
            showNotEmpty:false,
            popupClassifyType:null,
            sortType:SORT_NORMAL
        }
    }
    componentDidMount(){
       
    }

    closeAllPopups(){
        this.setState({
            maskActive:false,
            popupActive:false,
            popupClassifyActive:false,
            popupBrandActive:false
        })
    }

    resetFilter(){
        this.setState({
            showNotEmpty:false 
        });
    }

    togglePopupActive(){
        this.setState({
            popupActive:!this.state.popupActive,
            maskActive:!this.state.popupActive
        });
    }

    togglePopupClassifyActive(){
        this.setState({
            popupClassifyActive:!this.state.popupClassifyActive
        });
    }

    toggleCanBuy(){
        this.setState({
            showNotEmpty:!this.state.showNotEmpty
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
        const {isFetching,pagination,isFetched,keywords} = this.props;
        var goods = [];
        if(isFetched === true){
            if(pagination.list.length > 0){
                pagination.list.forEach(function(item,i){
                    const key = "good-" + i;
                    //item.salePrice = item.salePrice.toFixed(2);
                    //item.standardPrice = item.standardPrice.toFixed(2);
                    goods.push(<GoodItem goods={item} key={key} />)
                })
            }
        }

        const classes=classNames({
            "rollOut-animate":true,
            "good-list-content":true,
            "rollOut-slideLeft":this.state.popupActive
        });

        return (
            <div>
                <div className={classes}>
                    <Header>
                        <span className="title">{keywords}</span>
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
                    handleFilter={this.togglePopupClassifyActive.bind(this)}
                    handleClose={this.togglePopupActive.bind(this)} />
                <FilterClassify 
                    type={this.state.popupClassifyType}
                    active={this.state.popupClassifyActive}
                    handleClose={this.togglePopupClassifyActive.bind(this)} />
                <GoTop />
                <Refresher active={isFetching} />
            </div>
        )
    }
}

 

export default GoodListApp;