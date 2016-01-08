'use strict';

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import Header from "../../common/header.jsx";
import Datepicker from "./datepicker.jsx";

import {changeBasic,changeField} from "../action.es6";
import {alert} from "../../common/action.es6";
import Alert from "../../../component/alert.jsx";

class UpdateBasic extends Component{
    constructor(props){
        super(props);
        const {createdAt} = props.basicByForm;
        var date = new Date(createdAt),
            year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDate();
        var max = (new Date(year,month,0)).getDate();  
        
        this.state = {
            year: year,
            month: month< 10 ? '0'+month : month,
            day: day,
            max: max
        }
    }
    componentDidMount(){
        const {dispatch} = this.props;
        const birthdy = this.state.year+"-"+this.state.month+'-'+this.state.day;
        dispatch(changeField('birthdy',birthdy));
    }
    handleFieldChange(fieldName,e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        dispatch(changeField(fieldName,e.target.value));
    }
    handleChangeBasic(e){
        e && e.preventDefault();
        const {dispatch,basicByForm} = this.props;
        const {nickName,gender,birthdy} = basicByForm;
        dispatch(changeBasic("/updatebasic",{
            nickName,gender,birthdy
        }));
    }
    componentWillReceiveProps(nextProps){
        const {dispatch} = this.props;
        if(nextProps.basicByForm.basicChanging === false &&
           this.props.basicByForm.basicChanging === true){
            if(nextProps.basicByForm.basicChanged === true){
                dispatch(alert("保存成功!",2000));
                setTimeout(()=>window.history.back(),2500);
            }else{
                dispatch(alert(nextProps.basicByForm.errMsg,2000));
            }
        }
    }
    birthdyChange(fieldName,e){
        e && e.preventDefault();
        const {dispatch} = this.props;

        var object = {};
        const name = e.target.name;
        object[name] = e.target.value;

        var obj = Object.assign({},this.state,object);
        object.max = (new Date(obj.year,obj.month, 0)).getDate();
        this.setState(object);
        const birthdy = obj.year+"-"+obj.month+'-'+obj.day;
        dispatch(changeField(fieldName,birthdy));
    }
    render(){
        const {dispatch,basicByForm} = this.props;
        const {nickName,gender,birthdy,alertContent,alertActive} = basicByForm;
        return (
            <div className="basic-content">
                <Header>
                    <span className="title">基本信息</span>
                    <span className="btn-right" onClick={this.handleChangeBasic.bind(this)}><a>保存</a></span>
                </Header>
                <div className="form-item">
                    <div className="label-item">
                        <label>昵称</label>
                        <input type="text" placeholder="请填写" name="nickName" value={nickName} onChange={this.handleFieldChange.bind(this,"nickName")}/>
                    </div>
                    <div className="tips">4-20个字符，可全部有字母组成，或数字、字母、“_”、“-”任意两种以上组合</div>
                </div>
                <div className="form-item">
                    <div className="label-item">
                        <label>性别</label>
                        <select value={gender} defaultValue={gender} name="gender" onChange={this.handleFieldChange.bind(this,"gender")}>
                            <option value="-1">请选择</option>
                            {
                                _.map(["保密","男","女"],function(a,b){
                                    return (<option key={b} value={b}>{a}</option>);
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="form-item">
                    <Datepicker {...this.state} birthdyChange={this.birthdyChange.bind(this)} />
                    <div className="tips">填生日有惊喜哦！</div>
                </div>

                <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        );
    }
}

export default UpdateBasic;