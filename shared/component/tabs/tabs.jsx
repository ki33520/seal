'use strict';

import React,{Component} from "react";
import classNames from "classnames";

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
                <span className={classes} key={"tab-nav-"+i} 
                onClick={this.handleClick.bind(this,i)}>{title}</span>
            );
        })
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
            <div className="tabs-nav">{this.renderNav()}</div>
            <div className={contentClasses}>{React.Children.map(this.props.children,this.renderContent.bind(this))}</div>
            </div>
        )
    }
}

Tabs.defaultProps = {
    effect:"fade",
    onSelect:function(){}
}

export class TabsItem extends Component{
    render(){
        const {active,key} = this.props;
        const classes = classNames("tabs-item",{
            active
        })
        return (
            <div className={classes} key={"tabs-item-" + key}>{this.props.children}</div>
        )
    }
}

