'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Slidable from "./slidable.jsx";

export class SlideTabs extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:props.activeIndex,
            // navbarSlidable:false
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextState.activeIndex !== this.state.activeIndex){
            return true
        }
        return false
    }
    handleSelect(i,e){
        e && e.preventDefault()
        // console.log('handleSelect')
        this.setState({
            activeIndex:i,
            // navbarSlidable:false
        },()=>this.props.onSelect())
    }
    handleActiveChange(i,e){
        this.setState({
            activeIndex:i,
            // navbarSlidable:true,
        })
    }
    componentDidMount(){
        this.initialize()
    }
    initialize(){
        let contentNode = ReactDOM.findDOMNode(this.refs["content"])
        if(this.props.axis === "x"){
            let contentNodeWidth = contentNode.offsetWidth * contentNode.children.length
            contentNode.style.width = `${contentNodeWidth}px`
        }else{
            let contentNodeHeight = contentNode.offsetHeight * contentNode.children.length
            contentNode.style.height = `${contentNodeHeight}px`
        }
    }
    renderNavbar(){
        let navigators = [];
        React.Children.forEach(this.props.children,(child,i)=>{
            const {navigator} = child.props;
            let classes = classNames("slide-tabs-navbar-item",{
                active:(i === this.state.activeIndex)
            })
            navigators.push(
                <div className={classes} key={i} onClick={this.handleSelect.bind(this,i)}>{navigator()}</div>
            )
        })
        if(this.props.navbarSlidable === true){
            return (
                <Slidable axis={this.props.axis} ref="navbar" name="navbar" 
                activeIndex={this.state.activeIndex}>
                    <div className="slide-tabs-navbar">{navigators}</div>
                </Slidable>
            )
        }
        return <div className="slide-tabs-navbar slide-tabs-navbar-fixed">{navigators}</div>
    }
    renderTabsItem(child,index){
        return React.cloneElement(child,Object.assign({},child.props,{
            active:(index === this.state.activeIndex),
            key:index
        }))
    }
    render(){
        const classes = classNames("slide-tabs",{
            "slide-tabs-vertical":this.props.axis === "y"
        })
        return (
            <div className={classes}>
            <Slidable axis={this.props.axis} handleActiveChange={this.handleActiveChange.bind(this)} 
            activeIndex={this.state.activeIndex}>
            <div className="slide-tabs-content" ref="content">{React.Children.map(this.props.children,this.renderTabsItem.bind(this))}</div>
            </Slidable>
            {this.renderNavbar()}
            </div>
        )
    }
}

SlideTabs.defaultProps = {
    activeIndex:0,
    axis:"x",
    navbarSlidable:true,
    onSelect:()=>{}
}

export class SlideTabsItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {key,active} = this.props;
        const classes = classNames("slide-tabs-item",this.props.className,{
            active
        })
        return (
            <div className={classes} key={key}>{this.props.children}</div>
        )
    }
}