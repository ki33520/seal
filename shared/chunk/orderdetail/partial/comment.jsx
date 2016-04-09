'use strict';

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import Header from "../../common/header.jsx";
import GoTop from "../../../component/gotop.jsx";
import {formatPrice} from "../../../lib/util.es6";
import {jumpURL,urlPrefix} from "../../../lib/jumpurl.es6";
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
            let len = content ? content.length : 0;
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
                saveComment(urlPrefix+"/savecomment",{
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
        const {order,alertContent,back_path} = this.props.orderByParam;
        const back_url = back_path === null ? null : jumpURL("orderlist-id",[back_path]);
        if(nextProps.orderByParam.saveCommentChanging === false &&
           this.props.orderByParam.saveCommentChanging === true){
            if(nextProps.orderByParam.saveCommentChanged === true){
                alert(nextProps.orderByParam.msg,1000);
                setTimeout(function(){
                    if(back_url){
                        window.location.assign(back_url);
                    }else{
                        window.history.back();
                    }
                },2000)
            }else{
                alert(nextProps.orderByParam.msg,1000);
            }
        }
    }
    renderItems(items){
        return items.map((v,k)=>{
            var {singleImageUrl,singleTitle,salesPrice,id,rate,hasComment} = v;
            rate = rate ? rate : 5;
            if(!hasComment){
                var stars = [];
                for(let i=1;i<=5;i++){
                    const starClass = classNames({
                        "iconfont":true,
                        "icon-star-empty": rate<i,
                        "icon-star-full": rate>=i
                    });
                    stars.push(<div key={i} onTouchStart={this.handleStar.bind(this,"rate",id,i)} className={starClass}></div>)
                };
                return (
                    <div className="commentBaby_list" key={k}>
                        <div className="J_moveRight">
                            <div className="clearfix">
                                <a className="J_ytag cartlist" href={jumpURL("gooddetail",[v.singleCode])}>
                                    <span className="img_wrap">
                                        <img src={v.singleImageUrl}/>
                                    </span>
                                </a>
                                <div className="gd_info">
                                    <p className="name">{v.singleTitle}</p>
                                    <p className="value"><i>&yen;</i>{formatPrice(v.salesPrice)}</p>
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
                            <div className="textArea"><textarea name="form-content" onChange={this.handleContent.bind(this,"content",id)} placeholder="亲~留下此次购物的宝贵意见吧！字数在1-500个字之间" value={v.content || ""}></textarea></div>
                        </div>
                    </div>
                )
            }
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
        const {currentRoute} = this.props;
        const {order,alertActive,alertContent,back_path} = this.props.orderByParam;
        const {itemList} = order;
        const back_url = back_path === null ? null : jumpURL("orderlist-id",[back_path]);
        var hasNotComment = _.filter(itemList, function(o){ return !o.hasComment;});
        if(currentRoute === "comment"){
            return (
                <div className="order-detail-content comment-content">
                    <Header canBack={!back_url}>
                        {
                            back_url ? <a href={back_url} className="iconfont icon-back"></a> : back_url
                        }
                        <span className="title">评论宝贝</span>
                    </Header>
                    <div className="commentBaby">
                        <GoTop relative={true}>
                        {this.renderItems(itemList)}
                        </GoTop>
                    </div>
                    
                    {this.renderConfirmBtns(hasNotComment)}
                    <Alert active={alertActive}>{alertContent}</Alert>
                </div>
            )
        }else{
            return null;
        }
    }
}

export default Comment;