'use strict'

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import dom from "../../lib/dom.es6";
import {apiRequest} from "../../lib/util.es6";
import Slider from "../../component/slider/slider.jsx";
import Slide from "../../component/slider/slide.jsx";
import NumberPicker from "../../component/numberpicker/numberpicker.jsx";
import PullHook from "../../component/pullhook/pullhook.jsx";
import Alert from "../../component/alert/alert.jsx";
import Header from "../common/header/header.jsx";

import Promotions from "./partial/promotions.jsx";
import Properties from "./partial/properties.jsx";
import Toolbar from "./partial/toolbar.jsx";
import {addCart,addFavorite} from "./action.es6";
import {alert} from "../common/action.es6";

class GoodDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            good:props.goodById.good,
            selectedProperty:null,
            buyed:0,
            selectedItem:null,
            upperVisble:true,
            downVisble:false
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
            dom.scrollTop(window,0);
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

        const upperClasses = classNames("good-detail-upper",{
            visible:this.state.upperVisble
        })
        const downClasses = classNames("good-detail-down",{
            visible:this.state.downVisble
        })
        return (
            <div className="good-detail-content">
            <Header title="商品详情"/>
            <div className={upperClasses}>
                <Slider effect="roll" autoPlay={true} speed={200}>{slides}</Slider>
                <div className="good-title">{good.title}</div>
                <div className="good-prices">
                    <div className="sale-price">{good.salePrice}</div>
                    <div className="original-price">
                    <div className="price-tag">专柜价:<b>{good.originalPrice}</b><em>{good.discount}</em>
                    </div>
                    <div className="store-tag">门店:<b>{good.mallName}</b></div>
                    </div>
                </div>
                <div className="divider-title">
                    <span>促销</span>
                </div>
                <Promotions promotions={good.marketing}/>
                <Properties properties={good.properties}
                stock={good.stock}
                selectedProperty={this.state.selectedProperty}
                onPropertyChange={this.onPropertyChange.bind(this)} />
                <div className="divider-title">
                    <span>数量</span>
                </div>
                <div className="good-buyed">
                <NumberPicker value={this.state.buyed} onChange={this.handleBuyedChanged.bind(this)}/>
                </div>
                <PullHook 
                className="pull-trigger" 
                oriention="BOTTOM_TO_TOP"
                onPullEnd={this.handlePullUp.bind(this)}
                >上拉显示商品详情</PullHook>
            </div>
            <Toolbar {...this.props} 
            directBuy={this.directBuy.bind(this)} 
            toggleFavorite={this.toggleFavorite.bind(this)} 
            addToCart={this.addToCart.bind(this)}>
            </Toolbar>
            <form action="/confirmorder" method="GET" ref="directBuyForm">
                <input type="hidden" value={selectedItem !== null?selectedItem.id:""} name="itemIds"/>
                <input type="hidden" value={buyed} name="buyeds"/>
            </form>
            <div className={downClasses}>
                <PullHook 
                className="pull-trigger" 
                oriention="TOP_TO_BOTTOM"
                onPullEnd={this.handlePullDown.bind(this)}
                >下拉返回详情顶部</PullHook>
                <div className="good-specification">
                    <div className="divider-title">
                        <span>规格参数</span>
                    </div>
                    <div className="specification-content">{null}</div>
                </div>
                <div className="divider-title">
                    <span>商品图片</span>
                </div>
                <div className="good-desc" dangerouslySetInnerHTML={{__html:good.detail}}></div>
            </div>
            </div>
        )
    }
}

export default GoodDetail;