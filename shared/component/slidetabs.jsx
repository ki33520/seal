'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Slidable from "./slidable.jsx";
import dom from "../lib/dom.es6";

export class SlideTabs extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:props.activeIndex,
            // navbarSlidable:false
        }
    }
    componentDidMount(){
        dom.bindEvent(document,"touchmove",(e)=>{
            // e && e.preventDefault()
        })
    }
    componentWillUnmount(){
        dom.unbindEvent(document,"touchmove",(e)=>{
            // e && e.preventDefault()
        })
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextState.activeIndex !== this.state.activeIndex){
            return true
        }
        return false
    }
    handleSelect(i,e){
        // e && e.preventDefault()
        this.setState({
            activeIndex:i
        },()=>{
            this.props.onSelect()   
        })
    }
    handleContentActiveChange(i,e){
        this.setState({
            activeIndex:i
        })
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
            key:index,
            axis:this.props.axis
        }))
    }
    render(){
        const classes = classNames("slide-tabs",{
            "slide-tabs-fixed":this.props.navbarSlidable === false,
            "slide-tabs-vertical":this.props.axis === "y"
        })
        return (
            <div className={classes}>
            <Slidable axis={this.props.axis} name="content" 
            transitionMove={true} 
            onlyInside={true}
            simulateTranslate={true}
            handleActiveChange={this.handleContentActiveChange.bind(this)} 
            activeIndex={this.state.activeIndex}>
            <div className="slide-tabs-content">{React.Children.map(this.props.children,this.renderTabsItem.bind(this))}</div>
            </Slidable>
            {this.renderNavbar()}
            </div>
        )
    }
}

SlideTabs.defaultProps = {
    activeIndex:0,
    axis:"x",
    navbarSlidable:true,
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
        if(this.props.axis === "x"){
            itemStyle.width = contentNode.parentNode.parentNode.offsetWidth
        }else{
            itemStyle.height = contentNode.parentNode.parentNode.offsetHeight
        }
        this.setState({
            itemStyle
        })
    }
    render(){
        const {key,active} = this.props;
        const classes = classNames("slide-tabs-item",this.props.className,{
            active
        })
        let children = this.props.children
        if(React.Children.count(this.props.children) === 1){
            let child = React.Children.only(this.props.children)
            children = React.cloneElement(child,Object.assign({},child.props,{
                redraw:this.state.itemStyle !== null
            }))
        }
        return (
            <div className={classes} key={key} style={this.state.itemStyle}>{children}</div>
        )
    }
}