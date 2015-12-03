'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Icon from "../icon.jsx";

class Checkbox extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked:props.checked
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(this.state.checked === false && prevState.checked === true){
            React.findDOMNode(this.refs.checkInput).checked = false; 
        }
        if(this.state.checked === true && prevState.checked === false){
            React.findDOMNode(this.refs.checkInput).checked = true; 
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.checked !== this.props.checked){
            this.setState({
                checked:nextProps.checked
            });
        }
    }
    handleChange(e){
        // e && e.preventDefault();
        const {onChange}= this.props;
        this.setState({
            checked:!this.state.checked
        },()=>{
            onChange(this.state.checked);
        })
    }
    render(){
        const {type,name} = this.props;
        const {checked} = this.state;
        var checkedIcon = "check",uncheckIcon = "check-empty";
        var checkInput = (
            <input type="checkbox" onChange={this.handleChange.bind(this)} ref="checkInput" defaultChecked={checked}/>
        );
        if(type === "radio"){
            checkedIcon = "dot-circled";
            uncheckIcon = "circle-empty";
            checkInput = (<input type="radio" name={name} onChange={this.handleChange.bind(this)} defaultChecked={checked} 
            ref="checkInput"/>);
        }
        checkedIcon = this.props.checkedIcon ? this.props.checkedIcon:checkedIcon;
        uncheckIcon = this.props.uncheckIcon ? this.props.uncheckIcon:uncheckIcon;
        const classes = classNames("checkbox",this.props.className);
        return (
            <div className={classes}>
            {checkInput}
            <Icon icon={checkedIcon} className="checked"/>
            <Icon icon={uncheckIcon} className="unchecked"/>
            </div>
        )
    }
}

Checkbox.defaultProps = {
    type:"checkbox",
    checked:false,
    onChange:function(){}
}

export default Checkbox;