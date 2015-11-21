'use strict'

import React,{Component} from "react";
import Update from "./partial/update.jsx";
import UpdateBasic from "./partial/updatebasic.jsx";
// import UpdatePassword from "./partial/updatepassword.jsx";
// import UpdateMemberCard from "./partial/updatemembercard.jsx";
import {Router} from "director";
import TransitionGroup from "react/lib/ReactCSSTransitionGroup";

class MemberUpdate extends Component{
    constructor(props){
        super(props);
        this.state = {
            memberInfo: props.memberInfoByUser.memberInfo,
            currentRoute: "index"
        }
    }
    componentDidMount(){
        Router({
            "/basic":()=>{
                this.setState({
                    currentRoute:"updatebasic"
                });
            },
            // "/password":()=>{
            //     this.setState({
            //         currentRoute:"updatepassword"
            //     });
            // },
            // "/membercard":()=>{
            //     this.setState({
            //         currentRoute:"updatemembercard"
            //     });
            // },
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
                <Update {...this.props} key={currentRoute}/>
            )
        }
        else if(currentRoute === "updatebasic"){
            currentView =  (
                <UpdateBasic {...this.props} key={currentRoute}/>
            )
        }
        // else if(currentRoute === "updatepassword"){
        //     currentView =  (
        //         <UpdatePassword {...this.props} key={currentRoute}/>
        //     )
        // }else if(currentRoute === "updatemembercard"){
        //     currentView =  (
        //         <UpdateMemberCard {...this.props} key={currentRoute}/>
        //     )
        // }
        const transitionName = currentRoute !== 'index'?'moveRight':'moveLeft';
        return (
            <TransitionGroup component="div" transitionName={transitionName} transitionLeave={false}>
                {currentView}
            </TransitionGroup>
        );
    }
}

export default MemberUpdate;