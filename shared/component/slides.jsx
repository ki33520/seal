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
        this.mySwiper = new Swiper(".swiper-container",{
            pagination: "."+this.props.swiperPagination,
            initialSlide: this.props.initialSlide,
            lazyLoading:true,
            preloadImages:false
        })
    }
    componentDidUpdate(prevProps){
        const {slidesIndex} = this.props;
        if(prevProps.initialSlide === this.props.initialSlide && prevProps.children.length === this.props.children.length){
            
        }else{
            if(this.mySwiper.updateSlidesSize){
                this.mySwiper.updateSlidesSize();
                this.mySwiper.slideTo(this.props.initialSlide, 0, false);
            }else{
                this.mySwiper[slidesIndex].updateSlidesSize();
                this.mySwiper[slidesIndex].slideTo(this.props.initialSlide, 0, false);
            }
        }
        
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
            <div className={this.props.swiperPagination}></div>
            </div>
        )
    }
}
Slides.defaultProps = {
    slidesIndex:0,
    initialSlide:0,
    swiperPagination:"swiper-pagination"
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