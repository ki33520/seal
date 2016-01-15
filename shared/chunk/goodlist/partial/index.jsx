'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../../lib/util.es6";
import fetchGoods from "../action.es6";
import Refresher from "../../../component/refresher.jsx";
import MaskLayer from "../../../component/masklayer.jsx";
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
            productActive:false,
            filterActive:false,
            brandActive:false,
            searchActive:false,
            param:{
                keyword:props.keyword,
                page:props.page
            }
        }
    }

    handClick(){
        window.location.href="#/search";
    }

    componentDidMount(){
        util.registerPullDownEvent(()=>{
            this.beginRefresh();
        }.bind(this));
    }

    beginRefresh(){
         
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
        const {dispatch} = this.props;
        const {param} = this.state;

        if(names && names.length){
            let orderParam = _.extend(param,{
                categoryName:names.join(',')
            });
            this.setState({
                filterActive:!this.state.filterActive,
                param:orderParam
            });

            dispatch(fetchGoods(orderParam));
        }else{
            this.setState({
                filterActive:!this.state.filterActive
            });
        }
    }

    togglePopupProduct(names){
        const {dispatch} = this.props;
        const {param} = this.state;

        if(names && names.length){
            let orderParam = _.extend(param,{
                sourceAreas:names.join(',')
            });
            this.setState({
                productActive:!this.state.productActive,
                param:orderParam
            });

            dispatch(fetchGoods(orderParam));
        }else{
            this.setState({
                productActive:!this.state.productActive
            });
        }
    }
    
    togglePopupBrandFilter(names){
        const {dispatch} = this.props;
        const {param} = this.state;

        if(names && names.length){
            let orderParam = _.extend(param,{
                brandName:names.join(',')
            });
            this.setState({
                brandActive:!this.state.brandActive,
                param:orderParam
            });

            dispatch(fetchGoods(orderParam));
        }else{
            this.setState({
                brandActive:!this.state.brandActive
            });
        }
        
    }

    toggleSortActive(orderParam){
        const {dispatch} = this.props;
        const {param} = this.state;
        orderParam = _.extend(param,orderParam);
        this.setState({
            param:orderParam
        });
        dispatch(fetchGoods(orderParam));
    }

    render(){
        const {goods,sideBar,keyword,isFetching} = this.props;
        
        if(goods.length===0){
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
                    <GoodSorter toggleSort={this.toggleSortActive.bind(this)} />
                    <div className="special-activity-list clearfix">
                        {goodList}
                    </div>
                </div>

                <Sidebar 
                    popupActive={this.state.popupActive}
                    handleCanBuy={this.toggleSortActive.bind(this)}
                    filter={this.handleChangeFilter.bind(this)}
                    handleClose={this.togglePopupActive.bind(this)} />
                <Filter 
                    names={sideBar.categorys}
                    active={this.state.filterActive}
                    handleClose={this.togglePopupClassify.bind(this)} />
                <Filter 
                    names={sideBar.brandNames}
                    active={this.state.brandActive}
                    handleClose={this.togglePopupBrandFilter.bind(this)} />
                <Filter 
                    names={sideBar.areaNames}
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