'use strict';

import React,{Component} from "react";
import Index from "./partial/index.jsx";
import SearchBox from "./partial/search.jsx";
import {Router} from "director";
import TransitionGroup from "react/lib/ReactCSSTransitionGroup";

class IndexRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentRoute:"index"
        }
    }
    componentDidMount(){
        Router({
            "/search":()=>{
                this.setState({
                    currentRoute:"search"
                });
            },
            "/":()=>{
                this.setState({
                    currentRoute:"index"
                });
            }
        }).init("/");
    }
    render(){
        const {currentRoute} = this.state;
        var currentView = null;
        if(currentRoute === "index"){
            currentView =  (
                <Index {...this.props} key={currentRoute}/>
            )
        }else if(currentRoute === "search"){
            currentView =  (
                <SearchBox {...this.props} key={currentRoute}/>
            )
        }
        const transitionName = currentRoute !== 'index'?'moveRight':'moveLeft';
        return (
            <div className="router">
                <div className={currentRoute==="index"?"active":""}><Index {...this.props}/></div>
                <div className={currentRoute==="search"?"active":""}><SearchBox {...this.props}/></div>
            </div>
        );
    }
}

export default IndexRouter;