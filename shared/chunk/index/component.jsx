'use strict';

import React,{Component} from "react";
import Index from "./partial/index.jsx";
import SearchBox from "./partial/search.jsx";
import {Router} from "director";
import {Switcher,SwitcherCase} from "../common/switcher.jsx"

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
        return (
            <Switcher currentRoute={currentRoute}>
                <SwitcherCase name="index"><Index {...this.props}/></SwitcherCase>
                <SwitcherCase name="search"><SearchBox {...this.props}/></SwitcherCase>
            </Switcher>
        );
    }
}

export default IndexRouter;