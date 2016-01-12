'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";
import Header from "../common/header.jsx";
import fetchCoupon from "./action.es6"; 
import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";

class Coupon extends React.Component{
    
    handleClick(i){

    }
 

    render(){
        const {youaCoupons,legueCoupons,invalidCoupons,isFetching} = this.props;
        let Ycoupon,Lcoupon,Icoupon;
        
        if(youaCoupons.length){
            Ycoupon = youaCoupons.map((item,i)=>{
                return (
                    <YouaCouponRow coupon={item} key={'y-'+i} />
                )
            });
        }else{
            Ycoupon = (<NoCoupon message="您目前没有友阿优惠券哟！"/>);
        }
        
        if(legueCoupons.length){
            Lcoupon = legueCoupons.map((item,i)=>{
                return (
                    <LegueCouponRow coupon={item} key={'l-'+i} />
                )
            });
        }else{
            Lcoupon = (<NoCoupon message="您目前没有联盟优惠券哟！"/>);
        }
        
        if(invalidCoupons.length){
            Icoupon = invalidCoupons.map((item,i)=>{
                if(item.flag==='legue'){
                    return (<LegueCouponRow coupon={item} invalid={true} key={'l-'+i} />)
                }else{
                    return (<YouaCouponRow coupon={item} invalid={true} key={'y-'+i} />)
                }
            })
        }else{
            Icoupon = (<NoCoupon message="您目前没有失效优惠券哟！"/>);
        }
        
        return (
            <div>
                <Header>
                    <span className="title">优惠券</span>
                </Header>
                <SlideTabs axis="x" navbarSlidable={false} onSelect={this.handleClick.bind(this)}>
                    <SlideTabsItem navigator={()=>'友阿优惠券'}>
                        {Ycoupon}
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=>'联盟优惠券'}>
                        {Lcoupon}
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=>'已失效优惠券'}>
                        {Icoupon}
                    </SlideTabsItem>
                </SlideTabs>
            </div>
        )
    }
}

class YouaCouponRow extends Component{
    render(){
        const {coupon,invalid} = this.props;
        const beUsed = classNames({
            beUsed:invalid
        });

        let flag = coupon.flag;
        let classes = classNames("coupon",{
            "youa-invalid":invalid,
            "haitao":flag=="haitao"&&!invalid,
            "tepin":flag=="tepin"&&!invalid,
            "hnmall":flag=="hnmall"&&!invalid,
            "general":flag=="general"&&!invalid,
            "shop":flag==="shop"&&!invalid
        });

        return (
            <div className={classes}>
                <a href={"/coupondetail/"+coupon.couponNo}>
                    <div className="left">
                        <div className="price"><em>&yen;</em>{coupon.money}</div>
                        <div className="term">{coupon.couponDefName}</div>
                    </div>
                    <div className="right">
                        <div className="kind">{coupon.site}</div>
                        <div className="date">{coupon.issueDate}&nbsp;-&nbsp;{coupon.validityDate}</div>
                        <div className="explain">可在XXX使用使用使用使用使用使用使用</div>
                    </div>
                    <div className={beUsed}></div>
                </a>
            </div>
        );
    }
}

class LegueCouponRow extends Component{
    render(){
        const {coupon,invalid} = this.props;

        const classes = classNames("coupon",{
            "union-invalid":invalid,
            "union":!invalid
        });

        const expired = classNames({
            expired:invalid
        });

        return (
            <div className={classes}>
                <a href={"/coupondetail/"+coupon.couponNo}>
                    <div className="content">
                        <div className="left">
                            <div className="price"><em>&yen;</em>20</div>
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
                    <div className={expired}></div>
                </a>
            </div>
        );
    }
}

class NoCoupon extends Component{
    render(){
        const {message}=this.props;
        return (
            <div className="empty">
                <img src="/client/asset/images/empty_coupon.png" />
                <span>{message}</span>
            </div>
        )
    }
}

export default Coupon;