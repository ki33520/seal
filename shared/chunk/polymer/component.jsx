'use strict';

import React,{Component} from "react";
import Polymer from "./partial/polymer.jsx";
import AllBrands from "./partial/allbrands.jsx";
import SearchBox from "./partial/search.jsx";
import {Router} from "director";
import {Switcher,SwitcherCase} from "../common/switcher.jsx"

class PolymerRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentRoute:null,
            prevRoute:null
        }
    }
    componentDidMount(){
        Router({
            "/allbrands":()=>{
                this.setState({
                    currentRoute:"allbrands",
                    prevRoute:this.state.currentRoute
                });
            },
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
                <SwitcherCase name="index"><Polymer {...this.props}/></SwitcherCase>
                <SwitcherCase name="allbrands"><AllBrands {...this.props}/></SwitcherCase>
                <SwitcherCase name="search"><SearchBox {...this.props}/></SwitcherCase>
            </Switcher>
        );
    }
}

export default PolymerRouter;