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
        const {changeField} = this.props;
        var rate = val>3 ? val : 3;
        changeField(name,rate,arrKey);
    }
    handleContent(name,arrKey,e){
        const {changeField} = this.props;
        changeField(name,e.target.value,arrKey);
    }
    handleIsOpen(name,e){
        const {changeField} = this.props;
        var checked = e.target.checked ? 0 : 1;
        changeField(name,checked);
    }
    handleSave(e){
        e && e.preventDefault();
        const {saveComment} = this.props;
        var {order,isOpen} = this.props.orderByParam;
        var obj = order.itemList.map((v,k)=>{
            v.isOpen = isOpen === undefined ? 1 : isOpen;
            const {rate,id,content,isOpen} = v;
            return {
                rate: rate ? rate : 5,
                content: content ? content : "",
                isOpen,
                itemId: id,
            }
        })
        saveComment("/savecomment",{
            commentsJson: JSON.stringify(obj)
        });
    }
    componentWillReceiveProps(nextProps){
        const {alert} = this.props;
        if(nextProps.orderByParam.saveCommentChanging === false &&
           this.props.orderByParam.saveCommentChanging === true){
            if(nextProps.orderByParam.saveCommentChanged === true){
                alert(nextProps.orderByParam.msg,2000);
                setTimeout(()=>window.history.back(),2500);
            }else{
                alert(nextProps.orderByParam.msg,2000);
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
                                <p className="value"><i>&yen;</i><span>{v.salesPrice.toFixed(2)}</span></p>
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
                    </div>
                </div>
            )
        });
    }
    render(){
        const {logistics,order,alertActive,alertContent} = this.props.orderByParam;
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