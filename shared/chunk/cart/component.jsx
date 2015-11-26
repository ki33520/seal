'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Footer from "../common/footer.jsx";
import NumberPicker from "../../component/numberpicker.jsx";

class Cart extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="cart-content">
                <Header>
                    <span className="title">购物车</span>
                </Header>
                <div className="cart">
                    <div className="onlyList clearfix">
                        <div className="J_store clearfix">
                            <div className="checkboxRed">
                                <input type="checkbox" />
                                <label></label>
                                <input type="hidden" name="sel_tax" />
                            </div>
                            <div className="depot">
                                <span>广州保税区一号仓</span>
                                <div className="depot_bot"><em></em>再购1件立享【98元任选2件】</div>
                            </div>
                        </div>
                        <div className="manjian"><em>满减</em>购物满200减30，满300减80，满400减120</div>
                        <div className="J_item">
                            <a className="shanchu"></a>
                            <div className="J_moveRight">
                                <div className="checkboxRed">
                                    <input type="checkbox" />
                                    <label></label>
                                    <input type="hidden" name="sel_tax" />
                                </div>
                                <div>
                                    <div className="img_wrap">
                                        <a className=" J_ytag cartlist" href="goods.php?id=878">
                                        <img width="100%" src="http://youahaitao.oss-cn-hangzhou.aliyuncs.com/images/201507/thumb_img/878_thumb_G_1438295153599.jpg"/></a>
                                        <span className="limitBuy">限购2件</span>
                                    </div>
                                    
                                    <div className="gd_info">
                                        <p className="name">
                                          <b>【2罐装 单罐仅224元】德国进口Aptamil爱他美奶粉白金版婴幼儿奶粉Pre段（0-3个月宝宝 800g）</b>
                                          <span>&yen;448.00</span>
                                          <em>x2</em>
                                        </p>

                                        
                                            <NumberPicker />
                                        
                                    </div>
                                        
                                </div>  
                            </div>
                        </div>
                
                        <div className="section_wrap cart_buy">
                            <div className="cartFirst clearfix">
                                <span id="selected_number_1">已选商品1件</span>
                                <div className="cartFirst_two">
                                    <p>商品总额：&nbsp;&nbsp;&yen;&nbsp;<span id="cart_money_info3_1">59.00</span></p>
                                    <p>活动优惠：-&nbsp;&yen;&nbsp;0.00</p>
                                </div>
                            </div>
                            <div id="J_wrapperCartTop">
                                <p>
                                    <span id="cart_money_info2_1">总计(不含运费、税金)：<em>&yen;448</em></span>
                                </p>
                                <p><input type="button"  className="btn_buy" value="结算" /></p>
                            </div>
                        </div>
                    </div>
                    <div className="cart_tips">
                        <i></i><span>省钱贴士：单笔订单税金50元以内，可以免税哦！</span>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Cart;