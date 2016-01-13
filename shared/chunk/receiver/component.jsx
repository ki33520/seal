'use strict';

import React,{Component} from "react";
import Receiver from "./partial/receiver.jsx";
import AddReceiver from "./partial/addreceiver.jsx";
import UpdateReceiver from "./partial/updatereceiver.jsx";
import {Router} from "director";
import {Switcher,SwitcherCase} from "../common/switcher.jsx"

import {fetchReceiver} from "./action.es6";

class ReceiverRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentRoute:null,
            prevRoute:null,
            currentParam:null
        }
    }
    componentDidMount(){
        Router({
            "/addreceiver":()=>{
                this.setState({
                    currentRoute:"addreceiver",
                    prevRoute:this.state.currentRoute
                });
            },
            "/updatereceiver/:id":(id)=>{
                this.setState({
                    currentRoute:"updatereceiver",
                    prevRoute:this.state.currentRoute,
                    currentParam:{id}
                });
            },
            "/receiver":()=>{
                this.setState({
                    currentRoute:"index",
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
        const {currentRoute,currentParam,prevRoute} = this.state;
        const {dispatch} = this.props;
        return (
            <Switcher currentRoute={currentRoute} prevRoute={prevRoute}>
                <SwitcherCase name="index">
                    <Receiver {...this.props.receiverByUser} {...this.props}/>
                </SwitcherCase>
                <SwitcherCase name="addreceiver">
                    <AddReceiver {...this.props.receiverByForm} {...this.props}/>
                </SwitcherCase>
                <SwitcherCase name="updatereceiver">
                    <UpdateReceiver {...this.props.receiverByForm} {...currentParam} {...this.props}/>
                </SwitcherCase>
            </Switcher>
        );
    }
}

export default ReceiverRouter;