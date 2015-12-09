'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Footer from "../common/footer.jsx";
import NumberPicker from "../../component/numberpicker.jsx";

class Cart extends Component{
    constructor(props,context){
        super(props,context);
        
    }

    handleChange(checked){
        console.log(checked)
    }

 

    render(){
 
        const {isFetched,carts} = this.props;
        var groupList = carts.map((item,i)=>{
            const key = 'group-'+i;
            return (
                <CartGroup key={key} cart={item} />
            );
        });
        return (
            <div className="cart-content">
                <Header>
                    <span className="title">购物车</span>
                </Header>
                <div className="cart">
                    {groupList}
                </div>
                <Footer activeIndex="3"/>
            </div>
        )
    }
}


class Checkbox extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked:props.checked
        }
    }
    handleChange(e){
        // e && e.preventDefault();
        const {onChange}= this.props;
        this.setState({
            checked:!this.state.checked
        },()=>{
            onChange(this.state.checked);
        })
    }
    render(){
        const {checked} = this.state;
        return (
            <div className="checkboxRed">
                <input type="checkbox"  defaultChecked={checked} onClick={this.handleChange.bind(this)}/>
                <label></label>
            </div>
        )
    }
}

Checkbox.defaultProps = {
    checked:false,
    onChange:function(){}
}

class CartGroup extends Component{

    render(){
        const cart = this.props.cart;

        var itemList = cart.cartMKTList.map((item,i)=>{
            const key = "cart-" + i;
            return (
                <CartRow goods={item.cartProductList} key={key}/>
            )
        });

        return(
            <div>
                <CartGroupTitle cart={cart}/>
                <div className="manjian"><em>满减</em>购物满200减30，满300减80，满400减120</div>
                {itemList}
                <CartTotal cart={cart} />
            </div>
        )
    }
}

class CartGroupTitle extends Component{
    render(){
        const {warehouseName,activity,handleChange} = this.props.cart;
        return (
            <div className="J_store clearfix">
                <Checkbox checked={true} />
                <div className="depot">
                    <span>{warehouseName}</span>
                    <div className="depot_bot"><em></em>再购1件立享【98元任选2件】</div>
                </div>
            </div>
        )
    }
}

class CartRow extends Component{
    render(){
        const list = this.props.goods;

        var goodsList = list.map((item,i)=>{
            const key = 'cart-item-'+i;
            return (
                <CartItem  key={key} goods={item}/>
            )
        });
        return (
            <div className="group">
                {goodsList}
            </div>
        )
    }
}

class CartItem extends Component {
    render (){
        const g = this.props.goods;
        return (
            <div className="J_item">
                <a className="shanchu"></a>
                <div className="J_moveRight">
                    <Checkbox checked={true} />
                    <div>
                        <div className="img_wrap">
                            <a className=" J_ytag cartlist" href={"/goods/id="+g.cartId}>
                            <img width="100%" src={g.imageUrl}/></a>
                            <span className="limitBuy">限购{g.buyLimit}件</span>
                        </div>
                        
                        <div className="gd_info">
                            <p className="name">
                              <b>{g.title}</b>
                              <span>&yen;{g.salesPrice}</span>
                              <em>x{g.qty}</em>
                            </p>                                   
                            <NumberPicker value={g.qty}/>
                        </div>
                            
                    </div>  
                </div>
            </div>
        )
    }
}

class CartTotal extends Component{

    render(){
        const cart = this.props.cart;
        return (
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
                        <span id="cart_money_info2_1">总计(不含运费、税金)：<em>&yen;{cart.totalFee}</em></span>
                    </p>
                    <p><input type="button"  className="btn_buy" value="结算" /></p>
                </div>
                <div className="cart_tips">
                    <i></i><span>省钱贴士：单笔订单税金50元以内，可以免税哦！</span>
                </div>
            </div>
        )
    }
}

export default Cart;