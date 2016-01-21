'use strict'

import React,{Component} from "react";
import Update from "./partial/update.jsx";
import UpdateBasic from "./partial/updatebasic.jsx";
import UpdatePassword from "./partial/updatepassword.jsx";
import UpdateMemberCard from "./partial/updatemembercard.jsx";
import {Router} from "director";
import {Switcher,SwitcherCase} from "../common/switcher.jsx";

class MemberUpdate extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentRoute:null,
            prevRoute:null
        }
    }
    componentDidMount(){
        Router({
            "/basic":()=>{
                this.setState({
                    currentRoute:"basic",
                    prevRoute:this.state.currentRoute
                });
            },
            "/password":()=>{
                this.setState({
                    currentRoute:"password",
                    prevRoute:this.state.currentRoute
                });
            },
            "/membercard":()=>{
                this.setState({
                    currentRoute:"membercard",
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
                <SwitcherCase name="index"><Update {...this.props}/></SwitcherCase>
                <SwitcherCase name="basic"><UpdateBasic {...this.props}/></SwitcherCase>
                <SwitcherCase name="password"><UpdatePassword {...this.props}/></SwitcherCase>
                <SwitcherCase name="membercard"><UpdateMemberCard {...this.props}/></SwitcherCase>
            </Switcher>
        );
    }
}

export default MemberUpdate;