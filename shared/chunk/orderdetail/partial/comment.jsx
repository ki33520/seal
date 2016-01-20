'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";
import StatusProgress from "./statusprogress.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import GoTop from "../../../component/gotop.jsx";

import {changeField,saveComment} from "../action.es6";
import {alert} from "../../common/action.es6";
import Alert from "../../../component/alert.jsx";

class Comment extends Component{
    handleStar(name,arrKey,val,e){
        const {dispatch} = this.props;
        dispatch(changeField(name,val,arrKey));
    }
    handleContent(name,arrKey,e){
        const {dispatch} = this.props;
        dispatch(changeField(name,e.target.value,arrKey));
    }
    handleIsOpen(name,e){
        const {dispatch} = this.props;
        var checked = e.target.checked ? 0 : 1;
        dispatch(changeField(name,checked));
    }
    handleSave(e){
        e && e.preventDefault();
        var {dispatch,order,isOpen} = this.props;
        var obj = order.itemList.map((v,k)=>{
            v.isOpen = isOpen === undefined ? 1 : isOpen;
            const {rate,id,content,isOpen} = v;
            return {
                rate: rate ? rate : 5,
                content: content ? encodeURIComponent(content) : "",
                isOpen,
                itemId: id,
            }
        })
        dispatch(saveComment("/savecomment",{
            commentsJson: obj
        }));
    }
    componentWillReceiveProps(nextProps){
        const {dispatch} = this.props;
        if(nextProps.saveCommentChanging === false &&
           this.props.saveCommentChanging === true){
            if(nextProps.saveCommentChanged === true){
                dispatch(alert(nextProps.msg,2000));
                setTimeout(()=>window.history.back(),2500);
            }else{
                dispatch(alert(nextProps.msg,2000));
            }
        }
    }
    renderItems(items){
        return items.map((v,k)=>{
            var {singleImageUrl,singleTitle,salesPrice,id,rate} = v;
            if(!rate){
                rate = 5;
            }
            var stars = [];
            for(let i=1;i<=5;i++){
                const starClass = classNames({
                    "iconfont":true,
                    "icon-star-empty": rate<i,
                    "icon-star-full": rate>=i
                });
                stars.push(<div key={i} onTouchStart={this.handleStar.bind(this,"rate",k,i)} className={starClass}></div>)
            };
            return (
                <div className="commentBaby_list" key={k}>
                    <div className="J_moveRight">
                        <div className="clearfix">
                            <a className="img_wrap J_ytag cartlist" href="#">
                                <img src={v.singleImageUrl} />
                            </a>
                            <div className="gd_info">
                                <p className="name">{v.singleTitle}</p>
                                <p className="value"><i>&yen;</i><span>{v.salesPrice}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="comment_area clearfix">
                        <span><em></em>评论</span>
                        <div className="stars-culm">
                            <div className={"stars stars-"}>
                                {stars}
                            </div>
                        </div>
                    </div>   
                    <div className="comment_area_con clearfix">
                        <div className="textArea">
                            <textarea name="form-content" onChange={this.handleContent.bind(this,"content",k)} placeholder="亲~留下此次购物的宝贵意见吧！"></textarea>
                        </div>
                        <a href="javascript:void(0);"><i></i></a>
                    </div>
                </div>
            )
        });
    }
    render(){
        const {logistics,order,alertActive,alertContent} = this.props;
        const {itemList} = order;
        return (
            <div className="order-detail-content comment-content">
                <Header>评论宝贝</Header>
                <div className="commentBaby">
                    {this.renderItems(itemList)}
                </div>
    
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
                <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default Comment;