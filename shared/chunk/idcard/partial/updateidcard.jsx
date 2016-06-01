'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import Alert from "../../../component/alert.jsx";
import ActivityIndicator from "../../common/activityindicator.jsx";

class UpdateIdcard extends Component{
    constructor(props){
        super(props);
    }
    verifyIdCard(gets){
        var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];
        var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];
        if (gets.length == 15) {   
            return isValidityBrithBy15IdCard(gets);   
        }else if (gets.length == 18){   
            var a_idCard = gets.split("");
            if (isValidityBrithBy18IdCard(gets)&&isTrueValidateCodeBy18IdCard(a_idCard)) {   
                return true;   
            }   
            return false;
        }
        return false;
        function isTrueValidateCodeBy18IdCard(a_idCard) {   
            var sum = 0;
            if (a_idCard[17].toLowerCase() == 'x') {   
                a_idCard[17] = 10;
            }   
            for ( var i = 0; i < 17; i++) {   
                sum += Wi[i] * a_idCard[i];
            }   
            var valCodePosition = sum % 11;
            if (a_idCard[17] == ValideCode[valCodePosition]) {   
                return true;   
            }
            return false;   
        }
        function isValidityBrithBy18IdCard(idCard18){   
            var year = idCard18.substring(6,10);   
            var month = idCard18.substring(10,12);   
            var day = idCard18.substring(12,14);   
            var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
            if(temp_date.getFullYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){   
                return false;   
            }
            return true;   
        }
        function isValidityBrithBy15IdCard(idCard15){   
            var year =  idCard15.substring(6,8);   
            var month = idCard15.substring(8,10);   
            var day = idCard15.substring(10,12);
            var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
            if(temp_date.getYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){   
                return false;   
            }
            return true;
        }
    }
    componentWillReceiveProps(nextProps){
        const {alert,changeScene} = this.props;
        if(nextProps.isUpdateCarding === false &&
           this.props.isUpdateCarding === true){
            if(nextProps.isUpdateCarded === true){
                alert(nextProps.msg,1000);
                setTimeout(function(){
                    changeScene.call(this,"index");
                },1000)
            }else{
                alert(nextProps.msg,1000);
            }
        }
    }
    handleSubmit(){
        const {idcard,alert} = this.props;
        const {name,fontImg,backImg,backImgUrl,fontImgUrl,id,cardID} = idcard ? idcard : {};
        if(!this.verifyIdCard(cardID)){
            alert("身份证号码格式错误",2000);
            return false;
        }
        const param = {
            id:id,
            name:name,
            cardID:cardID,
            fontImg:fontImg,
            backImg:backImg,
            fontImgUrl:fontImgUrl,
            backImgUrl:backImgUrl
        }
        this.props.updateIDcard(param);
    }
    handleFieldChange(fieldName,e){
        e && e.preventDefault();
        this.props.changeField(fieldName,e.target.value);
    }
    handleChangeBackImg(event){
        var target = event.target;
        var files = target.files;
        var formData = new FormData();
        formData.append('backImg',files[0]);
        this.props.uploadBackImage({data:formData,type:"update"});
    }
    handleChangeFrontImg(event){
        var target = event.target;
        var files = target.files;
        var formData = new FormData();
        formData.append('frontImg',files[0]);
        this.props.uploadFrontImage({data:formData,type:"update"});
    }
    render(){
        const {idcard,alertActive,alertContent,isUploading} = this.props;
        const {name,fontImgUrl,backImgUrl,cardID} = idcard ? idcard : {};
        return (
            <div className="idcard-form-content">
                <Header onGoBack={this.props.changeScene.bind(this,"index")}>
                    <span className="title">身份证修改</span>
                    <a href="javascript:;" onClick={this.handleSubmit.bind(this)} className="screening">保存</a>
                </Header>
                <div className="idcard-form-inner">
                    <div className="identityUpload">
                        <div>
                            <em>身份证姓名</em>
                            <input type="text" value={name} disabled="disabled" />
                        </div>
                        <div>
                            <em>身份证号码</em>
                            <input type="text" value={cardID} placeholder="请输入身份证号码" onChange={this.handleFieldChange.bind(this,"cardID")} />
                        </div>
                        <div className="uploadArea">
                            <em>身份证照片</em>
                            <div className="pic_id">
                                <span id="id_front">
                                    <img src={fontImgUrl} />
                                    <a href="javascript:;">上传正面</a>
                                    <input accept="image/*" type="file" name="front" onChange={this.handleChangeFrontImg.bind(this)}/>
                                </span>
                                <span id="id_back">
                                    <img src={backImgUrl} />
                                    <a href="javascript:;">上传反面</a>
                                    <input accept="image/*" type="file" name="back" onChange={this.handleChangeBackImg.bind(this)}/>
                                </span>
                            </div>

                            <p className="info">说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容;说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明。</p>
                            
                            <div className="addBtns">
                                <a href="javascript:;" onClick={this.handleSubmit.bind(this)} className="addBtn">保&nbsp;存</a>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <Alert active={alertActive}>{alertContent}</Alert>
                <ActivityIndicator active={isUploading}/>
            </div>
        )
    }
}

export default UpdateIdcard;