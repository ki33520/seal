'use strict';

import React,{Component} from "react";
import Index from "./partial/index.jsx";
import SearchBox from "./partial/search.jsx";
import {Router} from "director";
import {Switcher,SwitcherCase} from "../common/switcher.jsx"

class TrendyRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentRoute:null,
            prevRoute:null
        }
    }
    componentDidMount(){
        Router({
            "/search":()=>{
                this.setState({
                    currentRoute:"search",
                    prevRoute:this.state.currentRoute
                });
            },
            "/":()=>{
                this.setState({
                    currentRoute:"index",
                    prevState:this.state.currentRoute
                });
            }
        }).init("/");
    }
    render(){
        const {currentRoute,prevRoute} = this.state;
        return (
            <Switcher currentRoute={currentRoute} prevRoute={prevRoute}>
                <SwitcherCase name="index"><Index {...this.props}/></SwitcherCase>
                <SwitcherCase name="search"><SearchBox {...this.props} /></SwitcherCase>
            </Switcher>
        );
    }
}

export default TrendyRouter;