'use strict';

import React,{Component} from "react";
import OrderDetail from "./partial/orderdetail.jsx";
import Logistics from "./partial/logistics.jsx";
import Comment from "./partial/comment.jsx";
import {Router} from "director";
import {Switcher,SwitcherCase} from "../common/switcher.jsx";

class OrderDetailRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentRoute:null,
            prevRoute:null
        }
    }
    componentDidMount(){
        Router({
            "/logistics":()=>{
                this.setState({
                    currentRoute:"logistics",
                    prevRoute:this.state.currentRoute
                });
            },
            "/comment":()=>{
                this.setState({
                    currentRoute:"comment",
                    prevRoute:this.state.currentRoute
                });
            },
            "/":()=>{
                this.setState({
                    currentRoute:"index",
                    prevRoute:this.state.currentRoute
                });
            }
        }).init("/");
    }
    render(){
        const {currentRoute,prevRoute} = this.state;
        return (
            <Switcher currentRoute={currentRoute} prevRoute={prevRoute}>
            <SwitcherCase name="index"><OrderDetail {...this.state} {...this.props}/></SwitcherCase>
            <SwitcherCase name="logistics"><Logistics {...this.state} {...this.props}/></SwitcherCase>
            <SwitcherCase name="comment"><Comment {...this.state} {...this.props}/></SwitcherCase>
            </Switcher>
        );
    }
}

export default OrderDetailRouter;