'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Icon from "../icon.jsx";

class Checkbox extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked:props.checked
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.checked !== this.props.checked){
            if(!nextProps.disabled){
                this.setState({
                    checked:nextProps.checked
                });
            }
        }
    }
    handleChange(e){
        // e && e.preventDefault();
        const {onChange,disabled}= this.props;
        if(disabled){
            return false
        }
        this.setState({
            checked:!this.state.checked
        },()=>{
            onChange(this.state.checked);
        })
    }
    render(){
        const {type,name,disabled} = this.props;
        const {checked} = this.state;
        var checkedIcon = "check",uncheckIcon = "check-empty";
        checkedIcon = this.props.checkedIcon ? this.props.checkedIcon:checkedIcon;
        uncheckIcon = this.props.uncheckIcon ? this.props.uncheckIcon:uncheckIcon;
        const classes = classNames("checkbox",this.props.className,{
            checked,
            disabled,
        });
        return (
            <div className={classes} onClick={this.handleChange.bind(this)}>
            {this.state.checked?(
            <Icon icon={checkedIcon} className="checked"/>
            ):(
            <Icon icon={uncheckIcon} className="unchecked"/>
            )}
            </div>
        )
    }
}

Checkbox.defaultProps = {
    checked:false,
    disabled:false,
    onChange:function(){}
}

export default Checkbox;