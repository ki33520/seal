'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import dom from "../../lib/dom.es6";

class Slider extends Component{
    constructor(props){
        super(props);
        const defaultActiveIndex = this.needPseudoNode()?1:0;
        this.state = {
            activeIndex:this.props.defaultActiveIndex !== undefined ?this.props.defaultActiveIndex:defaultActiveIndex,
            prevActiveIndex:null,
            nextActiveIndex:null,
            direction:null,
            slidesStyle:null,
            slideStyle:null,
        }
        this.paused = false;
        this.slides = null;
    }
    componentDidMount(){
        this.initialize();
        this.props.autoPlay && this.slideToNext();
    }
    componentWillUnmount(){
        clearTimeout(this.timeout)
    }
    initialize(rect = null){
        const {oriention} = this.props;
        var {activeIndex} = this.state;
        if(this.props.defaultActiveIndex !== undefined){
            activeIndex = this.props.defaultActiveIndex;
        }
        // const slideNode = React.findDOMNode(this).querySelector(".slides").firstChild;
        const slideNode = ReactDOM.findDOMNode(this);
        let slideNodeWidth = slideNode.offsetWidth;
        let slideNodeHeight = slideNode.querySelector(".slides").firstChild.offsetHeight
        if(rect !== null){
            slideNodeWidth = rect.width ? rect.width:slideNodeWidth
            slideNodeHeight = rect.height ? rect.height:slideNodeHeight
        }
        const slidesWidth = slideNodeWidth * this.slides.length;
        const slidesHeight = slideNodeHeight * this.slides.length;
        // console.log('slidesHeight',slideNode.querySelector(".slides").offsetHeight)
        if(slidesWidth === 0 && oriention === "horizontal"
            || (slidesHeight === 0 && oriention === "vertical")){
            return;
        }
        var slidesStyle = {
            width:oriention === "horizontal"?slidesWidth + "px":null,
            height:oriention === "vertical"?slidesHeight + "px":null,
        }
        if(this.props.effect === "roll"){
            const transform = this.props.oriention === "horizontal"?
                "translate3D(-"+slideNodeWidth*activeIndex+"px,0,0)":
                "translate3D(0,-"+slideNodeHeight*activeIndex+"px,0)";
            slidesStyle = Object.assign({},slidesStyle,{
                transitionProperty:"transform",
                transitionTimingFunction:"ease-in-out",
                WebkitTransform:transform
            })
        }
        // console.log('currentStyle',slideNodeHeight)
        // const computedStyle = window.getComputedStyle(slideNode,null);
        this.setState({
            slideStyle:{
                width:oriention === "horizontal"?slideNodeWidth:null,
                height:oriention === "vertical"?slideNodeHeight:null
            },
            slidesStyle,
            activeIndex,
            sliderStyle:{
                width:oriention === "horizontal"?slideNodeWidth:null,
                height:oriention === "vertical"?slideNodeHeight:null
            }
        });
    }
    slideToNext(){
        const self = this;
        const count = this.slides.length;
        this.timeout = setTimeout(function interval(){
            const prevIndex = self.getActiveIndex();
            self.next();
            clearTimeout(self.timeout);
            if(self.needPseudoNode() === true && prevIndex === count - 1 
                && self.paused === false){
                self.timeout = setTimeout(interval,10)
            }else{
                self.timeout = setTimeout(interval,self.props.delay);
            }
        },this.props.delay);
    }
    needPseudoNode(){
        return this.props.effect === "roll" && this.props.loop === true;
    }
    play(){
        this.paused = false;
        this.slideToNext();
    }
    pause(){
        this.paused = true;
        clearTimeout(this.timeout);
    }
    handleMouseOver(){
        // console.log('onMouseOver')
        if (this.props.pauseOnHover) {
          this.pause();
        }
    }
    handleMouseOut(){
        // console.log('onMouseOut')
        if(this.paused === true){
            this.play();
        }
    }
    handleTouchStart(e){
        e && e.preventDefault();
        if(this.animateSlide() === true){
            return;
        }
        if(this.touchEnabled === false){
            return
        }
        const {clientY,clientX} = e.changedTouches[0];
        this.startTouchX = clientX;
        this.startTouchY = clientY;
        // console.log('touch start',e.changedTouches,e.targetTouches,e.touches)
    }
    handleTouchEnd(e){
        e && e.preventDefault();
        if(this.animateSlide() === true){
            return;
        }
        if(this.touchEnabled === false){
            return
        }

        const {clientY,clientX} = e.changedTouches[0];
        const inTouchableRegion = this.inTouchableRegion(clientX,clientY,e.currentTarget);
        if(!inTouchableRegion){
            // e.preventDefault();
            // return;
        }
        const offsetWidth = this.state.slideStyle.width; 
        const offsetHeight = this.state.slideStyle.height; 
        const {oriention} = this.props;
        var offsetY,offsetX;
        if(oriention === "vertical"){
            offsetY = Math.abs(clientY) - Math.abs(this.startTouchY);
            const absOfOffsetY = Math.abs(offsetY);
            if(absOfOffsetY >= offsetHeight / 2){
                if(offsetY < 0){
                    // console.log('next Y')
                    setTimeout(this.next.bind(this),100);
                }else if(offsetY > 0){
                    // console.log('prev Y')
                    setTimeout(this.prev.bind(this),100);
                }
            }else{
                // console.log('restorePosition');
                absOfOffsetY > 0 && this.restorePosition();
            }
        }
        if(oriention === "horizontal"){
            offsetX = Math.abs(clientX) - Math.abs(this.startTouchX);
            const absOfOffsetX = Math.abs(offsetX);
            // console.log('distance',Math.abs(clientX),Math.abs(this.startTouchX))
            if(absOfOffsetX >= offsetWidth / 2){
                if(offsetX < 0){
                    // console.log('next X');
                    setTimeout(this.next.bind(this),100);
                }else if(offsetX > 0){
                    // console.log('prev X');
                    setTimeout(this.prev.bind(this),100);
                }
            }else{
                absOfOffsetX > 0 && this.restorePosition()
            }
        }
    }
    handleTouchMove(e){
        e && e.preventDefault();
        if(this.animateSlide() === true){
            return;
        }
        if(this.touchEnabled === false){
            return
        }

        const {clientY,clientX} = e.changedTouches[0];
        const inTouchableRegion = this.inTouchableRegion(clientX,clientY,e.currentTarget);
        if(!inTouchableRegion){
            e.preventDefault();
            return;
        }

        const offsetX = Math.abs(this.startTouchX) - Math.abs(clientX);
        const offsetY = Math.abs(this.startTouchY) - Math.abs(clientY);

        // console.log('currentX',clientX,'currentY',clientY)
        // console.log('lastX',this.lastMoveX,'lastY',this.lastMoveY)
        this.transitionTouch(offsetX,offsetY)
        this.lastMoveY = clientY;
        this.lastMoveX = clientX;
    }
    /** if touch move not fill the change condition then restore the slide position */
    restorePosition(){
        // console.log('restorePosition')
        const {oriention} = this.props;
        const activeIndex = this.getActiveIndex();
        var transform = null;
        if(oriention === "vertical"){
            var scrollY = this.state.slideStyle.height * activeIndex;
            transform = "translate3D(0,-"+scrollY+"px,0)";
        }else if(oriention === "horizontal"){
            var scrollX = this.state.slideStyle.width * activeIndex;
            transform = "translate3D(-"+scrollX+"px,0,0)";
        }
        const slidesNode = ReactDOM.findDOMNode(this.refs.slides);
        if(transform !== null){
            slidesNode.style.WebkitTransform = transform;
            slidesNode.style.transitionDuration = ".3s";
        }
    }
    transitionTouch(offsetX,offsetY){
        const {oriention} = this.props;
        const count = this.slides.length;
        const activeIndex = this.getActiveIndex();
        var transform = null;
        if(oriention === "vertical" && offsetY !== 0){
            var scrollY = this.state.slideStyle.height * activeIndex;
            var maxOffsetY = 1.25 * this.state.slideStyle.height;
            // console.log('maxOffsetY',maxOffsetY,offsetY)
            /** vertical move cant beyond limit*/
            if(Math.abs(offsetY) > maxOffsetY){
                // console.log('out of maxOffsetY',offsetY)
                return;
            }
            scrollY += offsetY;
            transform = "translate3D(0,-"+scrollY+"px,0)";
        }else if(oriention === "horizontal" && offsetX !== 0){
            var scrollX = this.state.slideStyle.width * activeIndex;
            var maxOffsetX = 1.25 * this.state.slideStyle.width;
            if(offsetX > maxOffsetX){
                return;
            }
            scrollX += offsetX;
            transform = "translate3D(-"+scrollX+"px,0,0)";
        }
        const slidesNode = ReactDOM.findDOMNode(this.refs.slides);
        if(transform !==null){
            slidesNode.style.WebkitTransform = transform;
            slidesNode.style.transitionDuration = ".3s";
        }
    }
    inTouchableRegion(x,y,element){
        const targetOffset = dom.offset(element);
        const minY = targetOffset.top;
        const maxY = targetOffset.top + element.offsetHeight;
        const minX = targetOffset.left;
        const maxX = targetOffset.left + element.offsetWidth;
        const isXValid = (x >= minX && x <= maxX);
        const isYValid = (y >= minY && y <= maxY);
        if(isXValid && isYValid){
            return true;
        }
        return false;
    }
    next(e){
        e && e.preventDefault();
        const prevIndex = this.getActiveIndex();
        var nextIndex = prevIndex + 1;
        const count = this.slides.length;
        if(nextIndex > count - 1){
            if(!this.props.loop){
                return;
            }
            nextIndex = 0;
        }
        this.handleSelect(nextIndex,"next");
    }
    prev(e){
        e && e.preventDefault();
        const prevIndex = this.getActiveIndex();
        var nextIndex = prevIndex - 1;
        const count = this.slides.length;
        if(nextIndex < 0){
            if(!this.props.loop){
                return;
            }
            nextIndex = count - 1;
        }
        this.handleSelect(nextIndex,'prev')
    }
    handleSelect(index,direction,e){
        e && e.preventDefault();
        const count = this.slides.length;
        var prevActiveIndex,nextActiveIndex;
        if(direction === "next"){
            // console.log('index',index)
            index = (this.needPseudoNode() && index === 0)?1:index;
            prevActiveIndex = index - 1,nextActiveIndex = index + 1;
            if(prevActiveIndex < 0){
                prevActiveIndex = count - 1;
            }
            if(nextActiveIndex >= count){
                nextActiveIndex = 0;
            }
        }
        if(direction === "prev"){
            index = (this.needPseudoNode() && index === (count - 1))?count - 2:index;
            // console.log('index',index,count)
            prevActiveIndex = index + 1,nextActiveIndex = index -1;
            if(nextActiveIndex < 0){
                nextActiveIndex = count - 1;
            }
            if(prevActiveIndex >= count){
                prevActiveIndex = 0;
            }
        }
        const state = {
            activeIndex:index,
            prevActiveIndex,
            nextActiveIndex,
            direction
        };
        const slidesStyle = this.transitionSlides(state,this.props,direction);
        // console.log(slidesStyle)
        this.setState(Object.assign({},state,{
            slidesStyle
        }),()=>{
            index = this.needPseudoNode() === true?index - 1:index; 
            // console.log('index will change',index)
            this.props.onChange(index);
        })
    }
    transitionSlides(state,props,direction){
        if(state.prevActiveIndex === null){
            return;
        }
        // console.log(this.state)
        const {oriention} = props;
        const count = this.slides.length;
        const activeIndex = state.activeIndex;
        var slidesStyle = this.state.slidesStyle;
        if(this.needPseudoNode() === true){
            var transform;
            // if direction is next and should active is pseudo item then redirect to the first real item
            if(activeIndex === 1&& state.direction === "next"){
                transform = oriention === "horizontal"?
                "translate3D(-"+this.state.slideStyle.width+"px,0,0)":
                "translate3D(0,-"+this.state.slideStyle.height+"px,0)";
                slidesStyle = Object.assign({},slidesStyle,{
                    transform,
                    transitionDuration:"0s"
                })
            // if direction is prev and should active is pseudo item then redirect to the last real item
            }else if(activeIndex === (count - 2) && state.direction === "prev"){
                transform = oriention === "horizontal"?
                "translate3D(-"+(this.state.slideStyle.width*activeIndex)+"px,0,0)":
                "translate3D(0,-"+(this.state.slideStyle.height*activeIndex)+"px,0)";
                slidesStyle = Object.assign({},slidesStyle,{
                    transform,
                    transitionDuration:"0s"
                })
            }else{
                const speed = props.speed / 1000;
                if(oriention === "horizontal"){
                    const scrollX = this.state.slideStyle.width * activeIndex;
                    transform = "translate3D(-"+ scrollX +"px,0,0)";
                }else if(oriention === "vertical"){
                    const scrollY = this.state.slideStyle.height * activeIndex;
                    transform = "translate3D(0,-"+ scrollY +"px,0)";
                }
                // console.log('transform',transform)
                slidesStyle = Object.assign({},slidesStyle,{
                    WebkitTransform:transform,
                    transitionDuration:speed+"s"
                })
            }
            return slidesStyle;
        }
        return slidesStyle;
    }
    componentDidUpdate(prevProps,prevState){
        const count = this.slides.length;
        const nextTick = this.props.speed + 10;
        if(this.needPseudoNode() === true){
            if(prevState.activeIndex === (count - 1) 
                && this.state.direction === "next"
                && this.state.activeIndex === prevState.activeIndex
                // && this.state.prevActiveIndex !== 0
                ){
                // if direction is next and should active is pseudo item then redirect to the first real item
                setTimeout(this.next.bind(this),nextTick)
            }else if(this.getActiveIndex() === 0 
                && this.state.direction === "prev" 
                && this.state.activeIndex === prevState.activeIndex
                ){
                // console.log('updated ---',prevState.activeIndex,this.state.activeIndex)
                // if direction is prev and should active is pseudo item then redirect to the last real item
                setTimeout(this.prev.bind(this),nextTick)
                // console.log('updated',this.state.activeIndex)
            }
        }
    }
    getActiveIndex(){
        return this.props.activeIndex !== undefined ? this.props.activeIndex : this.state.activeIndex;
    }
    renderSlide(child,index){
        const activeIndex = this.getActiveIndex();
        const isActive = (index === activeIndex);
        const isPrevActive = this.state.prevActiveIndex !== null && this.state.prevActiveIndex === index;
        const isNextActive = this.state.nextActiveIndex !== null && this.state.nextActiveIndex === index;
        return React.cloneElement(child,{
            active:isActive,
            prev:isPrevActive,
            next:isNextActive,
            key:child.key?child.key:index,
            style:this.state.slideStyle,
            animateOut:isPrevActive,
            animateIn:isActive && this.state.prevActiveIndex !== null,
            animateSpeed:this.props.speed,
            animateSlide:this.animateSlide(),
            direction:this.state.direction
        })
    }
    animateSlide(){
        return this.props.effect === "fade";
    }
    renderDirectionNav(){
        if(this.props.directionNav === true){
            return (
                <div className="direction-nav">
                <div className="direction-nav-prev" onClick={this.prev.bind(this)}><span className="iconfont icon-left-open"></span></div>
                <div className="direction-nav-next" onClick={this.next.bind(this)}><span className="iconfont icon-right-open"></span></div>
                </div>
            )
        }
        return null;
    }
    renderControlNav(){
        if(this.props.controlNav === true){
            var activeIndex = this.getActiveIndex();
            const slidesCount = this.slides.length;
            // console.log(slidesCount)
            if(this.needPseudoNode() === true){
                // if direction is next and should active is pseudo item then redirect to 1
                activeIndex = (activeIndex === slidesCount - 1)?1:activeIndex;
                // if direction is prev and should active is pseudo item then redirect to the last real item
                activeIndex = (activeIndex === 0)?(slidesCount - 2):activeIndex;
            }
            const children = React.Children.map(this.slides,(child,i)=>{
                /* dont render pseudo control item*/
                if(this.needPseudoNode() === true && i === slidesCount - 1){
                    return;
                }
                if(this.needPseudoNode() === true && i === 0){
                    return;
                }
                const childrenClasses = classNames({
                    active:activeIndex === i
                })
                return (
                    <span onClick={this.handleSelect.bind(this,i,null)} className={childrenClasses} key={i}>
                    </span>
                )
            });
            const classes = classNames({
                'control-nav':true
            })
            return (
                <div className={classes}>{children}</div>
            )
        }
        return null
    }
    processSlides(children = this.props.children){
        this.slides = [...children];
        if(this.needPseudoNode() === true){
            const count = this.slides.length;
            const pseudoFirstNode = React.cloneElement(this.slides[0],{
                key:"pseudo-first",
                pseudo:true
            });
            const pseudoLastNode = React.cloneElement(this.slides[count-1],{
                key:"pseudo-last",
                pseudo:true
            });
            this.slides.push(pseudoFirstNode);
            this.slides.unshift(pseudoLastNode);
        }
        // console.log('processSlides',this.props.children.length,this.slides.length)
    }
    componentWillMount(){
        this.processSlides();
    }
    componentWillUpdate(nextProps){
        if(nextProps.children.length !== this.props.children.length){
            this.processSlides(nextProps.children);
        }
    }
    render(){
        var {sliderStyle,slidesStyle,slideStyle} = this.state;
        const classes = classNames("slider",{
            "slider-fade":this.props.effect === "fade"
        })
        if(this.animateSlide()){
            sliderStyle = null;
            slidesStyle = null;
        }
        // console.log('render slider',this.state)
        return (
            <div className={classes} 
            style={sliderStyle}
            onTouchStart={this.handleTouchStart.bind(this)}
            onTouchMove={this.handleTouchMove.bind(this)}
            onTouchEnd={this.handleTouchEnd.bind(this)}
            onMouseOver={this.handleMouseOver.bind(this)} 
            onMouseOut={this.handleMouseOut.bind(this)}>
            <div className="slides" style={slidesStyle} ref="slides">
            {React.Children.map(this.slides,this.renderSlide.bind(this))}
            </div>
            {this.renderControlNav()}
            {this.renderDirectionNav()}
            </div>
        )
    }
}

Slider.defaultProps = {
    directionNav:false,
    controlNav:true,
    effect:"roll",
    infinity:true,
    direction:"next",
    touchEnabled:true,
    reverse:false,
    oriention:"horizontal", //vertical
    autoPlay:false,
    loop:true,
    speed:300,
    delay:5000,
    rect:null,
    height:null,
    pauseOnHover:true,
    onChange:function(){}
}

export default Slider;