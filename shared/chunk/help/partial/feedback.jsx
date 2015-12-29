'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";

import {changeFeedback,changeField} from "../action.es6";
import {alert} from "../../common/action.es6";
import Alert from "../../../component/alert.jsx";


class Normal extends Component{
    constructor(props){
        super(props);
    }
    handleFieldChange(fieldName,e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        dispatch(changeField(fieldName,e.target.value));
    }
    handleChangeFeedback(e){
        e && e.preventDefault();
        const {dispatch,feedbackByForm} = this.props;
        const {feedback} = feedbackByForm;
        dispatch(changeFeedback("/sendfeedback",{
            feedback
        }));
    }
    componentWillReceiveProps(nextProps){
        const {dispatch} = this.props
        if(nextProps.feedbackByForm.feedbackChanging === false &&
           this.props.feedbackByForm.feedbackChanging === true){
            if(nextProps.feedbackByForm.feedbackChanged === true){
                dispatch(alert("保存成功!",2000));
                setTimeout(()=>window.history.back(),2500);
            }else{
                dispatch(alert(nextProps.feedbackByForm.errMsg,2000));
            }
        }
    }
    render(){
        const {feedback,alertContent,alertActive} = this.props.feedbackByForm;
        return (
            <div className="help-content">
                <Header>
                    <span className="title">意见反馈</span>
                    <span className="btn-right" onClick={this.handleChangeFeedback.bind(this)}><a>保存</a></span>
                </Header>
                <div className="form-item">
                    <div className="feedback">
                        <textarea value={feedback} onChange={this.handleFieldChange.bind(this,"feedback")} placeholder="请输入您反馈的内容，我们将不断改进"></textarea>
                    </div>
                </div>
                <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        );
    }
}

export default Normal;