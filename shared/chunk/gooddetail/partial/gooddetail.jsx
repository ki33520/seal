'use strict'

import React,{Component} from "react";
import ReactDOM from "react-dom";
import _ from "../../../lib/lodash.es6";
import classNames from "classnames";
import dom from "../../../lib/dom.es6";
import {urlParam} from "../../../lib/http.es6";
import {base64Encode,formatPrice,destPriceForGoods} from "../../../lib/helper.es6"
// import Slider from "../../../component/slider/slider.jsx";
// import Slide from "../../../component/slider/slide.jsx";
import {Slides,Slide} from "../../../component/slides.jsx";
import Alert from "../../../component/alert.jsx";
import Header from "../../common/header.jsx";
import Timer from "../../common/timer.jsx";
import Share from "../../common/share.jsx";
import ActivityIndicator from "../../common/activityindicator.jsx";
import {Swiper,SwiperItem} from "../../../component/swiper.jsx";
import {Tabs,TabsItem} from "../../../component/tabs.jsx";
import MaskLayer from "../../../component/masklayer.jsx";
import GoTop from "../../../component/gotop.jsx";
import Popup from "../../../component/popup.jsx";
import NumberPicker from "../../../component/numberpicker.jsx";
import {jumpURL} from "../../../lib/jumpurl.es6";
import {shareInWeixin} from "../../../lib/weixin.es6";

import Promotions from "./promotions.jsx";
import Origin from "./origin.jsx";
import Specification from "./specification.jsx";
import Toolbar from "./toolbar.jsx";
import Attributes from "./attributes.jsx";

class GoodDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            buyed:props.goodById.good.buyed,
            scrollable:true,
            popupActive:false,
            shareActive:false,
            trigger:null,
            upperVisble:true,
            downVisble:false
        }
        this.smooth = false
    }
    togglePopup(trigger,e){
        e && e.preventDefault();
        this.setState({
            trigger,
            popupActive:!this.state.popupActive,
            scrollable:this.state.popupActive
        })
    }
    toggleShare(){
        this.setState({
            shareActive:!this.state.shareActive,
            scrollable:this.state.shareActive
        })
    }
    componentDidMount(){
        const {fetchCartCount,fetchIsCollected,fetchComments,fetchShowups} = this.props;
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
        // fetchComments({productCode})

        const {weixinConfig,good} = this.props.goodById
        shareInWeixin({
            ...weixinConfig,
            title:`${good.title}—友阿海外购`,
            desc:'我在友阿海外购发现了一个不错的商品，一起来看看吧。',
            imgUrl:good.mainImageUrl,
            link:location.href
        })
    }
    handleScroll(scrollNode,scrollTop){
        if(this.smooth){
            if(scrollNode.clientHeight + scrollTop - 10 >= scrollNode.children[0].clientHeight){
                if(this.state.upperVisble){
                    setTimeout(()=>{
                        this.setState({
                            downVisble:true
                        })
                    },10)
                }
            }
        }else{
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
    handleBuyedOverflow(buyed){
        const {good} = this.props.goodById
        const salePrice = destPriceForGoods(good).destPrice
        if(salePrice * buyed > 2000){
            this.props.alert("您已超过海关限额￥2000，请分次购买",1000)
        }
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
            if(good.flashbuy['active'] || !good["canAddCart"]){
                let singleCode = good.selectedItem.code
                let queryParam = base64Encode(urlParam({
                    itemIds:singleCode,
                    buyeds:buyed
                }))
                window.location.assign(jumpURL("confirmorder",[queryParam]))
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
            window.location.assign(jumpURL("confirmorder",[queryParam]))
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
        let salePrice = destPriceForGoods(good).destPrice
        if(good["useMobilePrice"] && !good.flashbuy["active"]){
            // salePrice = good["mobilePrice"]
            return (
                <span className="mobilePrice">
                <span className="nowPrice">&yen;{formatPrice(salePrice)}</span>
                <span className="exclusive">手机专享价</span>
                </span>
            )
        }
        return <span className="nowPrice">&yen;{formatPrice(salePrice)}</span>
    }
    renderToolbar(){
        const {cartCount} = this.props.cartByUser;
        const {good} = this.props.goodById
        const {buyed} = this.state;
        return <Toolbar cartCount={cartCount} good={good} 
            togglePopup={this.togglePopup.bind(this)} 
            directBuy={this.directBuy.bind(this)} 
            addToCart={this.addToCart.bind(this)}>
            </Toolbar>
    }
    renderAttrPopUp(){
        const {good} = this.props.goodById
        const {popupActive,buyed,trigger} = this.state
        let buylimit = good.buyLimit > good.stock ? good.stock:good.buyLimit

        /*2000 price amount limit*/
        const destPrice = destPriceForGoods(good).destPrice
        buylimit = buylimit > Math.floor(2000 / destPrice) ?Math.floor(2000 / destPrice):buylimit

        const handleConfirm = (trigger && trigger === "addToCart") ? this.addToCart.bind(this):this.directBuy.bind(this);
        let canAddCart = good["canAddCart"]
        if(good.flashbuy["active"]){
            canAddCart = false
        }
        const confrimButtonClasses = classNames("goodsSureBtn",{
            "disabled":good.stock <= 0
        })

        return (
            <Popup direction="bottom" active={popupActive}>
                <div className="con">
                    <div className="goodsSure">
                        <img src={good.mainImageUrl} alt="" />
                        <div className="left">
                            <span className="nowPrice">&yen;{formatPrice(destPrice)}</span>
                            <em>库存<i>{good.stock}</i>件</em>
                        </div>
                        <i className="iconfont icon-close-circled" onClick={this.togglePopup.bind(this,null)}></i>
                    </div>
                    <Attributes attrs={good.attrs}
                    onAttrChange={this.handleAttrToggle.bind(this)} />
                    <div className="pro clearfix">
                        <div className="pro-name">
                            <span>购买数量</span>
                        </div>
                        <div className="good-buyed">
                        <NumberPicker value={buyed} onChange={this.handleBuyedChanged.bind(this)} 
                        onOverflow={this.handleBuyedOverflow.bind(this)} 
                        step={good.buyedStep}
                        minimum={good.buyedMinimum} maximum={buylimit}/>
                        </div>
                    </div>
                    <a href="javascript:void(0);" onClick={handleConfirm} className={confrimButtonClasses}>{
                        !canAddCart && this.state.scheme === "addToCart"
                        ?"立即购买":"确定"}</a>
                </div>
            </Popup>
        )
    }
    render(){
        const {cartCount} = this.props.cartByUser;
        const {good,isCollected,goodFetching} = this.props.goodById
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
            <GoTop relative={true} scrollable={this.state.scrollable} smooth={this.smooth} 
            renderFixed={this.renderToolbar.bind(this)}
            onScroll={this.handleScroll.bind(this)}>
            <div className="good-detail-content">
            <Header>商品详情<a className="globa" href="/"><i></i></a>
            <a className="goods_share" onClick={this.toggleShare.bind(this)}></a>
            </Header>
            <div className={upperClasses}>
                {good.slides.length > 0?(
                <Slides effect="roll" autoPlay={false} loop={true} speed={200}>{slides}</Slides>
                ):null}
                <div className="title clearfix">
                    <span>{good.title}</span>
                    <a className="goods_fav" href="javascript:void(null)" onClick={this.toggleCollected.bind(this)}>
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
                    <i className="iconfont icon-comment"></i>用户评论<em>（{good.comments?good.comments.totalCount:0}）</em></div>
                    <div className="right">查看更多评价<i className="iconfont icon-right"></i></div>
                </a>
                <Origin good={good} {...this.props}/>
                <div className="assure">
                    <img src="/client/asset/images/assure.gif" />
                </div>
                {this.state.downVisble?null:<div className="teyla">上拉显示商品详情</div>}
            </div>
            <div className={downClasses}>
                {this.state.downVisble?(
                <Tabs>
                    <TabsItem title="图文详情">
                    {good.detail?(
                    <div className="good-desc" dangerouslySetInnerHTML={{__html:_.unescape(good.detail)}}></div>
                    ):<div className="good-desc">暂无详情</div>}
                    </TabsItem>
                    <TabsItem title="保税FAQ">
                    <div className="faq">
                    <img src="/client/asset/images/FAQ.png" />
                    </div>
                    </TabsItem>
                </Tabs>
                ):null}
            </div>
            {this.renderAttrPopUp()}
            <Alert active={this.props.cartByUser.alertActive}>{this.props.cartByUser.alertContent}</Alert>
            <MaskLayer visible={this.state.popupActive} />
            <ActivityIndicator active={goodFetching}/>
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