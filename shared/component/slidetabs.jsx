'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Slidable from "./slidable.jsx";
import dom from "../lib/dom.es6";
import noBounceScroll from "../lib/dom/nobounce-scroll.es6";

export class SlideTabs extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:props.activeIndex,
            // navbarSlidable:false
        }
    }
    componentDidMount(){
        // noBounceScroll.enable()
    }
    componentWillUnmount(){
        // noBounceScroll.disable()
    }
    // shouldComponentUpdate(nextProps,nextState){
    //     if(nextState.activeIndex !== this.state.activeIndex 
    //         || nextProps.activeIndex !== this.props.activeIndex){
    //         return true
    //     }
    //     return false
    // }
    handleSelect(i,e){
        // e && e.preventDefault()
        this.setState({
            activeIndex:i
        },()=>{
            this.props.onSelect(i)   
        })
    }
    handleContentActiveChange(i,e){
        this.setState({
            activeIndex:i
        },()=>this.props.onSelect(i))
    }
    renderNavbar(){
        let navigators = [];
        React.Children.forEach(this.props.children,(child,i)=>{
            const {navigator} = child.props;
            let classes = classNames("slide-tabs-navbar-item",{
                active:(i === this.state.activeIndex)
            })
            navigators.push(
                <div className={classes} key={i} onClick={this.handleSelect.bind(this,i)}>{navigator()}</div>
            )
        })
        if(this.props.navbarSlidable === true){
            return (
                <Slidable axis={this.props.axis} name="navbar" 
                activeIndex={this.state.activeIndex}>
                    <div className="slide-tabs-navbar">{navigators}</div>
                </Slidable>
            )
        }
        return <div className="slide-tabs-navbar">{navigators}</div>
    }
    renderTabsItem(child,index){
        return React.cloneElement(child,Object.assign({},child.props,{
            active:(index === this.state.activeIndex),
            identify:index,
            axis:this.props.axis
        }))
    }
    render(){
        const classes = classNames("slide-tabs",{
            "slide-tabs-fixed":this.props.navbarSlidable === false,
            "slide-tabs-vertical":this.props.axis === "y"
        })
        let tabsContent = (
            <div className="slide-tabs-content"
            >{React.Children.map(this.props.children,this.renderTabsItem.bind(this))}</div>
        ) 
        if(this.props.contentSlidable === true){
            tabsContent = (
                <Slidable axis={this.props.axis} name="content" 
                transitionMove={true} thresholdOfChange={0.1}
                onlyInside={true}
                simulateTranslate={true}
                handleActiveChange={this.handleContentActiveChange.bind(this)} 
                activeIndex={this.state.activeIndex}>
                <div className="slide-tabs-content">{React.Children.map(this.props.children,this.renderTabsItem.bind(this))}</div>
                </Slidable>
            )
        }
        return (
            <div className={classes}>
            {this.renderNavbar()}
            {tabsContent}
            </div>
        )
    }
}

SlideTabs.defaultProps = {
    activeIndex:0,
    axis:"x",
    navbarSlidable:true,
    contentSlidable:true,
    onSelect:()=>{}
}

export class SlideTabsItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            itemStyle:null
        }
    }
    componentDidMount(){
        let contentNode = ReactDOM.findDOMNode(this)
        let itemStyle = {}
        const itemWidth = contentNode.parentNode.parentNode.offsetWidth
        const itemHeight = contentNode.parentNode.parentNode.offsetHeight
        if(this.props.axis === "x"){
            // itemStyle.width = itemWidth
            contentNode.style.width = `${itemWidth}px`
        }else{
            itemStyle.height = itemHeight
        }
        // this.setState({
        //     itemStyle
        // })
    }
    handleTouchStart(e){
        const {clientY,clientX} = e.changedTouches[0];
        this.startTouchY = clientY;
        this.startTouchX = clientX;
        this.moveDirection = null;
    }
    handleTouchMove(e){
        const {clientY,clientX} = e.changedTouches[0];
        let moveDirection = Math.abs(clientY - this.startTouchY) > Math.abs(clientX - this.startTouchX) ?"y":"x"
        if(this.moveDirection && this.moveDirection !== moveDirection){
            return
        }
        this.moveDirection = moveDirection
        // console.log(this.moveDirection,"this.moveDirection")
        if(this.moveDirection === "y"){
            e.stopPropagation()
        }
    }
    render(){
        const {identify,active} = this.props;
        const classes = classNames("slide-tabs-item",this.props.className,{
            active
        })
        return (
            <div className={classes} key={identify}
            onTouchMove={this.handleTouchMove.bind(this)} 
            onTouchStart={this.handleTouchStart.bind(this)}>
            {this.props.children}
            </div>
        )
    }
}