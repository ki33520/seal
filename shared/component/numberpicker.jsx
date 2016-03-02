'use strict';

import React,{Component} from "react";
import Icon from "./icon.jsx";

class NumberPicker extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:this.props.value
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.value !== this.props.value){
            this.setState({
                value:nextProps.value
            })
        }
    }
    handleIncrease(e){
        e && e.preventDefault();
        var value = this.state.value;
        // console.log(value)
        const {maximum,step,onChange} = this.props;
        if(maximum !== null && value >= maximum){
            return;
        }
        value += step;
        this.setState({
            value
        },()=>{
            onChange(value);
        })
    }
    handleDecrease(e){
        e && e.preventDefault();
        var value = this.state.value;
        const {minimum,step,onChange} = this.props;
        // console.log(value,minimum)
        if(minimum !== null && value <= minimum){
            return;
        }
        value -= step;
        this.setState({
            value
        },()=>{
            onChange(value);
        })
    }
    handleChange(e){
        e && e.preventDefault()
        let inputValue = e.target.value
        inputValue = parseInt(inputValue)
        if(Number.isNaN(inputValue) || Number.isFinite(inputValue)){
            return
        }
        this.setState({
            value:inputValue
        },()=>this.props.onChange(inputValue))
    }
    render(){
        const {readonly,type} = this.props;
        return (
            <div className="number-picker">
            <div onClick={this.handleDecrease.bind(this)}><Icon icon="minus"/></div>
            <input type={type} readOnly={readonly} onChange={this.handleChange.bind(this)} value={this.state.value}/>
            <div onClick={this.handleIncrease.bind(this)}><Icon icon="plus"/></div>
            </div>
        )
    }
}

NumberPicker.defaultProps = {
    value:0,
    type:"text",
    readonly:true,
    minimum:0,
    maximum:null,
    step:1,
    onChange:function(){}
};

export default NumberPicker;