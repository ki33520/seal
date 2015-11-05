'use strict'

import React,{Component,addons} from "react";
import util from "../../lib/util.es6";

const listeners = [];

function checkVisble(component){
    let node = React.findDOMNode(component);
    let {top,bottom} = node.getBoundingClientRect();
    let scrollTop = util.scrollTop();

    let elementTop = top + scrollTop;
    let elementHeight = bottom - top;
    let windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;

    if ((elementTop < (scrollTop + windowInnerHeight + component.props.offset)) &&
          ((elementTop + elementHeight + component.props.offset) > scrollTop)) {
        component.setState({
            visible:true
        });
    }
}

function lazyLoadHandler(){
    listeners.forEach((listener)=>{
        checkVisble(listener);
    })
}

class LazyLoad extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false
        }
    }
    componentDidMount(){
        util.bindEvent(window,'scroll',lazyLoadHandler)
        listeners.push(this);
        checkVisble(this);
    }
    componentWillUnmount(){
        const index = listeners.indexOf(this);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
    }
    render(){
        return (
            React.cloneElement(this.props.children,{
                visible:this.state.visible
            })
        )
    }
}

LazyLoad.defaultProps = {
      offset: 0,
      scroll: true,
      resize: false
};

export default LazyLoad;
