'use strict';

import React,{Component} from "react";
import dom from "../../../lib/dom.es6";

class Toolbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            cartCount:props.cartCount
        };
    }
    transitionCartBadge(){
        const imgNode = document.body
        .querySelector(".slides>.active img").cloneNode(true);
        const overlayerNode = React.findDOMNode(this.refs.cartOverlayer);
        overlayerNode.innerHTML= ""
        overlayerNode.appendChild(imgNode);
        // console.log(overlayerNode)
        dom.addClass(overlayerNode,"scale-to-buttom");
        setTimeout(()=>{
            overlayerNode.innerHTML= "";
            dom.removeClass(overlayerNode,"scale-to-buttom");
            this.setState({
                cartCount:this.props.cartCount
            })
        },2000)
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.cartCount !== this.props.cartCount){
            this.transitionCartBadge();
        }
    }
    render(){
        const {cartCount} = this.props.cartByUser
        const {addToCart,directBuy} = this.props
        return (
            <div className="good-detail-toolbar">
            <a href="/cart" className="goods_cart">
                <i className="iconfont icon-cart">{cartCount === null?null:<em>{cartCount}</em>}</i>
            </a>
            <a href="javascript:void(0);" onClick={directBuy} className="goods_buy">立即购买</a>
            <a href="javascript:void(null)" onClick={addToCart} className="goods_add">加入购物车</a>
            </div>
        )
    }
}

export default Toolbar;