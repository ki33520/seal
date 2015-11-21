'use strict'

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import dom from "../../lib/dom.es6";
import {apiRequest} from "../../lib/util.es6";
import Slider from "../../component/slider/slider.jsx";
import Slide from "../../component/slider/slide.jsx";
import NumberPicker from "../../component/numberpicker.jsx";
import PullHook from "../../component/pullhook.jsx";
import Alert from "../../component/alert.jsx";
import Header from "../common/header.jsx";

import Node from "./partial/node.jsx";
import Datepicker from "./partial/datepicker.jsx";
import {postMemberInfo,changeNickname,changeGender,changeBirthdy} from "./action.es6";
import {alert} from "../common/action.es6";

class MemberUpdateBasic extends Component{
    constructor(props){
        super(props);
        this.state = {
            memberInfo: props.memberInfoByUser.memberInfo
        }
    }
    nicknameChange(e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        dispatch(changeNickname("nickname",e.target.value));
        console.log(this.state);
    }
    genderLoad(e){
        e && e.preventDefault();
        const {gender} = this.state.memberInfo;
        console.log(gender)
    }
    genderChange(e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        dispatch(changeGender("gender",e.target.value));
    }
    birthdyChange(selectedBirthday,e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        dispatch(changeBirthdy("birthdy",selectedBirthday));
    }
    updateInfo(e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        const {memberInfo} = this.props.memberInfoByUser;
        dispatch(postMemberInfo("/updatememberbasic",{
            memberId: memberInfo.memberId,
            nickname: memberInfo.nickname,
            gender: memberInfo.gender,
            birthdy: '1990-09-02'
        }));
    }
    render(){
        const {memberInfo} = this.props.memberInfoByUser; 
        var genderList = [];
        ["保密","男","女"].map(function(a,b){
            var option;
            if(memberInfo.gender != "" && Number(memberInfo.gender) === b){
                option = <option defaultValue={b} value={b}>{a}</option>;
            }else{
                option = <option value={b}>{a}</option>;
            };
            genderList.push(option);
        });
        var tpl = (
            <div className="memberupdatebasic-content">
                <Header title="账户设置">
                    <span onClick={this.updateInfo.bind(this)}><a>保存</a></span>
                </Header>
                <div className="form-item">
                    <div className="label-item">
                        <label>昵称</label>
                        <input onChange={this.nicknameChange.bind(this)} value={memberInfo.nickname} placeholder="请填写" type="text" />
                    </div>
                    <div className="tips">4-20个字符，可全部有字母组成，或数字、字母、“_”、“-”任意两种以上组合</div>
                </div>
                <div className="form-item">
                    <div className="label-item">
                        <label>性别</label>
                        <select defaultValue={memberInfo.gender} ref="genderSelect" onChange={this.genderChange.bind(this)}>
                            <option>请选择</option>
                            {genderList}
                        </select>
                    </div>
                </div>
                <div className="form-item">
                    <Datepicker memberInfo={memberInfo} birthdyChange={this.birthdyChange.bind(this)} />
                    <div className="tips">填生日有惊喜哦！</div>
                </div>
            </div>
        );
        return tpl;
    }
}

export default MemberUpdateBasic;