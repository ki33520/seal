'use strict';

import React,{Component} from "react";
import Receiver from "./partial/receiver.jsx";
import AddReceiver from "./partial/addreceiver.jsx";
import UpdateReceiver from "./partial/updatereceiver.jsx";
import {Router} from "director";
import TransitionGroup from "react/lib/ReactCSSTransitionGroup";

import {fetchReceiver} from "./action.es6";

class ReceiverRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentRoute:"index",
            currentParam:null
        }
    }
    componentDidMount(){
        Router({
            "/addreceiver":()=>{
                this.setState({
                    currentRoute:"addreceiver"
                });
            },
            "updatereceiver/:id":(id)=>{
                this.setState({
                    currentRoute:"updatereceiver",
                    currentParam:{id}
                });
            },
            "receiver":()=>{
                this.setState({
                    currentRoute:"index"
                });
            },
            "/":()=>{
                this.setState({
                    currentRoute:"index"
                });
            }
        }).init("/");
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextState.currentRoute === "updatereceiver" 
            && this.state.currentRoute !== "updatereceiver"){
            const {dispatch} = this.props;
            dispatch(fetchReceiver("/updatereceiver/" + nextState.currentParam.id))
            return false;
        }
        // start requestReceiver
        if(this.state.currentRoute === "updatereceiver" && nextProps.receiverByForm.receiver === null){
            return false;
        }
        return true;
    }
    render(){
        const {currentRoute,currentParam} = this.state;
        const {dispatch} = this.props;
        var currentView = null;
        if(currentRoute === "index"){
            currentView =  (
                <Receiver {...this.props.receiverByUser} dispatch={dispatch} key={currentRoute}/>
            )
        }else if(currentRoute === "addreceiver"){
            currentView =  (
                <AddReceiver {...this.props.receiverByForm} dispatch={dispatch} key={currentRoute}/>
            )
        }else if(currentRoute === "updatereceiver"){
            currentView =  (
                <UpdateReceiver {...this.props.receiverByForm} {...currentParam} dispatch={dispatch} 
                key={currentRoute}/>
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

export default ReceiverRouter;