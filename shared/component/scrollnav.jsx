'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import dom from "../lib/dom.es6";

const ScrollNav = React.createClass({
    getInitialState(){
        return {
            activeIndex:0
        }
    },
    getDefaultProps(){
        return {
            delay:100,
            diffInViewport:0,
            navbarRenderer:()=>{}
        }
    },
    componentDidMount(){
        this.checkVisible()
        dom.bindEvent(ReactDOM.findDOMNode(this.refs["content"]),"scroll",this.checkVisible)
        // dom.unbindEvent(ReactDOM.findDOMNode(this.refs["content"]),"scroll",this.handleScroll)
    },
    componentWillUnmount(){
        if(this._timer){
            clearTimeout(this._timer)
        }
    },
    checkVisible(e){
        console.log('checkVisible')
        const {diffInViewport} = this.props;
        let activeIndex = [];
        let containerNode = ReactDOM.findDOMNode(this.refs["content"])
        for(let i = 0;i < containerNode.children.length;i++){
            let childNode = containerNode.children[i];
            if(dom.inViewport(childNode,containerNode,diffInViewport) === true){
                activeIndex.push(i)
            }
        }
        this._timer = setTimeout(()=>{
            this.setState({
                activeIndex:activeIndex[0]
            })
        },this.props.delay)
    },
    jumpTo(index,e){
        dom.unbindEvent(ReactDOM.findDOMNode(this.refs["content"]),"scroll",this.checkVisible)
        let containerNode = ReactDOM.findDOMNode(this.refs["content"])
        let checkNode = containerNode.children[index]

        dom.scrollInView(checkNode,containerNode,()=>{
            dom.bindEvent(ReactDOM.findDOMNode(this.refs["content"]),"scroll",this.checkVisible)
        })
        this._timer = setTimeout(()=>{
            this.setState({
                activeIndex:index
            })
        },this.props.delay)
    },
    renderNavbar(){
        const {navbarRenderer} = this.props;
        const {activeIndex} = this.state;
        let navbarItems = navbarRenderer.call(this)
        return navbarItems.map((navbarItem,i)=>
            <ScrollNavbarAnchor key={i} 
            jumpTo={this.jumpTo.bind(this,i)}
            active={i === activeIndex}
            >{navbarItem}</ScrollNavbarAnchor>
        )
    },
    render(){
        const classes = classNames(this.props.className,"scroll-nav-content");
        return (
            <div className="scroll-nav">
            <div className="scroll-navbar">{this.renderNavbar()}</div>
            <div className={classes} ref="content" 
            >{this.props.children}</div>
            </div>
        );
    }
})

class ScrollNavbarAnchor extends Component{
    render(){
        const classes = classNames("scroll-navbar-anchor",{
            "active":this.props.active
        })
        return (
            <div className={classes} onClick={this.props.jumpTo}>{this.props.children}</div>
        )
    }
}

export default ScrollNav;