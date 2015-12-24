'use strict';

import React,{Component} from "react";
import classNames from "classnames";

export class Tabs extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:props.activeIndex,
            prevIndex:null
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.activeIndex !== undefined && 
            nextProps.activeIndex !== this.props.activeIndex){
            this.setState({
                prevIndex:this.props.activeIndex,
                activeIndex:nextProps.activeIndex
            })
        }
    }
    handleClick(index,e){
        e && e.preventDefault();
        const prevIndex = this.state.activeIndex;
        const {handleToggleFlag} = this.props;
        handleToggleFlag && handleToggleFlag(index,e);
        this.setState({
            activeIndex:index,
            prevIndex
        },()=>{
            this.props.onSelect(index);
        })
    }
    renderNav(){
        const children = this.props.children;
        var titles = [];
        children.forEach((child)=>{
            titles.push(child.props.title);
        });
        return titles.map((title,i)=>{
            const classes = classNames({
                active:i === this.state.activeIndex
            });
            return (
                <li className={classes} key={"tab-nav-"+i} 
                onClick={this.handleClick.bind(this,i)}>{title}</li>
            );
        })
    }
    renderContent(child,index){
        return React.cloneElement(child,{
            active:index === this.state.activeIndex,
            index:child.key ? child.key:index
        });
    }
    render(){
        const {effect} = this.props;
        const contentClasses = classNames("tabs-content",{
            "tabs-content-fade":effect === "fade",
            "tabs-content-slide":effect === "slide"
        })
        return(
            <div className="tabs">
                <div className="polyTabs">
                    <ul>{this.renderNav()}</ul>
                </div>
                <div className={contentClasses}>{React.Children.map(this.props.children,this.renderContent.bind(this))}</div>
            </div>
        )
    }
}

Tabs.defaultProps = {
    effect:"fade",
    activeIndex:0,
    onSelect:function(){}
}

export class TabsItem extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state = {
            activeIndex:props.activeIndex,
            prevIndex:null
        }
    }
    handleTouch(index,e){
        e && e.preventDefault();
        var index = index===0? 1: 0;
        const prevIndex = this.state.activeIndex;
        const {handleTouch} = this.props;
        handleTouch && handleTouch(index,e);
        this.setState({
            activeIndex:index,
            prevIndex
        },()=>{
            this.props.onSelect(index);
        })
    }
    render(){
        const {active,index,handleTouch} = this.props;
        const classes = classNames("tabs-item",{
            active
        })
        // onClick={this.handleTouch.bind(this,index)}
        return (
            <div className={classes} key={"tabs-item-" + index}>{this.props.children}</div>
        )
    }
}

TabsItem.defaultProps = {
    activeIndex:0,
    onSelect:function(){}
}