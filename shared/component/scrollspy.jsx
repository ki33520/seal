'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import dom from "../../lib/dom.es6";
import util from "../../lib/util.es6";

class ScrollSpy extends Component{
    componentDidMount(){
        this.initialize();
    }
    initialize(){
        this.linkedNodes = React.findDOMNode(this).querySelectorAll(".anchor-point"),
        this.anchorNodes = [];
        Array.prototype.forEach.call(this.linkedNodes,(linkedNode)=>{
            const anchor = document.getElementById(linkedNode.dataset.anchor);
            if(anchor){
                this.anchorNodes.push(anchor);
            }
        });
    }
    checkVisible(element,relativeElement){
        // console.log(element.dataset.anchor)
        // console.log('scrollTop',relativeElement.scrollTop)
        // console.log('offsetTop',element.offsetTop)
        // console.log('height',element.offsetHeight)
        const offsetTop = element.offsetTop - 40;
        return offsetTop <= relativeElement.scrollTop && 
                (offsetTop + element.offsetHeight) >= relativeElement.scrollTop
    }
    handleScroll(){
        var visibleNodes = [],targetNodes = [];
        Array.prototype.forEach.call(this.linkedNodes,(linkedNode,i)=>{
            if(this.checkVisible(linkedNode,React.findDOMNode(this)) === true){
                visibleNodes.push(linkedNode);
                targetNodes.push(this.anchorNodes[i])
            }
        });
        if(visibleNodes.length === 0){
            return;
        }
        // console.log('visibleNodes',visibleNodes)
        const targetNode = targetNodes[0];
        Array.prototype.forEach.call(this.anchorNodes,(anchorNode)=>{
            dom.removeClass(anchorNode,"active");
        });
        dom.addClass(targetNode,"active");        
        // util.dispatchEvent(targetNode,'click');
    }
    render(){
        const classes = classNames(this.props.className,{
            "scroll-spy":true
        });
        return (
            <div className={classes} onScroll={this.handleScroll.bind(this)}>{this.props.children}</div>
        );
    }
}

export default ScrollSpy;