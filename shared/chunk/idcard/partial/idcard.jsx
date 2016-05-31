'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../../lib/util.es6";
import Header from "../../common/header.jsx";
import Dialog from "../../../component/dialog.jsx";

class IDcard extends Component{
    constructor(props){
        super(props);
        this.state = {
            dialogActive:false,
            dialogOnConfirm:null,
            alertActive:false
        }
    }
    toggleDialog(){
        this.setState({
            dialogActive:!this.state.dialogActive
        })
    }
    handleUpdate(id){
        this.props.changeUpdate(id);
        this.props.changeScene.call(this,"updatecard");
    }
    handleDelete(id){
        this.setState({
            dialogActive:true,
            dialogOnConfirm:()=>{
                this.toggleDialog()
                this.props.deleteIDcard({id})
            }
        })
    }
    renderIDcardList(){
        const {idcardLIst,isFetched} = this.props.index;
        //console.log(idcardLIst,isFetched)
        if(!isFetched||idcardLIst.length==0) return null;
        return (
            <div className="list">
                {
                    idcardLIst.map((item,i)=>{
                        let key = 'idcard-'+i;
                        return (
                            <div className="list-item" key={key}>
                                <div className="listTitle">
                                    <span className="name">{item.name}</span>
                                    <span className="identity">{item.cardID}</span>
                                    <span className="attestation"><em></em>{item.statusName}</span>
                                </div>
                                <div className="pic_id">
                                    <span><img src={item.fontImgUrl} /></span>
                                    <span><img src={item.backImgUrl} /></span>
                                </div>
                                <div className="feedbackInfo">
                                    <p>身份信息审核内容反馈：反馈信息反馈信息反馈信息反馈信息反馈信息反馈信息......</p>
                                </div>
                                <div className="toolsArea">
                                    <a href="javascript:;" onClick={this.handleUpdate.bind(this,item)} className="pen"><em></em>编辑</a>
                                    <a href="javascript:;" onClick={this.handleDelete.bind(this,item.id)} className="del"><em></em>删除</a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    render(){
        const {idcardLIst} = this.props.index;
        if(idcardLIst.length>0){
            return (
                <div className="idcard-content">
                    <Header>
                        <span className="title">身份证管理</span>
                    </Header>
                    <div className="idcard-inner">
                        <div className="blub">
                            <p>根据海关政策规定，海外直邮的包裹需提供身份证照片进行入境申报，友阿海外购用户请如实提供身份证信息并确保所提供身份证与收货人完全一致。</p>
                        </div>
                        {this.renderIDcardList()}
                    </div>
                    <div className="addBtns">
                        <a href="javascript:;" onClick={this.props.changeScene.bind(this,"addcard")} className="addBtn">新&nbsp;增</a>
                    </div>
                    <Dialog active={this.state.dialogActive} 
                    onCancel={this.toggleDialog.bind(this)}
                    onConfrim={this.state.dialogOnConfirm}>确定要删除吗?</Dialog>
                </div>
            )
        }
        return (
            <div className="idcard-content">
                <Header>
                    <span className="title">身份证管理</span>
                </Header>
                <div className="idcard-inner">
                    <div className="empty">
                        <img src="/client/asset/images/empty_idcard.png" />
                        <span>目前还没有任何身份证信息哟~</span>
                        <a href="javascript:void(null)" className="empty_btn"
                        onClick={this.props.changeScene.bind(this,"addcard")}>新增</a>
                    </div>
                </div>
            </div>
        );
    }
}

IDcard.defaultProps = {
    dialogActive:false,
    onCheck:function(){}
};

export default IDcard;

