'use strict'

import React,{Component} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import classNames from "classnames";
import dom from "../../../lib/dom.es6";
import {urlParam,base64Encode,formatPrice,disableHistoryForwardCacheThen} from "../../../lib/util.es6";
import Slider from "../../../component/slider/slider.jsx";
import Slide from "../../../component/slider/slide.jsx";
import PullHook from "../../../component/pullhook.jsx";
import Alert from "../../../component/alert.jsx";
import Header from "../../common/header.jsx";
import Timer from "../../common/timer.jsx";
import Share from "../../common/share.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import MaskLayer from "../../../component/masklayer.jsx";
import GoTop from "../../../component/gotop.jsx";
import Sticky from "../../../component/sticky.jsx";

import Promotions from "./promotions.jsx";
import Origin from "./origin.jsx";
import Specification from "./specification.jsx";
import Toolbar from "./toolbar.jsx";

class GoodDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            buyed:props.goodById.good.buyed,
            popupActive:false,
            shareActive:false,
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
    toggleShare(){
        this.setState({
            shareActive:!this.state.shareActive
        })
    }
    componentDidMount(){
        const {fetchCartCount,fetchIsCollected,fetchComments} = this.props;
        const {selectedItem,attrs,code,productCode} = this.props.goodById.good
        _.each(selectedItem.attrs,(v,k)=>{
            // let selectedAttr = _.findWhere(attrs,{attrName:k})
            let selectedAttrValue = _.findWhere(attrs[k],{
                value:v
            })
            this.handleAttrToggle(k,selectedAttrValue)
        }) 
        fetchCartCount()
        fetchIsCollected({
            singleCode:code
        })
        fetchComments({
            productCode:productCode
        })
    }
    handleScroll(scrollNode){
        const scrollTop = dom.scrollTop(scrollNode)
        // console.log('scrollTop',scrollTop,scrollNode)
        if (scrollNode.clientHeight + scrollTop + 10 >= scrollNode.scrollHeight) {
            if(this.state.upperVisble){
                setTimeout(()=>{
                    this.setState({
                        downVisble:true
                    })
                },1200)
            }
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.goodById.attrToggled){
            if(nextProps.goodById.good.selectedItem === null){
                return
            }
            if(this.props.goodById.good.selectedItem === null || 
                nextProps.goodById.good.selectedItem.code !== this.props.goodById.good.selectedItem.code){
                this.setState({
                    buyed:nextProps.goodById.good.buyed
                })
            }
        }
    }
    componentDidUpdate(prevProps){
        const {selectedItem} = this.props.goodById.good
        const prevSelectedItem = prevProps.goodById.good.selectedItem
        if(this.props.goodById.attrToggled){
            if(selectedItem === null){
                return
            }
            if(prevSelectedItem === null || selectedItem.code !== prevSelectedItem.code){
                    if(this.props.goodById.goodFetching !== true){
                        this.props.fetchGood({
                            id:selectedItem.code
                        })
                        this.props.fetchIsCollected({
                            singleCode:selectedItem.code
                        })
                    }
            }
        }
    }
    handleAttrToggle(selectedAttrName,selectedAttrValue,e){
        e && e.preventDefault()
        if(selectedAttrValue.disabled){
            return;
        }
        this.props.toggleAttr(selectedAttrName,selectedAttrValue)
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
        if(good.stock === 0){
            return
        }
        const {buyed} = this.state;
        if(good.selectedItem === null){
            const attrName = _.findKey(good.attrs,(attr)=>{
                return _.some(attr,{selected:true}) === false
                // return property.selectedValue === null;
            })
            alert(`请选择${attrName}`,3000);
            return;
        }else if(buyed === 0){
            alert('购买数量必须大于0',3000);
            return;
        }else if(good.selectedItem !== null && buyed > 0){
            this.togglePopup("addToCart")
            if(good.flashbuy['active']){
                let singleCode = good.selectedItem.code
                let queryParam = base64Encode(urlParam({
                    itemIds:singleCode,
                    buyeds:buyed
                }))
                window.location.assign(`/confirmorder/${queryParam}`)
            }else{
                addCart({
                    buyed:buyed,
                    buylimit:good.buyLimit,
                    singlecode:good.selectedItem.code
                });
            }
        }
    }
    toggleCollected(e){
        e && e.preventDefault();
        const {toggleCollected} = this.props;
        const {good,isCollected,isAuthorized,loginUrl} = this.props.goodById;
        if(!isAuthorized){
            window.location.assign(loginUrl)
            return
        }
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
        if(good.stock === 0){
            return
        }
        const {buyed} = this.state;
        if(good.selectedItem === null){
            const attrName = _.findKey(good.attrs,(attr)=>{
                return _.some(attr,{selected:true}) === false
                // return property.selectedValue === null;
            })
            alert(`请选择${attrName}`,3000);
            return;
        }else if(buyed === 0){
            alert('购买数量必须大于0',3000);
            return;
        }else if(good.selectedItem !== null && buyed > 0){
            let singleCode = good.selectedItem.code
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
                <i className="iconfont icon-time"></i>距本期结束<em><Timer endTime={good.flashbuy['endTime']} dayEnable={true} 
                template="<i><%= day %></i>天<i><%= hour %></i>时<i><%= minute %></i>分<i><%= second %></i>秒"/></em>
                </span>
            )
        }
        return null
    }
    renderPrice(){
        const {good} = this.props.goodById;
        let salePrice = good.salePrice
        if(good.flashbuy["active"]){
            salePrice = good.flashbuy["price"]
        }
        if(good["useMobilePrice"] && !good.flashbuy["active"]){
            salePrice = good["mobilePrice"]
            return (
                <span>
                <span className="nowPrice">&yen;{formatPrice(salePrice)}</span>
                <span className="exclusive">手机专享价</span>
                </span>
            )
        }
        return <span className="nowPrice">&yen;{formatPrice(salePrice)}</span>
    }
    render(){
        const {cartCount} = this.props.cartByUser;
        const {good,isCollected} = this.props.goodById
        const {buyed} = this.state;
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
            <GoTop relative={true} onScroll={this.handleScroll.bind(this)}>
            <div className="good-detail-content">
            <Header>商品详情<a className="globa" href="/"><i></i></a>
            <a className="goods_share" onClick={this.toggleShare.bind(this)}></a>
            </Header>
            <div className={upperClasses}>
                {good.slides.length > 0?(
                <Slider effect="roll" autoPlay={false} loop={true} speed={200}>{slides}</Slider>
                ):null}
                <div className="title clearfix">
                    <span>{good.title}</span>
                    <a className="goods_fav" onClick={this.toggleCollected.bind(this)}>
                    <i className={isCollectedClasses}></i>收藏</a>
                </div>
                 <div className="price clearfix">
                    {this.renderPrice()}
                    <span className="oldPrice">市场价&yen;{formatPrice(good.originPrice)}</span>
                    {this.renderCountdown()}
                </div>
                <Promotions promotions={good.promotions}/>
                 <a onClick={this.props.changeScene.bind(this,"comment",{productCode:good.productCode})} 
                 href="javascript:void(null)" className="goComment clearfix">
                    <div className="left">
                    <i className="iconfont icon-comment"></i>用户评论<em>({good.comments?good.comments.totalCount:0})</em></div>
                    <div className="right">查看更多评价<i className="iconfont icon-right"></i></div>
                </a>
                <Origin good={good} {...this.props}/>
                <div className="assure">
                    <img src="/client/asset/images/assure.gif" />
                </div>
                {this.state.downVisble?null:<div className="teyla">上拉显示商品详情</div>}
            </div>
            <Toolbar cartCount={cartCount} good={good} 
            popupActive={this.state.popupActive} trigger={this.state.trigger} togglePopup={this.togglePopup.bind(this)} 
            buyed={buyed}
            handleAttrToggle={this.handleAttrToggle.bind(this)}
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
            <Share active={this.state.shareActive} onClose={this.toggleShare.bind(this)}>
            <div className="center"><img src={good.sharedQRCode} /></div>
            <div className="bottom">邀请小伙伴扫一扫<br />分享给TA</div>
            </Share>
            </div>
            </GoTop>
        )
    }
}

export default GoodDetail;