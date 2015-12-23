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
    componentDidUpdate(prevProps,prevState){
        // console.log(nextProps,this.props)
        if(prevProps.activeIndex !== this.props.activeIndex){
            if(this.props.handleActiveChange === true){
                return;
            }
            this.transitionInView();
        }
    }
    transitionInView(){
        const {activeIndex,axis,pinMode} = this.props;
        let itemNode = ReactDOM.findDOMNode(this).firstChild
        if(axis === "y"){
            let translateY = (activeIndex * itemNode.offsetHeight) > 0 ?
            - (activeIndex * itemNode.offsetHeight) :0;
            if(!pinMode){
                const itemNodeHeight = itemNode.offsetHeight;
                const translateNodeHeight = ReactDOM.findDOMNode(this).parentNode.parentNode.offsetHeight
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
                const itemNodeWidth = itemNode.offsetWidth;
                const translateNodeWidth = ReactDOM.findDOMNode(this).parentNode.parentNode.offsetWidth
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
        rAF(this.transitionTouch.bind(this))
    }
    handleTouchStart(e){
        e && e.stopPropagation();
        const {clientY,clientX} = e.changedTouches[0];
        this.startTouchX = clientX;
        this.startTouchY = clientY;
        this.lastY = this.startTouchY;
        this.lastX = this.startTouchX;
    }
    handleTouchEnd(e){
        e && e.stopPropagation();
        const {clientY,clientX} = e.changedTouches[0];
        this.endTouchY = clientY;
        this.endTouchX = clientX;
        const inTouchableRegion = dom.inTouchableRegion(clientX,clientY,e.currentTarget);
        if(this.props.onlyInside && !inTouchableRegion){
            return;
        }
        if(this.props.handleActiveChange === false){
            return;
        }
        let nextIndex = this.state.activeIndex;
        const {axis} = this.props;
        let itemNode = ReactDOM.findDOMNode(this).firstChild
        if(axis === "y"){
            let itemHeight = itemNode.offsetHeight;
            let step = Math.round(Math.abs(this.translateY) / itemHeight)
            if(this.lastY !== this.startTouchY && step !== this.state.activeIndex){
                nextIndex = step;
                this.setState({
                    activeIndex:step
                },()=>this.props.handleActiveChange(step))
            }
            this.translateY = (nextIndex * itemNode.offsetHeight) > 0 ?
            - (nextIndex * itemNode.offsetHeight) :0;
        }else if(axis === "x"){
            let itemWidth = itemNode.offsetWidth;
            let step = Math.round(Math.abs(this.translateX) / itemWidth)
            if(this.lastX !== this.startTouchX && step !== this.state.activeIndex){
                nextIndex = step;
                this.setState({
                    activeIndex:step
                },()=>this.props.handleActiveChange(step))
            }
            this.translateX = (nextIndex * itemNode.offsetWidth) > 0 ?
            - (nextIndex * itemNode.offsetWidth) :0;
        }
        this.checkEdge()
        if(this.startTouchX !== this.endTouchX || this.startTouchY !== this.endTouchY){
            rAF(this.transitionTouch.bind(this))
        }
        // if(nextIndex !== this.state.activeIndex){
            // console.log(this.props.name,"touch end")
        // }
        // console.log('offsetY',this.offsetY,this.translateY,"offsetX",this.offsetX)
    }
    handleTouchMove(e){
        e && e.preventDefault();
        const {clientY,clientX} = e.changedTouches[0];
        const inTouchableRegion = dom.inTouchableRegion(clientX,clientY,e.currentTarget);
        if(this.props.onlyInside && !inTouchableRegion){
            return;
        }
        this.translateY += (clientY - this.lastY)
        this.translateX += (clientX - this.lastX)

        this.translateY = this.translateY >= 0 ? 0 : this.translateY;
        this.translateX = this.translateX >= 0 ? 0 : this.translateX;
        this.checkEdge(()=>{
            this.lastY = clientY;
            this.lastX = clientX;
        })
        rAF(this.transitionTouch.bind(this))
        // console.log("translateY",this.translateY,"lastY",this.lastY,"clientY",clientY)
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
    transitionTouch(){
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
            // translateNode.style.transitionDuration =".3s"
            translateNode.style.transform = transform;
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
            style:{
                transitionDuration:".3s",
                transitionProperty:"transform"
            }
        }))
    }
}

Slidable.defaultProps = {
    activeIndex:0,
    onlyInside:false,
    pinMode:false,
    axis:"y",
    handleActiveChange:false
}

export default Slidable;