'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Footer from "../common/footer.jsx";
import NumberPicker from "../../component/numberpicker.jsx";

 
 

class CartRow extends Component {
    render(){
        const {list}=this.props;
        //console.log(list)
        var item = list.cartProductList.map((good,i)=>{
            const key = 'cart-row-item'+i;
            return (<CartGoods goods={good} key={key} />);
        });  
        return (<div className="group">{item}</div>)
    }
}

class CartGoods extends Component {
    render(){
        const {goods} = this.props;
        return (
            <div className="J_item">
                <a className="shanchu"></a>
                <div className="J_moveRight">
                    <div className="checkboxRed">
                        <input type="checkbox"   defaultChecked="checked" />
                        <label></label>
                    </div>
                    <div>
                        <div className="img_wrap">
                            <a className=" J_ytag cartlist" href="goods.php?id=878">
                            <img width="100%" src={goods.imageUrl} /></a>
                            <span className="limitBuy">限购{goods.buyLimit}件</span>
                        </div>
                        
                        <div className="gd_info">
                                <p className="name">
                                  <b>{goods.title}</b>
                                  <span>&yen;{goods.salesPrice}</span>
                                  <em>x{goods.qty}</em>
                                </p>
                                <NumberPicker value={goods.qty}/>
                            </div>
                     </div>
                </div>
            </div>
        )
    }
}

class CartGroup extends Component {
    render(){
        const {cart,handleChange} = this.props;
        var cartRow = cart.cartMKTList.map((list,i)=>{
            const key = 'cart-row-'+i;
            return(<CartRow key={key} list={list} />);
        });
        return (
            <div className="onlyList clearfix">
                <div className="J_store clearfix">
                    <div className="checkboxRed">
                        <input type="checkbox" checked="checked" onChange={handleChange.bind(this)}/>
                        <label></label>
                    </div>
                    <div className="depot">
                        <span>{cart.warehouseName}</span>
                        <div className="depot_bot"><em></em>再购1件立享【98元任选2件】</div>
                    </div>
                </div>
                <div className="manjian"><em>满减</em>购物满200减30，满300减80，满400减120</div>
                {cartRow}
                <div className="section_wrap cart_buy">
                    <div className="cartFirst clearfix">
                        <span id="selected_number_1">已选商品{cart.qtys}件</span>
                        <div className="cartFirst_two">
                            <p>商品总额：&nbsp;&nbsp;&yen;&nbsp;<span>{cart.salesTotalFee}</span></p>
                            <p>活动优惠：-&nbsp;&yen;&nbsp;{cart.tariffFee}</p>
                        </div>
                    </div>
                    <div id="J_wrapperCartTop">
                        <p>
                            <span>总计(不含运费、税金)：<em>&yen;{cart.totalFee}</em></span>
                        </p>
                        <p><input type="button"  className="btn_buy" value="结算" /></p>
                    </div>
                    <div className="cart_tips">
                        <i></i><span>省钱贴士：单笔订单税金50元以内，可以免税哦！</span>
                    </div>
                </div>
            </div>
        );
    }
}

class Cart extends Component{

    handleChange(checked){
        console.log(checked)
    }


    render(){
 
        const {isFetched,carts} = this.props;

        var cartList = carts.map((cart,i)=>{
            const key = 'cart-'+i;
            return (<CartGroup cart={cart} handleChange={this.handleChange.bind(this)} key={key}/>);
        });

        return (
            <div className="cart-content">
                <Header>
                    <span className="title">购物车</span>
                </Header>
                <div className="cart">
                    {cartList}
                </div>
                <Footer activeIndex="3"/>
            </div>
        )
    }
}

 
export default Cart;