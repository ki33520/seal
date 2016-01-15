'use strict'

import React,{Component} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import classNames from "classnames";
import dom from "../../lib/dom.es6";
import {urlParam,base64Encode} from "../../lib/util.es6";
import Slider from "../../component/slider/slider.jsx";
import Slide from "../../component/slider/slide.jsx";
import PullHook from "../../component/pullhook.jsx";
import Alert from "../../component/alert.jsx";
import Header from "../common/header.jsx";
import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";

import Promotions from "./partial/promotions.jsx";
import Origin from "./partial/origin.jsx";
import Specification from "./partial/specification.jsx";
import Toolbar from "./partial/toolbar.jsx";

class GoodDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedAttr:null,
            buyed:1,
            selectedItem:props.goodById.good.selectedItem,
            upperVisble:true,
            downVisble:false
        }
    }
    componentDidMount(){
        const {fetchCartCount,fetchIsCollected} = this.props;
        const {selectedItem,attrs} = this.props.goodById.good
        _.each(selectedItem.attrs,(v,k)=>{
            let selectedAttr = _.findWhere(attrs,{attrName:k})
            let selectedAttrValue = _.findWhere(selectedAttr.attrValues,{
                value:v
            })
            this.handleAttrChange(selectedAttr,selectedAttrValue)
        }) 
        fetchCartCount()
        fetchIsCollected()
    }
    componentWillReceiveProps(nextProps){
        const nextSelectedItem = nextProps.goodById.good.selectedItem
        const {selectedItem} = this.props.goodById.good
        if(nextSelectedItem !== null){
            if(selectedItem !== null &&
                selectedItem.code === nextSelectedItem.code){
                return
            }
            this.props.fetchGood({
                id:nextSelectedItem.code
            })
        }
    }
    handleAttrChange(selectedAttr,selectedAttrValue,e){
        e && e.preventDefault();
        const {fetchGood,selectAttr} = this.props;
        if(selectedAttrValue.disabled){
            return;
        }
        // console.log('selectAttr',selectAttr)
        selectAttr(selectedAttr,selectedAttrValue)
    }
    handleBuyedChanged(buyed){
        const {good} = this.props.goodById
        if(good.stock === null){
            return false;
        }
        this.setState({
            buyed
        });
    }
    addToCart(e){
        e && e.preventDefault();
        const {alert,addCart} = this.props;
        let {good} = this.props.goodById
        const {selectedItem,buyed} = this.state;
        if(selectedItem === null){
            const unselectedProperties = _.filter(good.properties,(property)=>{
                return property.selectedValue === null;
            })
            var propertyNames = _.pluck(unselectedProperties,"propertyName");
            propertyNames = propertyNames.join(",");
            alert(`请选择${propertyNames}`,3000);
            return;
        }else if(buyed === 0){
            alert('购买数量必须大于0',3000);
            return;
        }else if(selectedItem !== null && buyed > 0){
            addCart({
                buyed:buyed,
                itemId:selectedItem.code
            });
        }
    }
    toggleCollected(e){
        e && e.preventDefault();
        const {toggleCollected} = this.props;
        const {good,isCollected} = this.props.goodById;
        toggleCollected({
            productCode:good.groupCode,
            singleCode:good.code,
            status:!isCollected
        });
    }
    directBuy(e){
        e && e.preventDefault();
        const {alert} = this.props
        const {good} = this.props.goodById;
        const {selectedItem,buyed} = this.state;
        if(selectedItem === null){
            const unselectedProperties = _.filter(good.properties,(property)=>{
                return property.selectedValue === null;
            })
            var propertyNames = _.pluck(unselectedProperties,"propertyName");
            propertyNames = propertyNames.join(",");
            alert(`请选择${propertyNames}`,3000);
            return;
        }else if(buyed === 0){
            alert('购买数量必须大于0',3000);
            return;
        }else if(selectedItem !== null && buyed > 0){
            let singleCode = selectedItem.code
            let queryParam = base64Encode(urlParam({
                itemIds:singleCode,
                buyeds:buyed
            }))
            window.location.assign(`/confirmorder/${queryParam}`)
        }
    }
    handlePullUp(e){
        e && e.preventDefault();
        this.setState({
            downVisble:true,
            upperVisble:false
        },()=>{
            // console.log('handlePullUp')
            dom.scrollTop(window,0);
            // this.refs["slidetabs"].initialize()
        })
    }
    handlePullDown(e){
        e && e.preventDefault();
        this.setState({
            downVisble:false,
            upperVisble:true
        })
    }
    render(){
        const {cartCount} = this.props;
        const {good,isCollected} = this.props.goodById
        const {selectedItem,buyed,selectedAttr} = this.state;

        const detail = good.detail.replace(/jpg_.webp/g,'jpg')
        var slides = good.slides.map((slide,i)=>{
            const key = "slide-" + i;
            return (
                <Slide key={key}>
                <a href="javascript:void(null)"><img src={slide} /></a>
                </Slide>
            );
        });

        const upperClasses = classNames("good-detail-upper","goods_top",{
            visible:this.state.upperVisble
        })
        const downClasses = classNames("good-detail-down",{
            visible:this.state.downVisble
        })
        const isCollectedClasses = classNames("iconfont",{
            "icon-xinman":isCollected,
            "icon-xin":!isCollected
        })
        return (
            <div className="good-detail-content">
            <Header>商品详情<a className="globa" href="javascript:void(0);"><i></i></a>
            <a className="goods_share"></a>
            </Header>
            <div className={upperClasses}>
                <Slider effect="roll" autoPlay={false} speed={200}>{slides}</Slider>
                <div className="title clearfix">
                    <span>{good.title}</span>
                    <a className="goods_fav" onClick={this.toggleCollected.bind(this)}>
                    <i className={isCollectedClasses}></i>收藏</a>
                </div>
                 <div className="price clearfix">
                    <span className="nowPrice">&yen;{good.salePrice}</span>
                    <span className="oldPrice">市场价&yen;{good.originPrice}</span>
                    <span className="countdown"><i className="iconfont icon-time"></i>距本期结束<em>04:34:10</em></span>
                </div>

                <div className="promotion clearfix">
                    <dl>
                        <dt>促销：</dt>
                        <dd><Promotions promotions={good.marketing}/></dd>
                    </dl>
                </div>
                 <a href="/goodcomment/1" className="goComment clearfix">
                    <div className="left"><i className="iconfont icon-comment"></i>用户评论<em>(29)</em></div>
                    <div className="right">查看更多评价<i className="iconfont icon-right"></i></div>
                </a>
                <Origin good={good}/>
                <div className="assure">
                    <img src="/client/asset/images/assure.gif" />
                </div>
                <PullHook 
                className="teyla" 
                oriention="BOTTOM_TO_TOP"
                onPullEnd={this.handlePullUp.bind(this)}
                >上拉显示商品详情</PullHook>
            </div>
            <Toolbar cartCount={cartCount} good={good} 
            selectedAttr={selectedAttr} buyed={buyed}
            handleAttrChange={this.handleAttrChange.bind(this)}
            handleBuyedChanged={this.handleBuyedChanged.bind(this)}
            directBuy={this.directBuy.bind(this)} 
            addToCart={this.addToCart.bind(this)}>
            </Toolbar>
            <div className={downClasses}>
                <PullHook 
                className="teyla" 
                oriention="TOP_TO_BOTTOM"
                onPullEnd={this.handlePullDown.bind(this)}
                >下拉返回详情顶部</PullHook>
                <SlideTabs axis="x" navbarSlidable={false} ref="slidetabs">
                <SlideTabsItem navigator={()=><span>图文详情</span>}>
                <div className="good-desc" dangerouslySetInnerHTML={{__html:good.detail}}></div>
                </SlideTabsItem>
                <SlideTabsItem navigator={()=><span>保税FAQ</span>}>
                <div className="faq">
                <img src="/client/asset/images/FAQshow.gif" />
                </div>
                </SlideTabsItem>
                </SlideTabs>
            </div>
            <Alert active={this.props.cartByUser.alertActive}>{this.props.cartByUser.alertContent}</Alert>
            </div>
        )
    }
}

export default GoodDetail;