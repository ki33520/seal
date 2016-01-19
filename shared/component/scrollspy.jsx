'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import dom from "../lib/dom.es6";

class ScrollSpy extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            inViewport:false
        }
    }
    getScrollElement(){
        return this.props.scrollBy === null ? window : document.querySelector(this.props.scrollBy);
    }
    componentDidMount(){
        this.checkVisble();
        // console.log('scrollElement',this.getScrollElement())
        dom.bindEvent(this.getScrollElement(),"scroll",this.checkVisble.bind(this));
    }
    componentWillUnmount(){
        dom.unbindEvent(this.getScrollElement(),"scroll",this.checkVisble.bind(this));
        if(this._timer){
            clearTimeout(this._timer)
        }
    }
    checkVisble(){
        // if(this.isMounted){
            const {diffInViewport,scrollBy} = this.props;
            const checkNode = ReactDOM.findDOMNode(this);
            const scrollNode = document.querySelector(scrollBy);
            let isVisible = dom.inViewport(checkNode,scrollNode,diffInViewport)
            // console.log('isVisible',isVisible)
            if(isVisible && !this.state.inViewport){
                if(this._timer){
                    clearTimeout(this._timer);
                }
                this._timer = setTimeout(()=>{
                    this.setState({
                        inViewport:true
                    })
                },this.props.delay)
            }
            if(this.repeat && !isVisible){
                this.setState({
                    inViewport:false
                })
            }
        // }
    }
    render(){
        const animation = this.state.inViewport ? this.props.animation:null
        let child = React.Children.only(this.props.children);
        return React.cloneElement(child,Object.assign({},child.props,{
            className:classNames(child.props.className,animation),
            delay:this.props.delay,
            inViewport:this.state.inViewport
        }))
    }
}   

ScrollSpy.defaultProps = {
    scrollBy:null,
    delay:100,
    diffInViewport:0,
    animation:"fade",
    repeat:false
}

export default ScrollSpy;