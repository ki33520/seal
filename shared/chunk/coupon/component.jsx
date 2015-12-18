'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";
 
 
 
import Header from "../common/header.jsx";
 

class Coupon extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0,
            prevIndex:null
        }
    }
    handleClick(index){
        const prevIndex = this.state.activeIndex;
        this.setState({
            activeIndex:index,
            prevIndex
        });
    }
    render(){
        var {enableCoupons,legueCoupons,invalidCoupons} = this.props;
        const youaClasses = classNames("list_youa",{
            "hide":this.state.activeIndex!==0
        });
        const unionClasses = classNames("list_union",{
            "hide":this.state.activeIndex!==1
        });
        const invalidClasses = classNames("invalid",{
            "hide":this.state.activeIndex!==2
        });
        enableCoupons = enableCoupons.map((enableCoupon,i)=>{
            const key = "coupon-" + i;
            return (
                <CouponRow coupon={enableCoupon} key={key}/>
            )
        });
        legueCoupons = [1,2].map((legueCoupon,i)=>{
            const key = "legueCoupon-" + i;
            return (
                <LegueCouponRow coupon={legueCoupon} key={key}/>
            )
        });
        invalidCoupons = invalidCoupons.map((invalidCoupon,i)=>{
            const key = "invalidCoupon-" + i;
            if(invalidCoupon.flag === "legue"){
                return (
                <LegueCouponRow coupon={invalidCoupon} invalid={true} key={key}/>
                )
            }
            return (
                <CouponRow coupon={invalidCoupon} invalid={true} key={key}/>
            )
        });
        return (
            <div>
                <Header>
                    <span className="title">优惠券</span>
                </Header>
                <div className="polyTabs">
                    <Tabs titles={["友阿优惠券","联盟优惠券","已失效优惠券"]}  
                    activeIndex={this.state.activeIndex}
                    handleClick={this.handleClick.bind(this)}/>
                </div>
                <div className="listMain">
                    <div className="tabCon">
                        <div className={youaClasses}>
                            {enableCoupons}
                        </div>
                        <div className={unionClasses}>
                            {legueCoupons}
                        </div>
                        <div className={invalidClasses}>
                            {invalidCoupons}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class CouponRow extends Component{
    render(){
        const {coupon} = this.props;
       
        var employ;
 
        switch(coupon.employName[0]){
            case "海外购":
                employ={name:"coupon haitao",site:"海外购www.tepin.hk"};
                break;
            case "特品汇":
                employ={name:"coupon tepin",site:"海外购www.tepin.com"};
                break;
            case "农博汇":
                employ={name:"coupon hnmall",site:"农博汇www.hnmall.com"};
                break;
            default:
                employ = {};
                break;
        }

        return (
            <div className={employ.name}>
                <div className="left">
                    <div className="price"><em>&yen;</em>{coupon.money}</div>
                    <div className="term">{coupon.couponDefName}</div>
                </div>
                <div className="right">
                    <div className="kind">{employ.site}</div>
                    <div className="date">{coupon.useDate}&nbsp;-&nbsp;{coupon.validityDate}</div>
                    <div className="explain">可在XXX使用使用使用使用使用使用使用</div>
                </div>
            </div>
        );
    }
}

class LegueCouponRow extends Component{
    render(){
        const {coupon} = this.props;
        return (
            <div className="coupon">
                <div className="content">
                    <div className="left">
                        <div className="price"><em>&yen;</em>200</div>
                    </div>
                    <div className="right">
                        <div className="company">罗莎蛋糕</div>
                        <div className="explain">仅可购买蛋糕类商品，奶品除外</div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="term">满100使用</div>
                    <div className="date">2015.06.12-2015.07.18</div>
                </div>
            </div>
        );
    }
}

class Tabs extends Component{
 
    renderNav(){
        const titles = this.props.titles;
    
        return titles.map((title,i)=>{
            const classes = classNames({
                current:i === this.props.activeIndex
            });
            return (
                <li className={classes} key={"tab-nav-"+i} 
                onClick={this.props.handleClick.bind(this,i)}><i>{title}</i></li>
            );
        })
    }
    render(){
        return (
            <ul>
                {this.renderNav()}
            </ul>
        )
    }
}
 

export default Coupon;