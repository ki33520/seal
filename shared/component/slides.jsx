'use strict';
import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

export class Slides extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let Swiper = require("../lib/dom/swiper.js");
        let mySwiper = new Swiper(".swiper-container",{
            pagination: '.swiper-pagination'
        })
    }
    renderSlides(){
        let slides = React.Children.map(this.props.children,this.renderSlide.bind(this))
        return <div className="swiper-wrapper">{slides}</div>
    }
    renderSlide(child,i){
        return React.cloneElement(child,{
            key:child.key?child.key:i
        })
    }
    render(){
        return (
            <div className="swiper-container">
            {this.renderSlides()}
            <div className="swiper-pagination"></div>
            </div>
        )
    }
}


export class Slide extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="swiper-slide">{this.props.children}</div>
        )
    }
}