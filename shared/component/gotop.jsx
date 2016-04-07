'use strict'
import React,{Component} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import classNames from "classnames";
import dom from "../lib/dom.es6";
import Icon from "./icon.jsx";
import SmoothScroll from "../lib/dom/smoothscroll.es6";
// import IScroll from "../lib/dom/iscroll.js";

class GoTop extends Component{
    constructor(props){
        super(props);
        this.state = {
            active:false
        };
        this.smoothScroll = null
    }
    toggleVisble(scrollTop){
        if(scrollTop > 50){
            this.setState({active:true})
        }else{
            this.setState({active:false});
        }
    }
    handleScroll(){
        let scrollTop = dom.scrollTop(this.scrollNode)
        if(this.props.smooth){
            scrollTop = -(this.smoothScroll.getComputedPosition().y)
        }
        this.toggleVisble(scrollTop)
        this.props.onScroll(this.scrollNode,scrollTop)
        if(this.props.smooth){
            this.smoothScroll.refresh()
        }
    }
    componentDidMount(){
        this.scrollNode = window
        if(this.props.relative){
            this.scrollNode = ReactDOM.findDOMNode(this.refs["scrollNode"])
        }
        if(this.props.smooth){
            this.smoothScroll = new SmoothScroll(this.scrollNode,{
                click:true,
                preventDefault:true,   
            })
            this.smoothScroll.on("scroll",this.handleScroll.bind(this))
            this.smoothScroll.on("scrollEnd",()=>{
                const scrollTop = -(this.smoothScroll.getComputedPosition().y)
                if(scrollTop <= 50){
                    this.setState({active:false})
                }
            })
        }else{
            dom.bindEvent(this.scrollNode,'scroll',_.debounce(this.handleScroll.bind(this),10))
        }
    }
    componentWillUnmount(){
        if(this.props.smooth){
            this.smoothScroll.destory()
        }else{
            dom.unbindEvent(this.scrollNode,'scroll',_.debounce(this.handleScroll.bind(this),10))
        }
    }
    backToTop(){
        if(this.props.smooth){
            this.smoothScroll.scrollTo(0,0,300)
        }else{
            dom.scrollTop(this.scrollNode,0)
        }
        // smoothScroll(this.scrollNode);
    }
    renderButton(){
        const classes = classNames({
            "back-to-top":true,
            "active":this.state.active
        });
        return (
            <div className={classes}>
                <a href={null} onClick={this.backToTop.bind(this)}>
                <Icon icon="up"/>
                </a>
            </div>
        )        
    }
    render(){
        if(this.props.relative){
            const {renderFixed} = this.props
            const classes = classNames("back-to-top-inner",{
                scrollable:this.props.scrollable,
                smooth:this.props.smooth
            })
            return (
                <div className="back-to-top-container">
                {this.renderButton()}
                {renderFixed()}
                <div className={classes} ref="scrollNode">
                {this.props.children}
                </div>
                </div>
            )
        }
        return this.renderButton()
    }
}

GoTop.defaultProps = {
    scrollable:true,
    smooth:false,
    relative:false,
    renderFixed:()=>{},
    onScroll:()=>{}
}

export default GoTop;