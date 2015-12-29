'use strict'

import React,{Component} from "react";
import HelpMain from "./partial/main.jsx";
import Normal from "./partial/normal.jsx";
import Shipment from "./partial/shipment.jsx";
import Tariff from "./partial/tariff.jsx";
import Parcel from "./partial/parcel.jsx";
import Onlineservice from "./partial/onlineservice.jsx";
import Feedback from "./partial/feedback.jsx";
import {Router} from "director";
import TransitionGroup from "react/lib/ReactCSSTransitionGroup";

import {alert} from "../common/action.es6";

class HelpList extends Component{
    constructor(props){
        super(props);
        this.state = {
            helpInfo: props.helpInfo,
            currentRoute: "index"
        }
    }
    componentDidMount(){
        Router({
            "normal":()=>{
                this.setState({
                    currentRoute:"normal"
                })
            },
            "shipment":()=>{
                this.setState({
                    currentRoute:"shipment"
                })
            },
            "tariff":()=>{
                this.setState({
                    currentRoute:"tariff"
                })
            },
            "parcel":()=>{
                this.setState({
                    currentRoute:"parcel"
                })
            },
            "onlineservice":()=>{
                this.setState({
                    currentRoute:"onlineservice"
                })
            },
            "feedback":()=>{
                this.setState({
                    currentRoute:"feedback"
                })
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
                <HelpMain {...this.props} key={currentRoute}/>
            )
        }else if(currentRoute === "normal"){
            currentView = (
                <Normal {...this.props} key={currentRoute} />
            )
        }else if(currentRoute === "shipment"){
            currentView = (
                <Shipment {...this.props} key={currentRoute} />
            )
        }else if(currentRoute === "tariff"){
            currentView = (
                <Tariff {...this.props} key={currentRoute} />
            )
        }else if(currentRoute === "parcel"){
            currentView = (
                <Parcel {...this.props} key={currentRoute} />
            )
        }else if(currentRoute === "onlineservice"){
            currentView = (
                <Onlineservice {...this.props} key={currentRoute} />
            )
        }else if(currentRoute === "feedback"){
            currentView = (
                <Feedback {...this.props} key={currentRoute} />
            )
        }
        
        const transitionName = currentRoute !== 'index'?'moveRight':'moveLeft';
        return (
            <TransitionGroup component="div" transitionName={transitionName} transitionLeave={false}>
                {currentView}
            </TransitionGroup>
        );
    }
}


export default HelpList;