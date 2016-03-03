'use strict';

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import Header from "../../common/header.jsx";
import StatusProgress from "./statusprogress.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import GoTop from "../../../component/gotop.jsx";

import {changeField,saveComment} from "../action.es6";
import {alert} from "../../common/action.es6";
import Alert from "../../../component/alert.jsx";

class Comment extends Component{
    handleStar(name,pid,val,e){
        const {changeField} = this.props;
        var rate = val>3 ? val : 3;
        changeField(name,rate,pid);
    }
    handleContent(name,pid,e){
        const {changeField} = this.props;
        changeField(name,e.target.value,pid);
    }
    handleIsOpen(name,e){
        const {changeField} = this.props;
        var checked = e.target.checked ? 0 : 1;
        changeField(name,checked);
    }
    handleSave(e){
        e && e.preventDefault();
        const {saveComment,alert} = this.props;
        var {order,isOpen} = this.props.orderByParam;
        const {itemList} = order;
        var hasNotComment = _.filter(itemList, function(o){ return !o.hasComment;});
        var obj = new Array();
        hasNotComment.map((v,k)=>{
            const {rate,id,content} = v;
            var len = content ? content.length : 0;
            if(len>0 && len<501){
                obj.push({
                    rate: rate ? rate : 5,
                    content: content,
                    isOpen: isOpen,
                    itemId: id,
                })
            }
            
        });
        if(obj.length>0){
            if(this.props.orderByParam.saveCommentChanging !== true){
                saveComment("/savecomment",{
                    json: obj,
                    commentsJson: JSON.stringify(obj)
                });
            }
        }else{
            alert("请填写评论内容，字数在1-500个字之间",2000);
        }
    }
    componentWillReceiveProps(nextProps){
        const {alert} = this.props;
        if(nextProps.orderByParam.saveCommentChanging === false &&
           this.props.orderByParam.saveCommentChanging === true){
            if(nextProps.orderByParam.saveCommentChanged === true){
                alert(nextProps.orderByParam.msg,2000);
                setTimeout(()=>window.history.back(),2500);
                console.log(this.props)
            }else{
                alert(nextProps.orderByParam.msg,2000);
            }
        }
    }
    renderItems(items){
        return items.map((v,k)=>{
            var {singleImageUrl,singleTitle,salesPrice,id,rate,hasComment} = v;
            if(!rate){
                rate = 5;
            }
            var stars = [];
            for(let i=1;i<=5;i++){
                const starClass = classNames({
                    "iconfont":true,
                    "hasCommented": hasComment,
                    "icon-star-empty": rate<i,
                    "icon-star-full": rate>=i
                });
                if(hasComment){
                    stars.push(<div key={i} className={starClass}></div>)
                }else{
                    stars.push(<div key={i} onTouchStart={this.handleStar.bind(this,"rate",id,i)} className={starClass}></div>)
                }
            };
            return (
                <div className="commentBaby_list" key={k}>
                    <div className="J_moveRight">
                        <div className="clearfix">
                            <a className="J_ytag cartlist" href={"/gooddetail/"+v.singleCode}>
                                <span className="img_wrap">
                                    <img src={v.singleImageUrl}/>
                                </span>
                            </a>
                            <div className="gd_info">
                                <p className="name">{v.singleTitle}</p>
                                <p className="value"><i>&yen;</i><span>{v.salesPrice.toFixed(2)}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="comment_area clearfix">
                        <span><em></em>评论</span>
                        <div className="stars-culm">
                            <div className={"stars"}>
                                {stars}
                            </div>
                        </div>
                    </div>   
                    <div className="comment_area_con clearfix">
                        {
                            hasComment ? <div className="hasCommented"><div>商品评论已完成</div></div> :<div className="textArea"><textarea name="form-content" onChange={this.handleContent.bind(this,"content",id)} placeholder="亲~留下此次购物的宝贵意见吧！字数在1-500个字之间" value={v.content || ""}></textarea></div>
                        }
                    </div>
                </div>
            )
        });
    }
    renderConfirmBtns(items){
        if(items.length>0){
            return (
                <div className="confirmBtns">
                    <div className="confirmLeft">
                        <div className="checkboxRed">
                            <input type="checkbox" onChange={this.handleIsOpen.bind(this,"isOpen")} name="form-isOpen" value="" id="form-isOpen" />
                            <label></label>
                        </div>
                        <label htmlFor="form-isOpen">匿名评论</label>
                    </div>
                    <a href="javascript:void(0);" onClick={this.handleSave.bind(this)} className="confirm_btn">提交评论</a>
                </div>
            )
        }
    }
    render(){
        const {logistics,order,alertActive,alertContent} = this.props.orderByParam;
        const {itemList} = order;
        var hasNotComment = _.filter(itemList, function(o){ return !o.hasComment;});
        return (
            <div className="order-detail-content comment-content">
                <Header>评论宝贝</Header>
                <div className="commentBaby">
                    {this.renderItems(itemList)}
                </div>
                
                {this.renderConfirmBtns(hasNotComment)}
                <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default Comment;