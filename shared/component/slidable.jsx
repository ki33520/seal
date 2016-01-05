'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import dom from "../lib/dom.es6";
import rAF from "../lib/dom/requestAnimationFrame";
import _ from "lodash"

class Slidable extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:props.activeIndex,
        }
        this.translateX = 0;
        this.translateY = 0;
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.activeIndex !== this.props.activeIndex && 
            nextProps.activeIndex !== this.state.activeIndex){
            let prevIndex = this.state.activeIndex
            this.setState({
                activeIndex:nextProps.activeIndex
            },()=>{
                this.transitionInView(prevIndex)
            })
        }
    }
    transitionInView(prevIndex){
        const {activeIndex} = this.state;
        const {axis,pinMode,animateDuration} = this.props;
        const itemNode = ReactDOM.findDOMNode(this).firstChild
        const itemNodeWidth = itemNode.offsetWidth;
        const itemNodeHeight = itemNode.offsetHeight;
        const translateNodeWidth = ReactDOM.findDOMNode(this).parentNode.parentNode.offsetWidth
        const translateNodeHeight = ReactDOM.findDOMNode(this).parentNode.parentNode.offsetHeight
        if(axis === "y"){
            let translateY = (activeIndex * itemNode.offsetHeight) > 0 ?
            - (activeIndex * itemNode.offsetHeight) :0;
            if(!pinMode){
                if(this.translateY < translateY 
                /*&& this.translateY > (translateY - itemNodeHeight)*/){
                    // console.log('left edge')
                    this.translateY = translateY
                }
                if(/*translateNodeHeight > (this.translateY - translateY) &&*/
                    translateNodeHeight < (this.translateY - translateY + itemNodeHeight)){
                    // console.log('right edge')
                    this.translateY = this.translateY - (this.translateY - translateY + itemNodeHeight - translateNodeHeight)
                    // console.log(this.translateY)
                }
            }
        }else{
            let translateX = (activeIndex * itemNode.offsetWidth) > 0 ?
            - (activeIndex * itemNode.offsetWidth) :0;
            if(!pinMode){
                if(this.translateX < translateX
                /*&& this.translateX > (translateX - itemNodeWidth)*/){
                    // console.log('left edge')
                    this.translateX = translateX
                }
                if(/*translateNodeWidth > (this.translateX - translateX) && */
                    translateNodeWidth < (this.translateX - translateX + itemNodeWidth)){
                    // console.log('right edge')
                    this.translateX = this.translateX - (this.translateX - translateX + itemNodeWidth - translateNodeWidth)
                    // console.log(this.translateX)
                }
            }
        }
        this.checkEdge()
        if(this.props.simulateTranslate === true){
            // console.log('simulateTranslate')
            if(axis === "x"){
                let tempX = this.translateX
                if(prevIndex < activeIndex){
                    this.translateX += itemNodeWidth
                }else{
                    this.translateX -= itemNodeWidth
                }
                this.transitionTouch(0)
                this.translateX = tempX
            }else{
                let tempY = this.translateY
                if(prevIndex < activeIndex){
                    this.translateY += itemNodeHeight
                }else{
                    this.translateY -= itemNodeHeight
                }
                this.transitionTouch(0)
                this.translateY = tempY
            }
            setTimeout(()=>{
                this.transitionTouch(0.3)
            },100)
            // rAF(this.transitionTouch.bind(this,animateDuration))
        }else{
            this.transitionTouch(animateDuration)
        }
    }
    handleTouchStart(e){
        e && e.stopPropagation();
        const {clientY,clientX} = e.changedTouches[0];
        const {axis} = this.props;
        this.startTouchY = clientY;
        this.startTouchX = clientX;
        this.lastY = this.startTouchY;
        this.lastX = this.startTouchX;
        this.moveDirection = null;
    }
    handleTouchEnd(e){
        e && e.stopPropagation();
        const {clientY,clientX} = e.changedTouches[0];
        if(this.startTouchX !== clientX || this.startTouchY !== clientY){
            const {axis,animateDuration,thresholdOfChange} = this.props;
            this.endTouchY = clientY;
            this.endTouchX = clientX;
            const inTouchableRegion = dom.inTouchableRegion(clientX,clientY,e.currentTarget);
            if(this.props.onlyInside && !inTouchableRegion){
                return;
            }
            if(this.props.handleActiveChange === false){
                return;
            }
            // let touchDirection = Math.abs(this.endTouchX - this.startTouchX) > Math.abs(this.endTouchY - this.startTouchY) ?
            // "x":"y";
            if(this.moveDirection !== axis){
                return;
            }
            let nextIndex = this.state.activeIndex;
            let itemNode = ReactDOM.findDOMNode(this).firstChild
            if(axis === "y"){
                let itemHeight = itemNode.offsetHeight;
                let activeIndex = Math.abs(this.translateY) / itemHeight
                let step = (this.endTouchY - this.startTouchY) / itemHeight
                activeIndex = (Math.abs(step) > thresholdOfChange && step < 0) ? Math.ceil(activeIndex):Math.floor(activeIndex)
                activeIndex = (Math.abs(step) > thresholdOfChange && step > 0) ? Math.floor(activeIndex):Math.ceil(activeIndex)
                if(this.lastY !== this.startTouchY && activeIndex !== this.state.activeIndex){
                    nextIndex = activeIndex;
                    this.setState({
                        activeIndex:activeIndex
                    },()=>this.props.handleActiveChange(activeIndex))
                }
                this.translateY = (nextIndex * itemNode.offsetHeight) > 0 ?
                - (nextIndex * itemNode.offsetHeight) :0;
            }else if(axis === "x"){
                let itemWidth = itemNode.offsetWidth;
                let activeIndex = Math.abs(this.translateX) / itemWidth
                let step = (this.endTouchX - this.startTouchX) / itemWidth
                // console.log('step',this.endTouchX,this.startTouchX,step)
                activeIndex = (Math.abs(step) > thresholdOfChange && step < 0) ? Math.ceil(activeIndex):Math.floor(activeIndex)
                activeIndex = (Math.abs(step) > thresholdOfChange && step > 0) ? Math.floor(activeIndex):Math.ceil(activeIndex)
                if(this.lastX !== this.startTouchX && activeIndex !== this.state.activeIndex){
                    nextIndex = activeIndex;
                    this.setState({
                        activeIndex:activeIndex
                    },()=>this.props.handleActiveChange(activeIndex))
                }
                this.translateX = (nextIndex * itemNode.offsetWidth) > 0 ?
                - (nextIndex * itemNode.offsetWidth) :0;
            }
            this.checkEdge()
            // console.log('this.translateX',Math.abs(this.endTouchX - this.startTouchX),Math.abs(this.endTouchY - this.startTouchY))
            // console.log('translateY',this.translateY)
            // this.transitionTouch(this.props.animateDuration)
            // if(this.touchDirection() === axis){
            rAF(this.transitionTouch.bind(this,animateDuration))
            dom.removeClass(ReactDOM.findDOMNode(this),"sliding")
        }
    }
    handleTouchMove(e){
        e && e.preventDefault()
        // e && e.stopPropagation();
        const {animateDuration,axis} = this.props;
        const {clientY,clientX} = e.changedTouches[0];
        const inTouchableRegion = dom.inTouchableRegion(clientX,clientY,e.currentTarget);
        if(this.props.onlyInside && !inTouchableRegion){
            return;
        }
        let moveDirection = Math.abs(clientY - this.startTouchY) > Math.abs(clientX - this.startTouchX) ?"y":"x"
        if(this.moveDirection && this.moveDirection !== moveDirection){
            return
        }
        this.moveDirection = moveDirection
        if(this.moveDirection === axis){
            dom.addClass(ReactDOM.findDOMNode(this),"sliding")
            // e && e.preventDefault()
        }
        if(axis === "y" && this.moveDirection === "y"){
            this.translateY += (clientY - this.lastY)
        }else if(axis === "x" && this.moveDirection === "x"){
            this.translateX += (clientX - this.lastX)
        }

        this.translateY = this.translateY >= 0 ? 0 : this.translateY;
        this.translateX = this.translateX >= 0 ? 0 : this.translateX;
        this.checkEdge(()=>{
            this.lastY = clientY;
            this.lastX = clientX;
        })
        if(this.props.transitionMove === true){
            let transitionTouch = this.transitionTouch.bind(this,animateDuration)
            // console.log('this.translateX',(clientX - this.lastX),this.translateX)
            if(this.touchMoving){
                return
            }
            this.touchMoving = true
            this.timeout = setTimeout(()=>{
                transitionTouch()
                this.touchMoving = false
                clearTimeout(this.timeout)
            },200)
            // _.throttle(transitionTouch,60)
        }
        e && e.preventDefault()
    }
    checkEdge(onEdge = ()=>{}){
        const {axis} = this.props;
        let {translateY,translateX} = this
        let translateNode = ReactDOM.findDOMNode(this);
        // let beyondY = dom.offset(translateNode.parentNode).top - dom.offset(translateNode).top; 
        // let beyondX = dom.offset(translateNode.parentNode).left - dom.offset(translateNode).left; 
        let maxBeyondY = translateNode.offsetHeight - translateNode.parentNode.parentNode.offsetHeight;
        let maxBeyondX = translateNode.offsetWidth - translateNode.parentNode.parentNode.offsetWidth;
        if(maxBeyondY <= (- this.translateY) && axis === "y"){
            this.translateY = - maxBeyondY
        }else if(maxBeyondX <= (- this.translateX) && axis === "x"){
            this.translateX = - maxBeyondX
        }else{
            onEdge()
        }
    }
    transitionTouch(duration){
        const {axis} = this.props;
        let {translateY,translateX} = this
        var transform = null;
        if(axis === "y"){
            translateY = window.px2rem ? window.px2rem(translateY) + "rem": `${translateY}px`;
            transform = `translate3D(0,${translateY},0)`;
        }else if(axis === "x"){
            translateX = window.px2rem ? window.px2rem(translateX) + "rem" : `${translateX}px`;
            transform = `translate3D(${translateX},0,0)`;
        }
        if(transform !==null){
            let translateNode = ReactDOM.findDOMNode(this);
            // _.delay(()=>{
            // let duration = duration || 0.3
            translateNode.style.transitionDuration = `${duration}s`;
            translateNode.style.WebkitTransform = transform;
            // },60)
        }
    }
    render(){
        let child = React.Children.only(this.props.children);
        // console.log('activeIndex',this.state.activeIndex)
        return React.cloneElement(child,Object.assign({},child.props,{
            onTouchStart:this.handleTouchStart.bind(this),
            onTouchMove:this.handleTouchMove.bind(this),
            onTouchEnd:this.handleTouchEnd.bind(this),
            active:this.state.activeIndex,
            style:Object.assign({},this.props.style,{
                // transitionDuration:`${this.props.animateDuration}s`,
                transitionProperty:"transform"
            })
        }))
    }
}

Slidable.defaultProps = {
    activeIndex:0,
    onlyInside:false,
    axis:"y",
    thresholdOfChange:0.3,
    animateDuration:0.3,
    pinMode:false,
    transitionMove:true,
    simulateTranslate:false,
    handleActiveChange:false
}

export default Slidable;