'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Slidable from "./slidable.jsx";
import dom from "../lib/dom.es6";
import {browserVersion} from "../lib/dom/browserDetector.es6";

export class Swiper extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:props.activeIndex !== undefined?props.activeIndex:0,
            prevIndex:null
        }
        this.translateX = 0;
        this.translateY = 0;
        this.transitionMoving = false
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.activeIndex !== undefined && 
            nextProps.activeIndex !== this.props.activeIndex){
                if(this.transitionMoving){
                    return
                }
                this.setState({
                    prevIndex:this.prop.activeIndex,
                    activeIndex:nextProps.activeIndex
                })
                if(this.props.contentSliding){
                    this.transitionWithContent(this.props.activeIndex,nextProps.activeIndex,false)
                }
            }
    }
    componentDidMount(){
        if(this.props.contentSliding){
            let contentNode = ReactDOM.findDOMNode(this.refs["slidingContent"])
            const contentWidth = contentNode.offsetWidth
            const count = React.Children.count(this.props.children)
            contentNode.style.width = `${contentWidth * count}px`
            for(var i = 0;i< count;i++){
                let child = contentNode.children[i]
                child.style.display = "block"
                child.style.width = `${contentWidth}px`
            }
            dom.bindEvent(contentNode,"touchstart",this.handleTouchStart.bind(this))
            dom.bindEvent(contentNode,"touchmove",this.handleTouchMove.bind(this))
            dom.bindEvent(contentNode,"touchend",this.handleTouchEnd.bind(this))
        }
    }
    handleTouchStart(e){
        if(!this.props.contentSliding){
            return
        }
        // e && e.stopPropagation();
        const {clientY,clientX} = e.changedTouches[0];
        this.startTouchY = clientY;
        this.startTouchX = clientX;
        this.lastY = this.startTouchY;
        this.lastX = this.startTouchX;
        this.moveDirection = null;
    }
    handleTouchMove(e){
        if(!this.props.contentSliding){
            return
        }
        e && e.stopPropagation();
        const {clientY,clientX} = e.changedTouches[0];
        const inTouchableRegion = dom.inTouchableRegion(clientX,clientY,e.currentTarget);
        if(!inTouchableRegion){
            return;
        }
        this.lastY = clientY;
        this.lastX = clientX;
        const moveDirection = this.moveDirectionInTouch(this.lastY,this.lastX)
        // console.log("moveDirection",moveDirection)
        // alert("moveDirection"+moveDirection)
        if(browserVersion().android && !browserVersion().weixin 
            && moveDirection === "x"){
            e && e.preventDefault()
        }
    }
    handleTouchEnd(e){
        if(!this.props.contentSliding){
            return
        }
        e && e.stopPropagation();
        const {clientY,clientX} = e.changedTouches[0];

        // alert(`moveY:${moveY},moveX:${moveX}`)

        if(this.startTouchX !== clientX || this.startTouchY !== clientY){
            const {axis,animateDuration,thresholdOfChange} = this.props;
            this.endTouchY = clientY;
            this.endTouchX = clientX;
            const inTouchableRegion = dom.inTouchableRegion(clientX,clientY,e.currentTarget);
            const moveDirection = this.moveDirectionInTouch(this.endTouchY,this.endTouchX)
            if(!inTouchableRegion){
                return;
            }
            // console.log('moveDirection',moveDirection)
            if(moveDirection !== this.props.axis){
                return;
            }
            let activeIndex = this.state.activeIndex;
            let contentNode = ReactDOM.findDOMNode(this.refs["slidingContent"])
            if(axis === "x"){
                let contentWidth = contentNode.offsetWidth
                let step = (this.endTouchX - this.startTouchX) / contentWidth
                // console.log('step',step)
                // alert("step"+step)
                let count = React.Children.count(this.props.children)
                let prevIndex = activeIndex
                if(Math.abs(step) > thresholdOfChange){
                    if(step > 0 && activeIndex > 0){
                        activeIndex = activeIndex - 1
                    }else if(step < 0 && activeIndex < (count - 1)){
                        activeIndex = activeIndex + 1
                    }
                }
                if(activeIndex !== prevIndex){
                    if(this.transitionMoving){
                        return
                    }
                    this.props.onSelect(activeIndex)
                    this.setState({
                        activeIndex
                    })
                    this.transitionWithContent(prevIndex,activeIndex)
                    // console.log('activeIndex',nextIndex,activeIndex)
                }
            }

        }
    }
    transitionWithContent(activeIndex,nextIndex,animate = true){
        const {axis} = this.props
        let contentNode = ReactDOM.findDOMNode(this.refs["slidingContent"])
        let slideInNode = contentNode.children[nextIndex]
        let orientation = nextIndex > activeIndex ? "forward":"backward"
        // if(this.transitionMoving){
        //     return
        // }
        this.transitionMoving = true
        let timerDelay = 600
        let transitionDuration = "0.5s"
        if(browserVersion().ios){
            transitionDuration = "0.4s"
            timerDelay = 500
        }
        let translateX = (nextIndex * slideInNode.offsetWidth)
        // console.log('translateX',translateX,nextIndex)
        contentNode.style.WebkitTransform = `translate3D(-${translateX}px,0,0)`
        contentNode.style.transitionDuration = animate ? transitionDuration : "0s"
        if(orientation === "forward"){
            contentNode.style.transitionDelay = "0s"
        }else{
            contentNode.style.transitionDelay = "0.1s"
        }

        const processTimer = setTimeout(()=>{
            this.transitionMoving = false
            clearTimeout(processTimer)
        },timerDelay)
    }
    moveDirectionInTouch(clientY,clientX){
        let moveY = Math.abs(clientY - this.startTouchY);
        let moveX = Math.abs(clientX - this.startTouchX);
        const {axis} = this.props;
        if(axis === "x" && moveX < 5){
            return
        }else if(axis === "y" && moveY < 5){
            return
        }
        let touchAngle = Math.atan2(moveY,moveX) * 180 / Math.PI
        // console.log('touchAngle',touchAngle,moveY,moveX)
        // alert(`moveY:${moveY},moveX:${moveX}`)
        let moveDirection = touchAngle < 30 ?"x":"y"
        // let moveDirection =  moveX > (moveY + 5) ?"x":"y"
        // alert(`moveDirection:${moveDirection}`)
        return moveDirection
    }
    handleClick(index,e){
        e && e.preventDefault();
        const prevIndex = this.state.activeIndex;
        if(this.transitionMoving){
            return
        }
        this.props.onSelect(index);
        this.setState({
            activeIndex:index,
            prevIndex
        })
        if(this.props.contentSliding){
            this.transitionWithContent(prevIndex,index,false)
        }
    }
    renderControl(){
        let controlItems = []
        React.Children.forEach(this.props.children,(child,i)=>{
            const classes = classNames("swiper-control-item",{
                active:i === this.state.activeIndex
            });
            const {control} = child.props
            controlItems.push(
                <span className={classes} key={i} 
                onClick={this.handleClick.bind(this,i)}>{control()}</span>
            )
        })
        let control = <div className="swiper-control">{controlItems}</div>
        if(this.props.controlSliding){
            control = (
                <Slidable axis={this.props.axis} name="navbar" 
                activeIndex={this.state.activeIndex}>
                {control}
                </Slidable>
            )
        }
        return control
    }
    renderContent(child,index){
        const {activeIndex} = this.state
        return React.cloneElement(child,{
            active:index === this.state.activeIndex,
            key:child.key ? child.key:index
        });
    }
    renderSlidingContent(){
        let contentItems = React.Children.map(this.props.children,this.renderContent.bind(this))
        return <div className="swiper-sliding-content" ref="slidingContent"
        >{contentItems}</div>
    }
    render(){
        const classes = classNames({
            "swiper":this.props.axis === "x",
            "swiper-vertical":this.props.axis === "y",
            "swiper-fixed":!this.props.controlSliding,
        })
        const {effect} = this.props;
        const contentClasses = classNames("swiper-content",{
            // "swiper-content-fade":effect === "fade",
            // "swiper-content-slide":effect === "slide"
        })
        return(
            <div className={classes}>
            {this.renderControl()}
            <div className={contentClasses}>{this.props.contentSliding?
                this.renderSlidingContent():
                React.Children.map(this.props.children,this.renderContent.bind(this))}</div>
            </div>
        )
    }
}

Swiper.defaultProps = {
    activeIndex:0,
    effect:"fade",
    axis:"x",
    controlSliding:false,
    contentSliding:false,
    animateDuration:0.15,
    thresholdOfChange:0.05,
    onSelect:function(){}
}

export class SwiperItem extends Component{
    render(){
        const {active,scrollable,key} = this.props;
        const classes = classNames("swiper-item",this.props.className,{
            active,
            scrollable
        })
        return (
            <div className={classes} key={key}>{this.props.children}</div>
        )
    }
}

SwiperItem.defaultProps = {
    scrollable:true
}