'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";
import Header from "../common/header.jsx";
import {fetchYouaCoupons,fetchUnionCoupons,fetchInvalidCoupons} from "./action.es6"; 
 

class Coupon extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            displayFlag:"enable"
        }
    }

    toggleFlag(flag){
        const {dispatch} = this.props;
        var {enableIndex,invalidIndex,legueIndex} = this.props;

        this.setState({
            displayFlag:flag
        });

        if(flag=="legue" && !legueIndex){
            dispatch(fetchUnionCoupons({
                pageIndex:legueIndex,
                isMerchants:1,
                pageIndex:1,
                status:0
            }));
        }else if(flag=="invalid" && !invalidIndex){
            dispatch(fetchInvalidCoupons({
                pageIndex:invalidIndex,
                pageIndex:1,
                status:1
            }));
        }

    }

    renderTab(){
        const firstClasses = classNames({
            current:this.state.displayFlag === "enable"
        })            
        const secondClasses = classNames({
            current:this.state.displayFlag === "legue"
        })            
        const thirdClasses = classNames({
            current:this.state.displayFlag === "invalid"
        })
        return (<ul>
            <li className={firstClasses}
            onClick={this.toggleFlag.bind(this,"enable")}><i>友阿优惠券</i></li>
            <li className={secondClasses} 
            onClick={this.toggleFlag.bind(this,"legue")}><i>联盟优惠券</i></li>
            <li className={thirdClasses} 
            onClick={this.toggleFlag.bind(this,"invalid")}><i>已失效优惠券</i></li>
            </ul>)
    }
  
    render(){
        var {enableCoupons,legueCoupons,invalidCoupons} = this.props;
        const youaClasses = classNames("list_youa",{
            hide:this.state.displayFlag !== "enable"
        })            
        const unionClasses = classNames("list_union",{
            hide:this.state.displayFlag !== "legue"
        })            
        const invalidClasses = classNames("invalid",{
            hide:this.state.displayFlag !== "invalid"
        })

        if(enableCoupons.length>0){
            enableCoupons = enableCoupons.map((enableCoupon,i)=>{
                const key = "coupon-" + i;
                return (
                    <CouponRow coupon={enableCoupon} key={key}/>
                )
            });
        }else{
            enableCoupons = <NoCoupon message="您目前没有友阿优惠券哟！" />
        }

        if(legueCoupons.length>0){
            legueCoupons = legueCoupons.map((legueCoupon,i)=>{
                const key = "legueCoupon-" + i;
                return (
                    <LegueCouponRow coupon={legueCoupon} key={key}/>
                )
            });

        }else{
            legueCoupons = <NoCoupon message="您目前没有联盟优惠券哟！" />
        }
       
        if(invalidCoupons.length>0){
            invalidCoupons = invalidCoupons.map((invalidCoupon,i)=>{
                const key = "invalidCoupon-" + i;
                if(invalidCoupon.flag === "legue"){
                    return (
                    <LegueCouponRow coupon={invalidCoupon} key={key} invalid={true}/>
                    )
                }
                return (
                    <CouponRow coupon={invalidCoupon} key={key} invalid={true}/>
                )
            });
        }else{
            invalidCoupons = <NoCoupon message="您目前没有已失效优惠券哟！" />
        }
        
        return (
            <div>
                <Header>
                    <span className="title">优惠券</span>
                </Header>
                <div className="polyTabs">
                    {this.renderTab()}
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
        const {coupon,invalid} = this.props;
        const beUsed = classNames({
            beUsed:invalid
        })
         
 
        const classes = classNames("coupon",{
            youa_invalid:invalid,
            haitao:coupon.flag=="haitao",
            tepin:coupon.flag=="tepin",
            hnmall:coupon.flag=="hnmall"
        });
        return (
            <a href={"/coupondetail/"+coupon.couponNo}>
            <div className={classes}>
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
            </div>
            </a>
        );
    }
}

class LegueCouponRow extends Component{
    render(){
        const {coupon,invalid} = this.props;
        const classes = classNames("coupon",{
            union_invalid:invalid
        });
        const expired = classNames({
            expired:invalid
        })
        return (
            <a href={"/coupondetail/"+coupon.couponNo}>
            <div className={classes}>
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
            </div>
            </a>
        );
    }
}

class NoCoupon extends Component{
    render(){
        const {message}=this.props;
        return (
            <div className="empty">
                <img src="client/asset/images/empty_coupon.png" />
                <span>{message}</span>
            </div>
        )
    }
}

export default Coupon;