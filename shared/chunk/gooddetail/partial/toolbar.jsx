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
        const {addToCart,toggleFavorite,directBuy} = this.props
        return (
            <div className="good-toolbar">
            <div className="good-toolbar-icon" onClick={toggleFavorite}></div>
            <a className="good-toolbar-icon" href="/cart">
            <span className="cart-badge">{this.state.cartCount}</span>
            <div className="cart-overlayer" ref="cartOverlayer"></div>
            </a>
            <div className="good-toolbar-button"><a href="javascript:void(null)" 
            onClick={addToCart}>加入购物袋</a></div>
            <div className="good-toolbar-button"><a href="javascript:void(null)" 
            onClick={directBuy}>立即购买</a>{this.props.children}</div>
            </div>
        )
    }
}

export default Toolbar;