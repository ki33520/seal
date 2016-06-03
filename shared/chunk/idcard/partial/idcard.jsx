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
            dialogContent:null,
            dialogOnConfirm:null,
            popupActive:false,
            popupImg:null
        }
    }
    toggleDialog(){
        this.setState({
            dialogActive:!this.state.dialogActive
        })
    }
    togglePopupActive(type,event){
        this.setState({
            popupActive: type,
            popupImg: event.target.src || null
        });
    }
    handleUpdate(id){
        this.setState({
            dialogActive:true,
            dialogContent: "您已填写身份证信息,如果有误,请修改",
            dialogOnConfirm:()=>{
                this.toggleDialog();
                this.props.fetchCardById(id);
                this.props.changeScene("updatecard");
            }
        })
    }
    handleDelete(id,index){
        this.setState({
            dialogActive:true,
            dialogContent: "删除身份证可能导致无法清关,是否删除?",
            dialogOnConfirm:()=>{
                this.toggleDialog();
                this.props.deleteIDcard({id,index});
            }
        })
    }
    renderIDcardList(){
        const {idcardLIst,isFetched} = this.props;
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
                                    <span className="identity">{item.number}</span>
                                </div>
                                <div className="pic_id">
                                    <span><img onClick={this.togglePopupActive.bind(this,true)} src={item.frontImgUrl} /></span>
                                    <span><img onClick={this.togglePopupActive.bind(this,true)} src={item.backImgUrl} /></span>
                                </div>
                                {
                                    item.remark ? (<div className="feedbackInfo"><p>{item.remark}</p></div>) :  null
                                }
                                <div className="toolsArea">
                                    {item.status!=="2"?null:(<a className="attestation"><em></em>已认证</a>)}
                                    {item.status==="2"?null:(<a href="javascript:;" onClick={this.handleUpdate.bind(this,item.id)} className="pen"><em></em>编辑</a>)}
                                    <a href="javascript:;" onClick={this.handleDelete.bind(this,item.id,i)} className="del"><em></em>删除</a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    renderImgView(){
        const classes = classNames({
            "img-view":true,
            "active":this.state.popupActive
        });
        return (
            <div onClick={this.togglePopupActive.bind(this,false)} className={classes}>
                <div className="img-view-inner">
                    <img src={this.state.popupImg} />
                </div>
            </div>
        )
    }
    render(){
        const {idcardLIst,isFetched} = this.props;
        const disabled = idcardLIst.length>=10;
        const classes = classNames({
            "addBtn":true,
            "disabled": disabled
        });
        if(isFetched&&idcardLIst.length>0){
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
                        {
                            disabled ? (<a href="javascript:;" className={classes}>新&nbsp;增</a>) : (<a href="javascript:;" onClick={this.props.changeScene.bind(this,"addcard")} className={classes}>新&nbsp;增</a>)
                        }
                        
                    </div>
                    {this.renderImgView()}
                    <Dialog active={this.state.dialogActive} 
                    cancelText={'取消'} confirmText={'确定'}
                    onCancel={this.toggleDialog.bind(this)}
                    onConfrim={this.state.dialogOnConfirm}>{this.state.dialogContent}</Dialog>
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

