'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";
import fetchGoods from "./action.es6";
import Refresher from "../../component/refresher.jsx";
import MaskLayer from "../../component/masklayer.jsx";
import GoTop from "../../component/gotop.jsx";
import Header from "../common/header.jsx";
import Sidebar from "./partial/sidebar.jsx";
import GoodItem from "./partial/goodItem.jsx";
import GoodSorter from "./partial/goodStore.jsx";
import Filter from "./partial/filter.jsx";

class GoodListApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            maskActive:false,
            popupActive:false,
            productActive:false,
            filterActive:false,
            brandActive:false,
            searchActive:false 
        }
    }

    handleGoBack(){
        location.href='/';
    }

    handChange(){
        
    }

    closeAllPopups(){
        this.setState({
            maskActive:false,
            popupActive:false,
            filterActive:false,
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

    togglePopupClassify(names){
        let requestParam = {
            searchKey : this.props.searchKey
        }
        if(names && names.length){
            requestParam = Object.assign(requestParam,{
                categoryName:names.join(',')
            })
        }
        this.setState({
            filterActive:!this.state.filterActive,
            requestParam
        });
    }

    togglePopupProduct(names){
        let requestParam = {
            searchKey : this.props.searchKey
        }
        if(names && names.length){
            requestParam = Object.assign(requestParam,{
                sourceAreas:names.join(',')
            })
        }
        this.setState({
            productActive:!this.state.productActive,
            requestParam
        });
    }
    
    togglePopupBrandFilter(names){
        let requestParam = {
            searchKey : this.props.searchKey
        }
        if(names && names.length){
            requestParam = Object.assign(requestParam,{
                brandName:names.join(',')
            })
        }
        this.setState({
            brandActive:!this.state.brandActive,
            requestParam
        });
    }

    toggleSortActive(param){
        const {dispatch,searchKey} = this.props;
        let requestParam = {
            searchKey : this.props.searchKey
        }
        param = Object.assign(requestParam,param);
        this.setState({
            requestParam
        },()=>{
            dispatch(fetchGoods('/goodlist',param));
        });
    }

    render(){
        const {goodsList,areaNames,brandNames,categorys,searchKey,isFetching} = this.props;
        var goods = [];
 
        if(!goodsList.length){
            return (
                <div className="empty noPadTop">
                    <Header handleGoBack={this.handleGoBack}>
                        <span className="title">{searchKey}</span>
                    </Header>
                    <img src="/client/asset/images/empty_search.png" />
                    <div className="tips">抱歉，没有找到与“{searchKey}”相关的商品，<br/>您可以换个词再试试~！</div>
                </div>
            )
        }

       
        goodsList.forEach(function(item,i){
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
                    <Header handleGoBack={this.handleGoBack}>
                        <div className={searchBox}>
                            <input type="search" value={searchKey} onChange={this.handChange}/>
                            <span></span>
                            <i className={closebtn}></i>
                        </div>
                        <span className="btn-right" onClick={this.togglePopupActive.bind(this)}>筛选</span>
                    </Header>
                    <GoodSorter toggleSort={this.toggleSortActive.bind(this)} />
                    <div className="special-activity-list clearfix">
                        {goods}
                    </div>
                </div>

                <Sidebar 
                    popupActive={this.state.popupActive}
                    handleCanBuy={this.toggleSortActive.bind(this)}
                    filter={this.handleChangeFilter.bind(this)}
                    handleClose={this.togglePopupActive.bind(this)} />
                <Filter 
                    names={categorys}
                    active={this.state.filterActive}
                    handleClose={this.togglePopupClassify.bind(this)} />
                <Filter 
                    names={brandNames}
                    active={this.state.brandActive}
                    handleClose={this.togglePopupBrandFilter.bind(this)} />
                <Filter 
                    names={areaNames}
                    active={this.state.productActive}
                    handleClose={this.togglePopupProduct.bind(this)} />
                <GoTop />
                <MaskLayer visible={this.state.maskActive} />
                <Refresher active={isFetching} />
            </div>
        )
    }
}

 

export default GoodListApp;