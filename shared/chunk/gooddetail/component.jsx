'use strict'

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import dom from "../../lib/dom.es6";
import {apiRequest} from "../../lib/util.es6";
import Slider from "../../component/slider/slider.jsx";
import Slide from "../../component/slider/slide.jsx";
import NumberPicker from "../../component/numberpicker.jsx";
import PullHook from "../../component/pullhook.jsx";
import Alert from "../../component/alert.jsx";
import Header from "../common/header.jsx";
import Popup from "../../component/popup.jsx";

import Promotions from "./partial/promotions.jsx";
import Properties from "./partial/properties.jsx";
import Specification from "./partial/specification.jsx";
import Toolbar from "./partial/toolbar.jsx";
import {addCart,addFavorite} from "./action.es6";
import {alert} from "../common/action.es6";
import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";

class GoodDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            good:props.goodById.good,
            selectedProperty:null,
            buyed:0,
            selectedItem:null,
            upperVisble:true,
            downVisble:false,
            popupActive:false
        }
    }
    onPropertyChange(selectedProperty,selectedPropertyValue,e){
        e && e.preventDefault();
        if(selectedProperty.disabled){
            return;
        }
        var good = this.state.good;
        const items = good.items;
        var properties = good.properties;
        properties = properties.map((v,k)=>{
            if(v.propertyName === selectedProperty.propertyName){
                v.selectedValue = selectedPropertyValue;
            }else if(k !== 0){
                v.selectedValue = null;
            }
            return v;
        });


        var matchedItems = toggleUnselectedPropertyStatus(properties);

        _.each(properties,(property,k)=>{
            if(property.selectedValue !== null)return;
            const propertyName = property.propertyName;
            var propertyValues = property.propertyValues;
            _.map(propertyValues,(v)=>{
                const value = v.value;
                const itemFoundPredicate = {
                    props:{
                        [propertyName]:value
                    }
                };
                const itemFound = _.findWhere(matchedItems,itemFoundPredicate);
                v.disabled = false;
                if(itemFound === undefined){
                    // console.log("%s:%s stock not found",propertyName,value)
                    v.disabled = true;
                }else if(itemFound.remainingStock === 0){
                    v.disabled = true;
                    // console.log("%s:%s stock is 0",propertyName,value)
                }
                return v;
            });
            properties[k].propertyValues = propertyValues;
        })
        good.properties = properties;

        const notFullFilled = _.some(properties,{selectedValue:null});
        var selectedItem = this.state.selectedItem;
        if(matchedItems.length === 1 && notFullFilled === false){
            good = this.reloadPriceAndStock(matchedItems,good);
            selectedItem = matchedItems[0];
        }else{
            selectedItem = null
        }

        this.setState({
            selectedProperty,
            selectedItem,
            good
        })
        function toggleUnselectedPropertyStatus(properties){
            const unselectedProperties = _.filter(properties,(property)=>{
                return property.selectedValue === null;
            })
            const selectedProperties = _.filter(properties,(property)=>{
                return property.selectedValue !== null;
            })
            var itemPredicate = {props:{}};
            _.each(selectedProperties,(property)=>{
                const propertyName = property.propertyName;
                const propertyValue = property.selectedValue.value;
                itemPredicate.props[propertyName] = propertyValue;
            })
            matchedItems = _.where(items,itemPredicate);

            return matchedItems;
        }
    }
    reloadPriceAndStock(matchedItems,good){
        const item = matchedItems[0];
        good.salePrice = item.salesPrice;
        good.originalPrice = item.standardPrice;
        const discount = (item.salesPrice / item.standardPrice * 10).toFixed(1)
        good.discount = discount === "10.0" ? "" : `${discount}折`;
        good.stock = item.remainingStock > 0 ? item.remainingStock : 0;
        good.buyed = item.remainingStock > 0 ? 1 : 0;
        // console.log('reloadPriceAndStock');
        return good;
    }
    handleBuyedChanged(buyed){
        if(this.state.good.stock === null){
            return false;
        }
        this.setState({
            buyed
        });
    }
    addToCart(e){
        e && e.preventDefault();
        this.togglePopup();
        return;
        const {selectedItem,buyed,good} = this.state;
        const {dispatch} = this.props;
        if(selectedItem === null){
            const unselectedProperties = _.filter(good.properties,(property)=>{
                return property.selectedValue === null;
            })
            var propertyNames = _.pluck(unselectedProperties,"propertyName");
            propertyNames = propertyNames.join(",");
            dispatch(alert(`请选择${propertyNames}`,3000));
            return;
        }else if(buyed === 0){
            dispatch(alert('购买数量必须大于0',3000));
            return;
        }else if(selectedItem !== null && buyed > 0){
            dispatch(addCart("/addcart",{
                qty:buyed,
                itemId:selectedItem.id
            }));
        }
    }
    togglePopup(e){
        e && e.preventDefault();
        this.setState({
            popupActive:!this.state.popupActive
        })
    }
    toggleFavorite(e){
        e && e.preventDefault();
        const {good,dispatch} = this.props;
        dispatch(addFavorite("/addfavorite",{
            id:good.id
        }));
    }
    directBuy(e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        const {selectedItem,buyed,good} = this.state;
        if(selectedItem === null){
            const unselectedProperties = _.filter(good.properties,(property)=>{
                return property.selectedValue === null;
            })
            var propertyNames = _.pluck(unselectedProperties,"propertyName");
            propertyNames = propertyNames.join(",");
            dispatch(alert(`请选择${propertyNames}`,3000));
            return;
        }else if(buyed === 0){
            dispatch(alert('购买数量必须大于0',3000));
            return;
        }else if(selectedItem !== null && buyed > 0){
            const directBuyForm = React.findDOMNode(this.refs.directBuyForm);
            directBuyForm.submit();
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
        const {good,selectedItem,buyed} = this.state;

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
        return (
            <div className="good-detail-content">
            <Header>商品详情<a className="globa" href="javascript:void(0);"><i></i></a></Header>
            <div className={upperClasses}>
                <Slider effect="roll" autoPlay={true} speed={200}>{slides}</Slider>
                <div className="title clearfix">
                    <span>{good.title}</span>
                    <a className="goods_share">
                        <i className="iconfont icon-share"></i>
                        分享
                    </a>
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
                    <div className="left">
                        <i className="iconfont icon-comment"></i>
                        用户评论
                      <em>(29)</em>
                    </div>
                    <div className="right">
                        查看更多评价
                        <i className="iconfont icon-right"></i>
                    </div>
                </a>

                <div className="overView">
                    <dl>
                      <dt>原产地：</dt>
                      <dd><i><img src="/client/asset/images/ico_flag.png" alt="" /></i>荷兰</dd>
                    </dl>
                    <dl>
                      <dt>发货仓：</dt>
                      <dd>{good.warehouse}</dd>
                    </dl>
                    <dl>
                      <dt>关税：</dt>
                      <dd>
                            <a href="#" className="tariff">
                                <span>税费=不含税商品单价*件数*商品税率</span>
                                <span>（根据海关规定，若订单税费≤50，海关予以免征）</span>
                                <i className="iconfont icon-right"></i>
                            </a>
                        </dd>
                    </dl>
                    <div className="smallLine"></div> 
                    <dl>
                      <dt>税费：</dt>
                      <dd>10% <a href="#" className="iconfont icon-ask"></a></dd>
                    </dl>
                    <dl>
                      <dt>运费：</dt>
                      <dd>包邮</dd>
                    </dl>   
                </div>
                <div className="assure">
                    <img src="/client/asset/images/assure.gif" />
                </div>
                <PullHook 
                className="teyla" 
                oriention="BOTTOM_TO_TOP"
                onPullEnd={this.handlePullUp.bind(this)}
                >上拉显示商品详情</PullHook>
            </div>
            <Toolbar {...this.props} 
            directBuy={this.directBuy.bind(this)} 
            toggleFavorite={this.toggleFavorite.bind(this)} 
            addToCart={this.addToCart.bind(this)}>
            </Toolbar>
            <Popup direction="bottom" active={this.state.popupActive}>
                <div className="con">
                    <div className="goodsSure">
                        <img src={good.mainImageUrl} alt="" />
                        <div className="left">
                            <span>&yen;169.20</span>
                            <em>库存<i>9</i>件</em>
                        </div>
                        <i className="iconfont icon-close-circled" onClick={this.togglePopup.bind(this)}></i>
                    </div>
                    <Properties properties={good.properties}
                    stock={good.stock}
                    selectedProperty={this.state.selectedProperty}
                    onPropertyChange={this.onPropertyChange.bind(this)} />
                    <div className="pro clearfix">
                        <div className="pro-name">
                            <span>购买数量</span>
                            <em>（限购2件）</em>
                        </div>
                        <div className="good-buyed">
                        <NumberPicker value={this.state.buyed} onChange={this.handleBuyedChanged.bind(this)}/>
                        </div>
                    </div>
                    <a href="javascript:void(0);" className="goodsSureBtn">立即购买</a>
                </div>
            </Popup>
            <form action="/confirmorder" method="GET" ref="directBuyForm">
                <input type="hidden" value={selectedItem !== null?selectedItem.id:""} name="itemIds"/>
                <input type="hidden" value={buyed} name="buyeds"/>
            </form>
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
            </div>
        )
    }
}

export default GoodDetail;