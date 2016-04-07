'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Slidable from "./slidable.jsx";

export class Tabs extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:props.activeIndex !== undefined?props.activeIndex:0,
            prevIndex:null
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.activeIndex !== undefined && 
            nextProps.activeIndex !== this.props.activeIndex){
            this.setState({
                prevIndex:this.prop.activeIndex,
                activeIndex:nextProps.activeIndex
            })
        }
    }
    handleClick(index,e){
        e && e.preventDefault();
        const prevIndex = this.state.activeIndex;
        this.setState({
            activeIndex:index,
            prevIndex
        },()=>{
            this.props.onSelect(index);
        })
    }
    renderNavBar(){
        const children = this.props.children;
        var titles = [];
        children.forEach((child)=>{
            titles.push(child.props.title);
        });
        let navItems = titles.map((title,i)=>{
            const classes = classNames({
                active:i === this.state.activeIndex
            });
            return (
                <span className={classes} key={i} 
                onClick={this.handleClick.bind(this,i)}><b>{title}</b></span>
            );
        })
        let navbar = <div className="tabs-nav">{navItems}</div>
        if(this.props.navbarSlidable){
            navbar = (
                <Slidable axis={this.props.axis} name="navbar" 
                activeIndex={this.state.activeIndex}>
                {navbar}
                </Slidable>
            )
        }
        return navbar
    }
    renderContent(child,index){
        return React.cloneElement(child,{
            active:index === this.state.activeIndex,
            key:child.key ? child.key:index
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
            {this.renderNavBar()}
            <div className={contentClasses}>{React.Children.map(this.props.children,this.renderContent.bind(this))}</div>
            </div>
        )
    }
}

Tabs.defaultProps = {
    effect:"fade",
    axis:"x",
    navbarSlidable:false,
    onSelect:function(){}
}

export class TabsItem extends Component{
    render(){
        const {active,key} = this.props;
        const classes = classNames("tabs-item",{
            active
        })
        return (
            <div className={classes} key={key}>{this.props.children}</div>
        )
    }
}