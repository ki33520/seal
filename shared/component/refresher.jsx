'use strict'
import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import dom from "../lib/dom.es6";

class Refresher extends React.Component{
    componentDidMount(){
        this.scrollNode = ReactDOM.findDOMNode(this).parentNode
        // console.log('scrollNode',this.scrollNode)
        dom.bindEvent(this.scrollNode,"scroll",(e)=>{
            this.handleScroll(this.scrollNode)
        })
    }
    handleScroll(scrollNode){
        const {handleRefresh,threshold} = this.props
        let scrollTop = dom.scrollTop(scrollNode)
        if((scrollNode.offsetHeight + scrollTop + threshold) >= scrollNode.scrollHeight){
            handleRefresh()
        }
    }
    componentWillUnmount(){
        dom.unbindEvent(this.scrollNode,"scroll",(e)=>{
            this.handleScroll(this.scrollNode)
        })
    }
    render(){
        var classes = classNames({
            "refresher":true,
            "refresher-active":this.props.active
        })
        return (
            <div className={classes}>
                <span className="iconfont icon-loading animate-spin"></span>正在加载
            </div>
        );
    }
}

Refresher.defaultProps = {
    threshold:10,
    handleRefresh:()=>{}
}

export default Refresher;