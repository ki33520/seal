'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Slidable from "./slidable.jsx";

export class Swiper extends Component{
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
        return React.cloneElement(child,{
            active:index === this.state.activeIndex,
            key:child.key ? child.key:index
        });
    }
    renderSlidingContent(){
        let contentItems = React.Children.map(this.props.children,this.renderContent.bind(this))
        return <div className="swiper-sliding-content">{contentItems}</div>
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
    effect:"fade",
    axis:"x",
    controlSliding:false,
    contentSliding:false,
    onSelect:function(){}
}

export class SwiperItem extends Component{
    render(){
        const {active,scrollable,key} = this.props;
        const classes = classNames("swiper-item",{
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