'use strict'

import React,{Component} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import classNames from "classnames";
import dom from "../../../lib/dom.es6";
import {urlParam,base64Encode} from "../../../lib/util.es6";
import Slider from "../../../component/slider/slider.jsx";
import Slide from "../../../component/slider/slide.jsx";
import PullHook from "../../../component/pullhook.jsx";
import Alert from "../../../component/alert.jsx";
import Header from "../../common/header.jsx";
import Timer from "../../common/timer.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import MaskLayer from "../../../component/masklayer.jsx";

import Promotions from "./promotions.jsx";
import Origin from "./origin.jsx";
import Specification from "./specification.jsx";
import Toolbar from "./toolbar.jsx";

class GoodDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedAttr:null,
            buyed:1,
            selectedItem:props.goodById.good.selectedItem,
            popupActive:false,
            trigger:null,
            upperVisble:true,
            downVisble:false
        }
    }
    togglePopup(trigger,e){
        e && e.preventDefault();
        this.setState({
            trigger,
            popupActive:!this.state.popupActive
        })
    }
    componentDidMount(){
        const {fetchCartCount,fetchIsCollected,fetchComments} = this.props;
        const {selectedItem,attrs,code,productCode} = this.props.goodById.good
        _.each(selectedItem.attrs,(v,k)=>{
            let selectedAttr = _.findWhere(attrs,{attrName:k})
            let selectedAttrValue = _.findWhere(selectedAttr.attrValues,{
                value:v
            })
            this.handleAttrChange(selectedAttr,selectedAttrValue)
        }) 
        fetchCartCount()
        fetchIsCollected({
            singleCode:code
        })
        fetchComments({
            productCode,
        })

        dom.bindEvent(window,"scroll",(e)=>{
            var scrollTop = dom.scrollTop(window);
            if (document.documentElement.clientHeight + scrollTop >= document.documentElement.scrollHeight) {
                if(this.state.upperVisble){
                    setTimeout(()=>{
                        this.setState({
                            downVisble:true
                        })
                    },1200)
                }
            }
        })
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
            this.togglePopup("addToCart")
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
            productCode:good.productCode,
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
    renderCountdown(){
        const {good} = this.props.goodById;
        if(good.flashbuy['active']){
            return (
                <span className="countdown">
                <i className="iconfont icon-time"></i>距本期结束<em><Timer endTime={good.flashbuy['endTime']}/></em>
                </span>
            )
        }
        return null
    }
    render(){
        const {cartCount} = this.props.cartByUser;
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
            <Header>商品详情<a className="globa" href="/"><i></i></a>
            <a className="goods_share"></a>
            </Header>
            <div className={upperClasses}>
                {good.slides.length > 0?(
                <Slider effect="roll" autoPlay={false} speed={200}>{slides}</Slider>
                ):null}
                <div className="title clearfix">
                    <span>{good.title}</span>
                    <a className="goods_fav" onClick={this.toggleCollected.bind(this)}>
                    <i className={isCollectedClasses}></i>收藏</a>
                </div>
                 <div className="price clearfix">
                    <span className="nowPrice">&yen;{good.salePrice}</span>
                    <span className="oldPrice">市场价&yen;{good.originPrice}</span>
                    {this.renderCountdown()}
                </div>
                <Promotions promotions={good.marketing}/>
                 <a onClick={this.props.changeScene.bind(this,"comment",{productCode:good.productCode})} 
                 href="javascript:void(null)" className="goComment clearfix">
                    <div className="left">
                    <i className="iconfont icon-comment"></i>用户评论<em>({good.comments?good.comments.totalCount:0})</em></div>
                    <div className="right">查看更多评价<i className="iconfont icon-right"></i></div>
                </a>
                <Origin good={good}/>
                <div className="assure">
                    <img src="/client/asset/images/assure.gif" />
                </div>
                {this.state.downVisble?null:<div className="teyla">上拉显示商品详情</div>}
            </div>
            <Toolbar cartCount={cartCount} good={good} 
            popupActive={this.state.popupActive} trigger={this.state.trigger} togglePopup={this.togglePopup.bind(this)} 
            selectedAttr={selectedAttr} buyed={buyed}
            handleAttrChange={this.handleAttrChange.bind(this)}
            handleBuyedChanged={this.handleBuyedChanged.bind(this)}
            directBuy={this.directBuy.bind(this)} 
            addToCart={this.addToCart.bind(this)}>
            </Toolbar>
            <div className={downClasses}>
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
            <MaskLayer visible={this.state.popupActive} />
            </div>
        )
    }
}

export default GoodDetail;